import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface User {
  username: string;
  email: string;
  password: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // const checkAdminStatus = useCallback(async (currentUser: User) => {
  //   try {
  //     // Narrow types here to avoid deep TS instantiation from the generated Supabase types
  //     const { data, error } = await (supabase as any)
  //       .from('profiles')
  //       .select('is_admin')
  //       .eq('id', currentUser.id)
  //       .single();

  //     if (!error && data) {
  //       setIsAdmin(Boolean(data.is_admin));
  //     } else {
  //       setIsAdmin(false);
  //     }
  //   } catch {
  //     setIsAdmin(false);
  //   }
  // }, []);

  // useEffect(() => {
  // Get initial session
  // const getSession = async () => {
  //   const { data: { session } } = await supabase.auth.getSession();
  //   setUser(session?.user ?? null);
  //   if (session?.user) {
  //     await checkAdminStatus(session.user);
  //   }
  //   setLoading(false);
  // };

  // getSession();

  // Listen for auth changes
  //   const { data: { subscription } } = supabase.auth.onAuthStateChange(
  //     async (event, session) => {
  //       setUser(session?.user ?? null);
  //       if (session?.user) {
  //         await checkAdminStatus(session.user);
  //       } else {
  //         setIsAdmin(false);
  //       }
  //       setLoading(false);
  //     }
  //   );

  //   return () => subscription.unsubscribe();
  // }, [checkAdminStatus]);

  const signIn = async (email: string, password: string) => {
    setLoading(() => true);
      
    const req = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/auth/login`, {
      method: 'POST',
      credentials: "include",
      headers: new Headers({
        'Content-Type': "application/json"
      }),
      body: JSON.stringify({ email, password })
    });

    const resp = await req.json();

    const userReq = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/auth/current`, {
      method: 'GET',
      credentials: "include",
      headers: new Headers({
        'Content-Type': "application/json"
      })
    });
    const user = await userReq.json();

    if(user.role === "ADMIN") {
      setIsAdmin(true);
    }
    
    setUser(user);

    setLoading(false);
    if (resp.error) throw resp.error;

  };

  const signUp = async (email: string, password: string, username: string) => {
    setLoading(() => true);

    const req = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/auth/register`, {
      method: 'POST',
      credentials: "include",
      headers: new Headers({
        'Content-Type': "application/json"
      }),
      body: JSON.stringify({ email, password, username })
    });

    const resp = await req.json();

    setLoading(false);
    if (resp.error) throw resp.error;

  };

  const signOut = async () => {
    setLoading(() => true);

    const req = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/auth/logout`, {
                  method: 'POST',
                  credentials: "include",
                  headers: new Headers({
                    'Content-Type': "application/json"
                  }),
                });

    const resp = await req.json();

    setLoading(false);
    if(resp.error) throw resp.error;

  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signOut,
      isAdmin,
    }}>
      {children}
    </AuthContext.Provider>
  );
};