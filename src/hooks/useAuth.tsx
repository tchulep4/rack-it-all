
import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContext, AuthUser, UserRole } from '@/types';

const AuthContextComponent = createContext<AuthContext | null>(null);

// Mock user data - em produção seria substituído por chamada à API
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'Administrator',
    email: 'admin@2lecybersec.com',
    role: 'admin' as UserRole,
    department: 'IT'
  },
  {
    id: '2',
    username: 'manager',
    password: 'manager123',
    name: 'Manager User',
    email: 'manager@2lecybersec.com',
    role: 'manager' as UserRole,
    department: 'Operations'
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    // Check if user is already logged in (localStorage)
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      const authUser: AuthUser = {
        id: foundUser.id,
        username: foundUser.username,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        department: foundUser.department
      };
      
      setUser(authUser);
      localStorage.setItem('auth_user', JSON.stringify(authUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    
    const roleHierarchy = ['user', 'technician', 'manager', 'admin'];
    const userRoleIndex = roleHierarchy.indexOf(user.role);
    const requiredRoleIndex = roleHierarchy.indexOf(role);
    
    return userRoleIndex >= requiredRoleIndex;
  };

  const value: AuthContext = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
    hasRole
  };

  return (
    <AuthContextComponent.Provider value={value}>
      {children}
    </AuthContextComponent.Provider>
  );
};

export const useAuth = (): AuthContext => {
  const context = useContext(AuthContextComponent);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
