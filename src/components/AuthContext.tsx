'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  paymentStatus: {
    hasPaid: boolean;
    loading: boolean;
  };
  checkPaymentStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  paymentStatus: {
    hasPaid: false,
    loading: true
  },
  checkPaymentStatus: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState({
    hasPaid: false,
    loading: true
  });

  const checkPaymentStatus = async () => {
    if (!user) {
      setPaymentStatus({ hasPaid: false, loading: false });
      return;
    }

    try {
      setPaymentStatus(prev => ({ ...prev, loading: true }));
      const hasUserPaid = (await import('@/lib/firebase')).hasUserPaid;
      const paid = await hasUserPaid(user.uid);
      setPaymentStatus({ hasPaid: paid, loading: false });
    } catch (error) {
      console.error('Error checking payment status:', error);
      setPaymentStatus({ hasPaid: false, loading: false });
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        await checkPaymentStatus();
      } else {
        setPaymentStatus({ hasPaid: false, loading: false });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, paymentStatus, checkPaymentStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 