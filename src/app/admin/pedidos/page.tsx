'use client';

import React, { useState, useMemo } from 'react';
import { Dialog } from '@headlessui/react';

interface Order {
  id: string;
  numero: string;
  cliente: {
    nome: string;
    email: string;
    telefone?: string;
  };
  items: {
    id: string;
    nome: string;
    quantidade: number;
    preco: number;
  }[];
  total: number;
  status: 'pendente' | 'confirmado' | 'preparando' | 'enviado' | 'entregue' | 'cancelado';
  pagamento: {
    metodo: string;
    status: 'pendente' | 'aprovado' | 'recusado';
  };
  endereco: {
    rua: string;
    cidade: string;
    cep: string;
    estado: string;
  };
  rastreamento?: {
    codigo: string;
    transportadora: string;
    link?: string;
  };
  notificacoes: {
    email_enviado: boolean;
    whatsapp_enviado: boolean;
    ultima_notificacao?: string;
  };
  created_at: string;
  updated_at?: string;
}

// Dados simulados de pedidos
const mockOrders: Order[] = [
  {
    id: '1',
    numero: '#001',
    cliente: {
      nome: 'Maria Silva',
      email: 'maria@email.com',
      telefone: '(11) 99999-9999'
    },
    items: [
      { id: '1', nome: 'Vestido Floral', quantidade: 1, preco: 89.90 },
      { id: '2', nome: 'Sandália Nude', quantidade: 1, preco: 59.90 }
    ],
    total: 149.80,
    status: 'pendente',
    pagamento: {
      metodo: 'Cartão de Crédito',
      status: 'pendente'
    },
    endereco: {
      rua: 'Rua das Flores, 123',
      cidade: 'São Paulo',
      cep: '01234-567',
      estado: 'SP'
    },
    notificacoes: {
      email_enviado: false,
      whatsapp_enviado: false
    },
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    numero: '#002',
    cliente: {
      nome: 'Ana Costa',
      email: 'ana@email.com',
      telefone: '(11) 88888-8888'
    },
    items: [
      { id: '3', nome: 'Blusa Básica', quantidade: 2, preco: 39.90 }
    ],
    total: 79.80,
    status: 'confirmado',
    pagamento: {
      metodo: 'PIX',
      status: 'aprovado'
    },
    endereco: {
      rua: 'Av. Principal, 456',
      cidade: 'Rio de Janeiro',
      cep: '20000-000',
      estado: 'RJ'
    },
    notificacoes: {
      email_enviado: true,
      whatsapp_enviado: true,
      ultima_notificacao: '2024-01-14T16:00:00Z'
    },
    created_at: '2024-01-14T15:45:00Z'
  },
  {
    id: '3',
    numero: '#003',
    cliente: {
      nome: 'Carla Santos',
      email: 'carla@email.com'
    },
    items: [
      { id: '4', nome: 'Calça Jeans', quantidade: 1, preco: 129.90 }
    ],
    total: 129.90,
    status: 'enviado',
    pagamento: {
      metodo: 'Boleto',
      status: 'aprovado'
    },
    endereco: {
      rua: 'Rua Central, 789',
      cidade: 'Belo Horizonte',
      cep: '30000-000',
      estado: 'MG'
    },
    rastreamento: {
      codigo: 'BR123456789',
      transportadora: 'Correios',
      link: 'https://www2.correios.com.br/sistemas/rastreamento/'
    },
    notificacoes: {
      email_enviado: true,
      whatsapp_enviado: true,
      ultima_notificacao: '2024-01-13T14:30:00Z'
    },
    created_at: '2024-01-13T09:15:00Z'
  }
];

interface Filters {
  search: string;
  status: string;
  pagamento: string;
  periodo: string;
}

