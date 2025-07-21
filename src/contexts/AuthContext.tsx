'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, RegisterData } from '@/types/Auth';
import { validateCredentials, testUsers } from '@/data/users';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário do localStorage na inicialização
  useEffect(() => {
    console.log('AuthContext - Carregando usuário do localStorage');
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log('AuthContext - Usuário carregado:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erro ao carregar usuário salvo:', error);
        localStorage.removeItem('auth_user');
      }
    } else {
      console.log('AuthContext - Nenhum usuário salvo encontrado');
    }
    setIsLoading(false);
  }, []);

  // Salvar usuário no localStorage quando mudar
  useEffect(() => {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth_user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthContext - Tentativa de login:', email);
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      const validUser = validateCredentials(email, password);
      console.log('AuthContext - Usuário validado:', validUser);

      if (!validUser) {
        console.log('AuthContext - Credenciais inválidas');
        return { success: false, error: 'Email ou senha incorretos' };
      }

      if (validUser.role !== 'customer') {
        console.log('AuthContext - Usuário não é cliente');
        return { success: false, error: 'Use o login de administrador' };
      }

      console.log('AuthContext - Login de cliente bem-sucedido');
      setUser(validUser);
      return { success: true };
    } catch (error) {
      console.error('AuthContext - Erro no login:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  };

  const loginAdmin = async (email: string, password: string) => {
    try {
      console.log('AuthContext - Tentativa de login admin:', email);
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      const validUser = validateCredentials(email, password);
      console.log('AuthContext - Admin validado:', validUser);

      if (!validUser) {
        console.log('AuthContext - Credenciais de admin inválidas');
        return { success: false, error: 'Email ou senha incorretos' };
      }

      if (validUser.role !== 'admin') {
        console.log('AuthContext - Usuário não é admin');
        return { success: false, error: 'Acesso negado. Apenas administradores.' };
      }

      console.log('AuthContext - Login de admin bem-sucedido');
      setUser(validUser);
      return { success: true };
    } catch (error) {
      console.error('AuthContext - Erro no login admin:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Verificar se email já existe
      const existingUser = testUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
      if (existingUser) {
        return { success: false, error: 'Este email já está cadastrado' };
      }

      // Validações
      if (userData.password !== userData.confirmPassword) {
        return { success: false, error: 'As senhas não coincidem' };
      }

      if (userData.password.length < 6) {
        return { success: false, error: 'A senha deve ter pelo menos 6 caracteres' };
      }

      if (!userData.acceptTerms) {
        return { success: false, error: 'Você deve aceitar os termos de uso' };
      }

      // Criar novo usuário
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: 'customer',
        phone: userData.phone,
        createdAt: new Date().toISOString()
      };

      // Em uma aplicação real, salvaria no backend
      testUsers.push(newUser);
      
      setUser(newUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro interno do servidor' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    loginAdmin,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
