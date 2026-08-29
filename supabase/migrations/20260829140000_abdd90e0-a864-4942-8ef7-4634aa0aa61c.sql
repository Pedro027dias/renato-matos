CREATE TYPE public.app_role AS ENUM ('admin', 'barbeiro');

CREATE TABLE public.papeis_usuario (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.papeis_usuario TO authenticated;
GRANT ALL ON public.papeis_usuario TO service_role;
ALTER TABLE public.papeis_usuario ENABLE ROW LEVEL SECURITY;
CREATE POLICY "usuario ve seus papeis" ON public.papeis_usuario FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.papeis_usuario WHERE user_id = _user_id AND role = _role);
$$;

CREATE TABLE public.agendamentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_nome text NOT NULL,
  cliente_telefone text NOT NULL,
  barbeiro text NOT NULL,
  servico text NOT NULL,
  preco text NOT NULL DEFAULT '',
  duracao_min integer NOT NULL,
  inicio timestamptz NOT NULL,
  fim timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'confirmado',
  observacoes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX agendamentos_barbeiro_inicio_idx ON public.agendamentos (barbeiro, inicio);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.agendamentos TO authenticated;
GRANT ALL ON public.agendamentos TO service_role;
ALTER TABLE public.agendamentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "barbeiros veem agendamentos" ON public.agendamentos FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'barbeiro') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "barbeiros atualizam agendamentos" ON public.agendamentos FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'barbeiro') OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'barbeiro') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "barbeiros apagam agendamentos" ON public.agendamentos FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'barbeiro') OR public.has_role(auth.uid(), 'admin'));

-- Horários ocupados: público, sem dados pessoais
CREATE OR REPLACE FUNCTION public.horarios_ocupados(_barbeiro text, _dia date)
RETURNS TABLE (inicio timestamptz, fim timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT a.inicio, a.fim
  FROM public.agendamentos a
  WHERE a.barbeiro = _barbeiro
    AND a.status <> 'cancelado'
    AND a.inicio >= (_dia::timestamptz - interval '1 day')
    AND a.inicio < (_dia::timestamptz + interval '2 days');
$$;
GRANT EXECUTE ON FUNCTION public.horarios_ocupados(text, date) TO anon, authenticated;

-- Criação atômica do agendamento, recusando sobreposição
CREATE OR REPLACE FUNCTION public.criar_agendamento(
  _cliente_nome text,
  _cliente_telefone text,
  _barbeiro text,
  _servico text,
  _preco text,
  _duracao_min integer,
  _inicio timestamptz,
  _observacoes text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _fim timestamptz;
  _id uuid;
BEGIN
  IF _duracao_min IS NULL OR _duracao_min <= 0 OR _duracao_min > 480 THEN
    RAISE EXCEPTION 'Duração inválida';
  END IF;
  IF length(trim(_cliente_nome)) < 2 OR length(trim(_cliente_telefone)) < 8 THEN
    RAISE EXCEPTION 'Informe nome e telefone válidos';
  END IF;
  IF _inicio < now() - interval '5 minutes' THEN
    RAISE EXCEPTION 'Horário no passado';
  END IF;

  _fim := _inicio + make_interval(mins => _duracao_min);

  PERFORM pg_advisory_xact_lock(hashtext(_barbeiro));

  IF EXISTS (
    SELECT 1 FROM public.agendamentos a
    WHERE a.barbeiro = _barbeiro
      AND a.status <> 'cancelado'
      AND a.inicio < _fim
      AND a.fim > _inicio
  ) THEN
    RAISE EXCEPTION 'Horário indisponível';
  END IF;

  INSERT INTO public.agendamentos (cliente_nome, cliente_telefone, barbeiro, servico, preco, duracao_min, inicio, fim, observacoes)
  VALUES (trim(_cliente_nome), trim(_cliente_telefone), _barbeiro, _servico, coalesce(_preco, ''), _duracao_min, _inicio, _fim, _observacoes)
  RETURNING id INTO _id;

  RETURN _id;
END;
$$;
GRANT EXECUTE ON FUNCTION public.criar_agendamento(text, text, text, text, text, integer, timestamptz, text) TO anon, authenticated;