export default function AdminOrdersPage() {
  // Estados principais
  const [orderList, setOrderList] = useState<Order[]>(mockOrders);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Estados de modais
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showInlineTracking, setShowInlineTracking] = useState(false);

  // Estados para rastreamento
  const [trackingForm, setTrackingForm] = useState({
    codigo: '',
    transportadora: 'Correios',
    link: ''
  });
  
  // Estados de filtros
  const [filters, setFilters] = useState<Filters>({
    search: '',
    status: '',
    pagamento: '',
    periodo: ''
  });

  // Filtrar pedidos
  const filteredOrders = useMemo(() => {
    let filtered = [...orderList];

    // Filtro de busca
    if (filters.search) {
      filtered = filtered.filter(order =>
        order.numero.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.cliente.nome.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.cliente.email.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filtro de status
    if (filters.status) {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    // Filtro de pagamento
    if (filters.pagamento) {
      filtered = filtered.filter(order => order.pagamento.status === filters.pagamento);
    }

    // Filtro de período
    if (filters.periodo) {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.periodo) {
        case 'hoje':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'semana':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'mes':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      if (filters.periodo !== 'todos') {
        filtered = filtered.filter(order => new Date(order.created_at) >= filterDate);
      }
    }

    // Ordenar por data (mais recente primeiro)
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return filtered;
  }, [orderList, filters]);

  // Paginação
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  // Funções de filtro
  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      pagamento: '',
      periodo: ''
    });
    setCurrentPage(1);
  };

  // Funções de pedido
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrderList(orderList.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updated_at: new Date().toISOString() }
        : order
    ));
  };

  const handleBulkStatusChange = (status: Order['status']) => {
    setOrderList(orderList.map(order =>
      selectedOrders.includes(order.id)
        ? { ...order, status, updated_at: new Date().toISOString() }
        : order
    ));
    setSelectedOrders([]);
    setShowBulkActions(false);
  };

  // Funções de notificação
  const sendNotification = async (orderId: string, type: 'email' | 'whatsapp') => {
    // Simular envio de notificação
    await new Promise(resolve => setTimeout(resolve, 1000));

    setOrderList(orderList.map(order =>
      order.id === orderId
        ? {
            ...order,
            notificacoes: {
              ...order.notificacoes,
              [type === 'email' ? 'email_enviado' : 'whatsapp_enviado']: true,
              ultima_notificacao: new Date().toISOString()
            }
          }
        : order
    ));
  };

  // Função para adicionar rastreamento
  const handleAddTracking = (orderId: string) => {
    const order = orderList.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setTrackingForm({
        codigo: '',
        transportadora: 'Correios',
        link: ''
      });
      setShowTrackingModal(true);
    }
  };

  const handleSaveTracking = () => {
    if (selectedOrder && trackingForm.codigo) {
      setOrderList(orderList.map(order =>
        order.id === selectedOrder.id
          ? {
              ...order,
              rastreamento: {
                codigo: trackingForm.codigo,
                transportadora: trackingForm.transportadora,
                link: trackingForm.link || `https://www2.correios.com.br/sistemas/rastreamento/`
              },
              status: 'enviado',
              updated_at: new Date().toISOString()
            }
          : order
      ));
      setShowTrackingModal(false);

      // Enviar notificação automática
      if (selectedOrder) {
        sendNotification(selectedOrder.id, 'email');
        sendNotification(selectedOrder.id, 'whatsapp');
      }
    }
  };

  // Função para formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Função para obter cor do status
  const getStatusColor = (status: Order['status']) => {
    const colors: Record<string, string> = {
      pendente: 'bg-yellow-100 text-yellow-800',
      confirmado: 'bg-blue-100 text-blue-800',
      preparando: 'bg-purple-100 text-purple-800',
      enviado: 'bg-indigo-100 text-indigo-800',
      entregue: 'bg-green-100 text-green-800',
      cancelado: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Função para obter cor do pagamento
  const getPaymentColor = (status: string) => {
    const colors: Record<string, string> = {
      pendente: 'bg-yellow-100 text-yellow-800',
      aprovado: 'bg-green-100 text-green-800',
      recusado: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pedidos</h1>
          <p className="text-gray-600 mt-1">Gerencie todos os pedidos da loja</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {filteredOrders.length} pedido{filteredOrders.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Busca */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <div className="relative">
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Número, cliente ou email..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="pendente">Pendente</option>
              <option value="confirmado">Confirmado</option>
              <option value="preparando">Preparando</option>
              <option value="enviado">Enviado</option>
              <option value="entregue">Entregue</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          {/* Pagamento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pagamento</label>
            <select
              value={filters.pagamento}
              onChange={(e) => handleFilterChange('pagamento', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="pendente">Pendente</option>
              <option value="aprovado">Aprovado</option>
              <option value="recusado">Recusado</option>
            </select>
          </div>

          {/* Período */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
            <select
              value={filters.periodo}
              onChange={(e) => handleFilterChange('periodo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="hoje">Hoje</option>
              <option value="semana">Última semana</option>
              <option value="mes">Último mês</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {filteredOrders.length} pedido{filteredOrders.length !== 1 ? 's' : ''} encontrado{filteredOrders.length !== 1 ? 's' : ''}
            </span>
            {(filters.search || filters.status || filters.pagamento || filters.periodo) && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Limpar filtros
              </button>
            )}
          </div>
          
          {selectedOrders.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {selectedOrders.length} selecionado{selectedOrders.length !== 1 ? 's' : ''}
              </span>
              <button
                onClick={() => setShowBulkActions(true)}
                className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium px-3 py-1.5 rounded transition-colors"
              >
                Ações em lote
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lista de pedidos */}
      {paginatedOrders.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === paginatedOrders.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrders(paginatedOrders.map(o => o.id));
                        } else {
                          setSelectedOrders([]);
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pedido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pagamento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedOrders([...selectedOrders, order.id]);
                          } else {
                            setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.numero}</div>
                      <div className="text-sm text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{order.cliente.nome}</div>
                      <div className="text-sm text-gray-500">{order.cliente.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">R$ {order.total.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className={`text-xs font-semibold px-2 py-1 rounded-full border-0 ${getStatusColor(order.status)}`}
                      >
                        <option value="pendente">Pendente</option>
                        <option value="confirmado">Confirmado</option>
                        <option value="preparando">Preparando</option>
                        <option value="enviado">Enviado</option>
                        <option value="entregue">Entregue</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentColor(order.pagamento.status)}`}>
                        {order.pagamento.status === 'pendente' ? 'Pendente' :
                         order.pagamento.status === 'aprovado' ? 'Aprovado' : 'Recusado'}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">{order.pagamento.metodo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          Ver detalhes
                        </button>
                        {order.status === 'preparando' && !order.rastreamento && (
                          <button
                            onClick={() => handleAddTracking(order.id)}
                            className="text-green-600 hover:text-green-900 transition-colors text-xs"
                          >
                            + Rastreamento
                          </button>
                        )}
                        {!order.notificacoes.email_enviado && (
                          <button
                            onClick={() => sendNotification(order.id, 'email')}
                            className="text-purple-600 hover:text-purple-900 transition-colors text-xs"
                          >
                            📧 Email
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden grid grid-cols-1 gap-4">
            {paginatedOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrders([...selectedOrders, order.id]);
                        } else {
                          setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.numero}</div>
                      <div className="text-xs text-gray-500">{formatDate(order.created_at)}</div>
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{order.cliente.nome}</div>
                    <div className="text-xs text-gray-500">{order.cliente.email}</div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">R$ {order.total.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentColor(order.pagamento.status)}`}>
                        {order.pagamento.status === 'pendente' ? 'Pendente' :
                         order.pagamento.status === 'aprovado' ? 'Aprovado' : 'Recusado'}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">{order.pagamento.metodo}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                      className="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pendente">Pendente</option>
                      <option value="confirmado">Confirmado</option>
                      <option value="preparando">Preparando</option>
                      <option value="enviado">Enviado</option>
                      <option value="entregue">Entregue</option>
                      <option value="cancelado">Cancelado</option>
                    </select>

                    <button
                      onClick={() => handleViewOrder(order)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
                    >
                      Ver detalhes
                    </button>
                  </div>

                  {/* Ações rápidas mobile */}
                  <div className="flex gap-2">
                    {order.status === 'preparando' && !order.rastreamento && (
                      <button
                        onClick={() => handleAddTracking(order.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-2 py-1.5 rounded transition-colors"
                      >
                        + Rastreamento
                      </button>
                    )}

                    {!order.notificacoes.email_enviado && (
                      <button
                        onClick={() => sendNotification(order.id, 'email')}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-2 py-1.5 rounded transition-colors"
                      >
                        📧 Email
                      </button>
                    )}

                    {order.rastreamento && (
                      <button
                        onClick={() => window.open(order.rastreamento?.link, '_blank')}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-2 py-1.5 rounded transition-colors"
                      >
                        🔗 Rastrear
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Estado vazio */
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
          <p className="text-gray-500">
            {filters.search || filters.status || filters.pagamento || filters.periodo
              ? 'Tente ajustar os filtros para encontrar pedidos.'
              : 'Os pedidos aparecerão aqui quando os clientes fizerem compras.'
            }
          </p>
        </div>
      )}

      {/* Modal de Detalhes do Pedido */}
      <Dialog open={showOrderModal} onClose={() => setShowOrderModal(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-2 md:px-4 py-4 relative">
          <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
          <Dialog.Panel className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto p-4 md:p-6 z-10 max-h-[90vh] overflow-y-auto">
            {selectedOrder && (
              <>
                <Dialog.Title className="text-lg md:text-xl font-bold mb-4 flex items-center justify-between">
                  <span>Pedido {selectedOrder.numero}</span>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </Dialog.Title>

                <div className="space-y-6">
                  {/* Informações do Cliente */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Cliente</h3>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm font-medium text-gray-900">{selectedOrder.cliente.nome}</div>
                      <div className="text-sm text-gray-600">{selectedOrder.cliente.email}</div>
                      {selectedOrder.cliente.telefone && (
                        <div className="text-sm text-gray-600">{selectedOrder.cliente.telefone}</div>
                      )}
                    </div>
                  </div>

                  {/* Items do Pedido */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Items do Pedido</h3>
                    <div className="bg-gray-50 rounded-lg p-3">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.nome}</div>
                            <div className="text-sm text-gray-600">Quantidade: {item.quantidade}</div>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            R$ {(item.preco * item.quantidade).toFixed(2)}
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-300">
                        <div className="text-base font-semibold text-gray-900">Total</div>
                        <div className="text-base font-semibold text-gray-900">R$ {selectedOrder.total.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Informações de Pagamento */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Pagamento</h3>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{selectedOrder.pagamento.metodo}</div>
                          <div className="text-sm text-gray-600">Status do pagamento</div>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentColor(selectedOrder.pagamento.status)}`}>
                          {selectedOrder.pagamento.status === 'pendente' ? 'Pendente' :
                           selectedOrder.pagamento.status === 'aprovado' ? 'Aprovado' : 'Recusado'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rastreamento */}
                  {selectedOrder.rastreamento && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Rastreamento</h3>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              Código: {selectedOrder.rastreamento.codigo}
                            </div>
                            <div className="text-sm text-gray-600">
                              Transportadora: {selectedOrder.rastreamento.transportadora}
                            </div>
                          </div>
                          {selectedOrder.rastreamento.link && (
                            <a
                              href={selectedOrder.rastreamento.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Rastrear 🔗
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Status das Notificações */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Notificações</h3>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${selectedOrder.notificacoes.email_enviado ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <span className="text-sm text-gray-700">
                              Email {selectedOrder.notificacoes.email_enviado ? 'enviado' : 'não enviado'}
                            </span>
                          </div>
                          {!selectedOrder.notificacoes.email_enviado && (
                            <button
                              onClick={() => sendNotification(selectedOrder.id, 'email')}
                              className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded transition-colors"
                            >
                              Enviar
                            </button>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${selectedOrder.notificacoes.whatsapp_enviado ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <span className="text-sm text-gray-700">
                              WhatsApp {selectedOrder.notificacoes.whatsapp_enviado ? 'enviado' : 'não enviado'}
                            </span>
                          </div>
                          {!selectedOrder.notificacoes.whatsapp_enviado && (
                            <button
                              onClick={() => sendNotification(selectedOrder.id, 'whatsapp')}
                              className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded transition-colors"
                            >
                              Enviar
                            </button>
                          )}
                        </div>
                      </div>
                      {selectedOrder.notificacoes.ultima_notificacao && (
                        <div className="text-xs text-gray-500 mt-2">
                          Última notificação: {formatDate(selectedOrder.notificacoes.ultima_notificacao)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ações do Pedido */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Ações do Pedido</h3>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Alterar Status */}
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Status do Pedido</label>
                          <select
                            value={selectedOrder.status}
                            onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as Order['status'])}
                            className="w-full text-xs px-2 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="pendente">Pendente</option>
                            <option value="confirmado">Confirmado</option>
                            <option value="preparando">Preparando</option>
                            <option value="enviado">Enviado</option>
                            <option value="entregue">Entregue</option>
                            <option value="cancelado">Cancelado</option>
                          </select>
                        </div>

                        {/* Adicionar Rastreamento */}
                        {selectedOrder.status === 'preparando' && !selectedOrder.rastreamento && (
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Rastreamento</label>
                            <button
                              onClick={() => setShowInlineTracking(!showInlineTracking)}
                              className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
                            >
                              {showInlineTracking ? 'Cancelar' : '+ Adicionar Código'}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Botões de Ação */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-200">
                        {!selectedOrder.notificacoes.email_enviado && (
                          <button
                            onClick={() => sendNotification(selectedOrder.id, 'email')}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-2 rounded transition-colors flex items-center justify-center gap-1"
                          >
                            📧 Email
                          </button>
                        )}

                        {!selectedOrder.notificacoes.whatsapp_enviado && (
                          <button
                            onClick={() => sendNotification(selectedOrder.id, 'whatsapp')}
                            className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-2 rounded transition-colors flex items-center justify-center gap-1"
                          >
                            📱 WhatsApp
                          </button>
                        )}

                        {selectedOrder.rastreamento && (
                          <button
                            onClick={() => window.open(selectedOrder.rastreamento?.link, '_blank')}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-3 py-2 rounded transition-colors flex items-center justify-center gap-1"
                          >
                            🔗 Rastrear
                          </button>
                        )}
                      </div>

                      {/* Formulário Inline de Rastreamento */}
                      {showInlineTracking && selectedOrder.status === 'preparando' && !selectedOrder.rastreamento && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Adicionar Código de Rastreamento</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Código de Rastreamento*</label>
                              <input
                                type="text"
                                value={trackingForm.codigo}
                                onChange={(e) => setTrackingForm({...trackingForm, codigo: e.target.value})}
                                className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="BR123456789"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Transportadora</label>
                                <select
                                  value={trackingForm.transportadora}
                                  onChange={(e) => setTrackingForm({...trackingForm, transportadora: e.target.value})}
                                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  <option value="Correios">Correios</option>
                                  <option value="Jadlog">Jadlog</option>
                                  <option value="Total Express">Total Express</option>
                                  <option value="Loggi">Loggi</option>
                                  <option value="Outro">Outro</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Link (opcional)</label>
                                <input
                                  type="url"
                                  value={trackingForm.link}
                                  onChange={(e) => setTrackingForm({...trackingForm, link: e.target.value})}
                                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="https://..."
                                />
                              </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <div className="flex items-start">
                                <svg className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="text-xs text-blue-800">
                                  <p className="font-medium">Notificações Automáticas</p>
                                  <p>O cliente receberá email e WhatsApp automaticamente com o código de rastreamento.</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  handleSaveTracking();
                                  setShowInlineTracking(false);
                                }}
                                disabled={!trackingForm.codigo}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                              >
                                Salvar e Notificar
                              </button>
                              <button
                                onClick={() => setShowInlineTracking(false)}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowOrderModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Modal de Ações em Lote */}
      <Dialog open={showBulkActions} onClose={() => setShowBulkActions(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 py-4 relative">
          <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
          <Dialog.Panel className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-4 md:p-6 z-10">
            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
              Ações em Lote
            </Dialog.Title>
            <p className="text-sm text-gray-600 mb-6">
              {selectedOrders.length} pedido{selectedOrders.length !== 1 ? 's' : ''} selecionado{selectedOrders.length !== 1 ? 's' : ''}
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleBulkStatusChange('confirmado')}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Marcar como Confirmado
              </button>

              <button
                onClick={() => handleBulkStatusChange('enviado')}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                Marcar como Enviado
              </button>

              <button
                onClick={() => handleBulkStatusChange('entregue')}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Marcar como Entregue
              </button>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowBulkActions(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Modal de Rastreamento */}
      <Dialog open={showTrackingModal} onClose={() => setShowTrackingModal(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 py-4 relative">
          <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
          <Dialog.Panel className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-4 md:p-6 z-10">
            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
              Adicionar Código de Rastreamento
            </Dialog.Title>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Código de Rastreamento*</label>
                <input
                  type="text"
                  value={trackingForm.codigo}
                  onChange={(e) => setTrackingForm({...trackingForm, codigo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="BR123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transportadora</label>
                <select
                  value={trackingForm.transportadora}
                  onChange={(e) => setTrackingForm({...trackingForm, transportadora: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Correios">Correios</option>
                  <option value="Jadlog">Jadlog</option>
                  <option value="Total Express">Total Express</option>
                  <option value="Loggi">Loggi</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link de Rastreamento (opcional)</label>
                <input
                  type="url"
                  value={trackingForm.link}
                  onChange={(e) => setTrackingForm({...trackingForm, link: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Notificações Automáticas</p>
                  <p>O cliente receberá automaticamente:</p>
                  <ul className="list-disc list-inside mt-1 text-xs">
                    <li>Email com código de rastreamento</li>
                    <li>WhatsApp com link para acompanhar</li>
                    <li>Status alterado para "Enviado"</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowTrackingModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveTracking}
                disabled={!trackingForm.codigo}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Salvar e Notificar
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
