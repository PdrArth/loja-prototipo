'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/Toast/ToastContext';
import { useRouter } from 'next/navigation';

interface UserProfile {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNascimento: string;
  genero: string;
}

interface Address {
  id: string;
  nome: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  principal: boolean;
}

export default function MinhaContaPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  // Estados principais
  const [activeTab, setActiveTab] = useState('perfil');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Estados do perfil
  const [profile, setProfile] = useState<UserProfile>({
    nome: user?.name || 'João Silva',
    email: user?.email || 'joao@email.com',
    telefone: '(11) 99999-9999',
    cpf: '123.456.789-00',
    dataNascimento: '1990-01-01',
    genero: 'masculino'
  });

  // Estados dos endereços
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      nome: 'Casa',
      cep: '01234-567',
      rua: 'Rua das Flores',
      numero: '123',
      complemento: 'Apto 45',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      principal: true
    }
  ]);

  // Estados de modais
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Verificar autenticação
  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  // Função para salvar perfil
  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
    showToast('Perfil atualizado com sucesso!', 'success');
  };

  // Função para logout
  const handleLogout = () => {
    logout();
    showToast('Logout realizado com sucesso!', 'success');
    router.push('/');
  };

  const tabs = [
    { id: 'perfil', name: 'Meu Perfil', icon: '👤' },
    { id: 'enderecos', name: 'Endereços', icon: '📍' },
    { id: 'seguranca', name: 'Segurança', icon: '🔒' },
    { id: 'favoritos', name: 'Favoritos', icon: '❤️' },
    { id: 'configuracoes', name: 'Configurações', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Minha Conta</h1>
              <p className="text-gray-600 mt-1">Gerencie suas informações pessoais e preferências</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{profile.nome}</p>
                <p className="text-sm text-gray-500">{profile.email}</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {profile.nome.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
                <hr className="my-4" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span className="text-lg">🚪</span>
                  Sair
                </button>
              </nav>
            </div>
          </div>

          {/* Tabs Mobile */}
          <div className="lg:hidden">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {tabs.map(tab => (
                  <option key={tab.id} value={tab.id}>
                    {tab.icon} {tab.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Tab Perfil */}
              {activeTab === 'perfil' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Informações Pessoais</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {isEditing ? 'Cancelar' : 'Editar'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                      <input
                        type="text"
                        value={profile.nome}
                        onChange={(e) => setProfile({...profile, nome: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                      <input
                        type="tel"
                        value={profile.telefone}
                        onChange={(e) => setProfile({...profile, telefone: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CPF</label>
                      <input
                        type="text"
                        value={profile.cpf}
                        onChange={(e) => setProfile({...profile, cpf: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
                      <input
                        type="date"
                        value={profile.dataNascimento}
                        onChange={(e) => setProfile({...profile, dataNascimento: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gênero</label>
                      <select
                        value={profile.genero}
                        onChange={(e) => setProfile({...profile, genero: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      >
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outro">Outro</option>
                        <option value="nao-informar">Prefiro não informar</option>
                      </select>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                      <button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                      >
                        {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-2 rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Tab Endereços */}
              {activeTab === 'enderecos' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Meus Endereços</h2>
                    <button
                      onClick={() => setShowAddressModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Novo Endereço
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">{address.nome}</h3>
                            {address.principal && (
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                                Principal
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingAddress(address);
                                setShowAddressModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-700 p-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button className="text-red-600 hover:text-red-700 p-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{address.rua}, {address.numero}</p>
                          {address.complemento && <p>{address.complemento}</p>}
                          <p>{address.bairro}</p>
                          <p>{address.cidade} - {address.estado}</p>
                          <p>CEP: {address.cep}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {addresses.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📍</div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum endereço cadastrado</h3>
                      <p className="text-gray-500 mb-4">Adicione um endereço para facilitar suas compras</p>
                      <button
                        onClick={() => setShowAddressModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                      >
                        Adicionar Endereço
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Tab Segurança */}
              {activeTab === 'seguranca' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Segurança da Conta</h2>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Senha</h3>
                          <p className="text-sm text-gray-500">Última alteração há 3 meses</p>
                        </div>
                        <button
                          onClick={() => setShowPasswordModal(true)}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Alterar
                        </button>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Autenticação em Dois Fatores</h3>
                          <p className="text-sm text-gray-500">Adicione uma camada extra de segurança</p>
                        </div>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors">
                          Ativar
                        </button>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Sessões Ativas</h3>
                          <p className="text-sm text-gray-500">Gerencie onde você está logado</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                          Ver Todas
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Favoritos */}
              {activeTab === 'favoritos' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Meus Favoritos</h2>

                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">❤️</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto favoritado</h3>
                    <p className="text-gray-500 mb-4">Adicione produtos aos favoritos para encontrá-los facilmente</p>
                    <button
                      onClick={() => router.push('/produtos')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                    >
                      Ver Produtos
                    </button>
                  </div>
                </div>
              )}

              {/* Tab Configurações */}
              {activeTab === 'configuracoes' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Configurações</h2>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-4">Notificações</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-3 text-sm text-gray-700">Receber emails sobre pedidos</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-3 text-sm text-gray-700">Receber ofertas e promoções</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-3 text-sm text-gray-700">Receber newsletter</span>
                        </label>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-4">Privacidade</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-3 text-sm text-gray-700">Permitir cookies de análise</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-3 text-sm text-gray-700">Compartilhar dados para personalização</span>
                        </label>
                      </div>
                    </div>

                    <div className="border border-red-200 rounded-lg p-4">
                      <h3 className="font-medium text-red-900 mb-2">Zona de Perigo</h3>
                      <p className="text-sm text-red-600 mb-4">Ações irreversíveis da conta</p>
                      <button className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                        Excluir Conta
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
