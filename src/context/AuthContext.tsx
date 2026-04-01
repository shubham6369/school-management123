"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: any | null; // Use any to support mock user object
  userRole: string | null;
  loading: boolean;
  logout: () => Promise<void>;
  setMockUser: (role: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  loading: true,
  logout: async () => {},
  setMockUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } else {
        // Check for mock session
        const mockRole = sessionStorage.getItem("schoolpro_mock_role");
        if (mockRole) {
          setUser({ email: "admin@school.com", uid: "mock-admin", displayName: "Mock Admin" });
          setUserRole(mockRole);
        } else {
          setUser(null);
          setUserRole(null);
          if (pathname !== "/login") {
            router.push("/login");
          }
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const setMockUser = (role: string) => {
    sessionStorage.setItem("schoolpro_mock_role", role);
    setUser({ email: "admin@school.com", uid: "mock-admin", displayName: "Mock Admin" });
    setUserRole(role);
    setLoading(false);
  };

  const logout = async () => {
    sessionStorage.removeItem("schoolpro_mock_role");
    await signOut(auth);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, logout, setMockUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
