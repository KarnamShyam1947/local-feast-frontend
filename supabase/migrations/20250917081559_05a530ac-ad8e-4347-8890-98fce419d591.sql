-- Fix privilege escalation vulnerability in profiles table
-- Drop the existing policy that allows users to update their own profile
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create a new policy that allows users to update their profile EXCEPT is_admin field
CREATE POLICY "Users can update their own profile (except admin status)" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND 
  is_admin = (SELECT is_admin FROM public.profiles WHERE id = auth.uid())
);

-- Create a policy for admins to manage admin status of other users
CREATE POLICY "Admins can manage admin status" 
ON public.profiles 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- Create a secure function to create the first admin user (can only be called once)
CREATE OR REPLACE FUNCTION public.create_first_admin(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_count integer;
  target_user_id uuid;
BEGIN
  -- Check if any admin users already exist
  SELECT COUNT(*) INTO admin_count FROM profiles WHERE is_admin = true;
  
  IF admin_count > 0 THEN
    RAISE EXCEPTION 'Admin users already exist. Cannot create first admin.';
  END IF;
  
  -- Find the user by email
  SELECT id INTO target_user_id 
  FROM auth.users 
  WHERE email = user_email;
  
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', user_email;
  END IF;
  
  -- Update or insert the profile with admin status
  INSERT INTO profiles (id, is_admin)
  VALUES (target_user_id, true)
  ON CONFLICT (id) 
  DO UPDATE SET is_admin = true;
END;
$$;