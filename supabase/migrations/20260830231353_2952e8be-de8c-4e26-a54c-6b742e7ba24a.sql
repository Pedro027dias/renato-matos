CREATE OR REPLACE FUNCTION public.reivindicar_acesso_barbeiro()
RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _uid uuid := auth.uid();
BEGIN
  IF _uid IS NULL THEN
    RETURN false;
  END IF;
  IF EXISTS (SELECT 1 FROM public.papeis_usuario) THEN
    RETURN EXISTS (SELECT 1 FROM public.papeis_usuario WHERE user_id = _uid);
  END IF;
  INSERT INTO public.papeis_usuario (user_id, role) VALUES (_uid, 'barbeiro');
  RETURN true;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.reivindicar_acesso_barbeiro() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.reivindicar_acesso_barbeiro() TO authenticated;