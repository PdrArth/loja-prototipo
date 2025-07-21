import { User } from '@/types/Auth';

// Usuários de teste
export const testUsers: User[] = [
  {
    id: '1',
    name: 'Cliente Teste',
    email: 'teste@cliente.com',
    role: 'customer',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    phone: '(11) 99999-9999',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Administrador',
    email: 'admin@loja.com',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    phone: '(11) 88888-8888',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

// Senhas de teste (em produção seria hash)
export const testPasswords: Record<string, string> = {
  'teste@cliente.com': '123456',
  'admin@loja.com': 'admin123'
};

export const findUserByEmail = (email: string): User | undefined => {
  return testUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const validateCredentials = (email: string, password: string): User | null => {
  console.log('validateCredentials - email:', email, 'password:', password);
  const user = findUserByEmail(email);
  console.log('validateCredentials - user found:', user);

  if (!user) {
    console.log('validateCredentials - usuário não encontrado');
    return null;
  }

  const validPassword = testPasswords[email.toLowerCase()];
  console.log('validateCredentials - senha esperada:', validPassword);

  if (validPassword !== password) {
    console.log('validateCredentials - senha incorreta');
    return null;
  }

  console.log('validateCredentials - credenciais válidas');
  return user;
};
