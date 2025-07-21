'use client';

import React, { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/Toast/ToastContext';
import { useRouter } from 'next/navigation';
import { Dialog } from '@headlessui/react';

interface OrderItem {
  id: string;
  nome: string;
  quantidade: number;
  preco: number;
  imagem?: string;
}

interface CustomerOrder {
  id: string;
  numero: string;
  data: string;
  status: 'pendente' | 'confirmado' | 'preparando' | 'enviado' | 'entregue' | 'cancelado';
  items: OrderItem[];
  total: number;
  frete: number;
  pagamento: {
    metodo: string;
    status: 'pendente' | 'aprovado' | 'recusado';
  };
  rastreamento?: {
    codigo: string;
    transportadora: string;
    link?: string;
  };
  endereco: {
    rua: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}

// Dados simulados de pedidos do cliente
const mockCustomerOrders: CustomerOrder[] = [
  {
    id: '1',
    numero: '#001',
    data: '2024-01-15T10:30:00Z',
    status: 'entregue',
    items: [
      { id: '1', nome: 'Vestido Floral', quantidade: 1, preco: 89.90, imagem: '/images/vestido-floral.jpg' },
      { id: '2', nome: 'Sandália Nude', quantidade: 1, preco: 59.90, imagem: '/images/sandalia-nude.jpg' }
    ],
    total: 149.80,
    frete: 0,
    pagamento: {
      metodo: 'Cartão de Crédito',
      status: 'aprovado'
    },
    endereco: {
      rua: 'Rua das Flores, 123',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234-567'
    }
  },
  {
    id: '2',
    numero: '#002',
    data: '2024-01-10T15:45:00Z',
    status: 'enviado',
    items: [
      { id: '3', nome: 'Blusa Básica', quantidade: 2, preco: 39.90, imagem: '/images/blusa-basica.jpg' }
    ],
    total: 79.80,
    frete: 15.90,
    pagamento: {
      metodo: 'PIX',
      status: 'aprovado'
    },
    rastreamento: {
      codigo: 'BR123456789',
      transportadora: 'Correios',
      link: 'https://www2.correios.com.br/sistemas/rastreamento/'
    },
    endereco: {
      rua: 'Av. Principal, 456',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      cep: '20000-000'
    }
  },
  {
    id: '3',
    numero: '#003',
    data: '2024-01-05T09:15:00Z',
    status: 'cancelado',
    items: [
      { id: '4', nome: 'Calça Jeans', quantidade: 1, preco: 129.90, imagem: '/images/calca-jeans.jpg' }
    ],
    total: 129.90,
    frete: 19.90,
    pagamento: {
      metodo: 'Boleto',
      status: 'recusado'
    },
    endereco: {
      rua: 'Rua Central, 789',
      cidade: 'Belo Horizonte',
      estado: 'MG',
      cep: '30000-000'
    }
  }
];

export default function MeusPedidosPage() {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  // Estados principais
  const [orders] = useState<CustomerOrder[]>(mockCustomerOrders);
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Estados de filtros
  const [statusFilter, setStatusFilter] = useState('');
  const [periodFilter, setPeriodFilter] = useState('');

  // Verificar autenticação
  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  // Filtrar pedidos
  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    // Filtro por status
    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filtro por período
    if (periodFilter) {
      const now = new Date();
      const filterDate = new Date();
      
      switch (periodFilter) {
        case '30':
          filterDate.setDate(now.getDate() - 30);
          break;
        case '90':
          filterDate.setDate(now.getDate() - 90);
          break;
        case '365':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      if (periodFilter !== 'todos') {
        filtered = filtered.filter(order => new Date(order.data) >= filterDate);
      }
    }

    // Ordenar por data (mais recente primeiro)
    filtered.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

    return filtered;
  }, [orders, statusFilter, periodFilter]);

  // Função para formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Função para obter cor do status
  const getStatusColor = (status: CustomerOrder['status']) => {
    const colors = {
      pendente: 'bg-yellow-100 text-yellow-800',
      confirmado: 'bg-blue-100 text-blue-800',
      preparando: 'bg-purple-100 text-purple-800',
      enviado: 'bg-indigo-100 text-indigo-800',
      entregue: 'bg-green-100 text-green-800',
      cancelado: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Função para obter nome do status
  const getStatusName = (status: CustomerOrder['status']) => {
    const names = {
      pendente: 'Pendente',
      confirmado: 'Confirmado',
      preparando: 'Preparando',
      enviado: 'Enviado',
      entregue: 'Entregue',
      cancelado: 'Cancelado'
    };
    return names[status] || status;
  };

  // Função para ver detalhes do pedido
  const handleViewOrder = (order: CustomerOrder) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  // Função para recomprar
  const handleReorder = (order: CustomerOrder) => {
    // Simular adição dos itens ao carrinho
    showToast(`${order.items.length} produto${order.items.length > 1 ? 's' : ''} adicionado${order.items.length > 1 ? 's' : ''} ao carrinho!`, 'success');
    router.push('/checkout');
  };

  // Função para rastrear pedido
  const handleTrackOrder = (order: CustomerOrder) => {
    if (order.rastreamento?.link) {
      window.open(order.rastreamento.link, '_blank');
    } else {
      showToast('Código de rastreamento ainda não disponível', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Meus Pedidos</h1>
              <p className="text-gray-600 mt-1">Acompanhe o status dos seus pedidos</p>
            </div>
            <div className="text-sm text-gray-600">
              {filteredOrders.length} pedido{filteredOrders.length !== 1 ? 's' : ''} encontrado{filteredOrders.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos os status</option>
                <option value="pendente">Pendente</option>
                <option value="confirmado">Confirmado</option>
                <option value="preparando">Preparando</option>
                <option value="enviado">Enviado</option>
                <option value="entregue">Entregue</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
              <select
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos os períodos</option>
                <option value="30">Últimos 30 dias</option>
                <option value="90">Últimos 3 meses</option>
                <option value="365">Último ano</option>
              </select>
            </div>
          </div>

          {(statusFilter || periodFilter) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setStatusFilter('');
                  setPeriodFilter('');
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>

        {/* Lista de pedidos */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                {/* Header do pedido */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Pedido {order.numero}</h3>
                      <p className="text-sm text-gray-500">{formatDate(order.data)}</p>
                    </div>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusName(order.status)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Ver detalhes
                    </button>
                    {order.status === 'entregue' && (
                      <button
                        onClick={() => handleReorder(order)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1.5 rounded text-sm transition-colors"
                      >
                        Comprar novamente
                      </button>
                    )}
                    {order.rastreamento && (
                      <button
                        onClick={() => handleTrackOrder(order)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-3 py-1.5 rounded text-sm transition-colors"
                      >
                        Rastrear
                      </button>
                    )}
                  </div>
                </div>

                {/* Items do pedido */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          {item.imagem ? (
                            <img src={item.imagem} alt={item.nome} className="w-10 h-10 object-cover rounded" />
                          ) : (
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.nome}</p>
                          <p className="text-sm text-gray-500">Qtd: {item.quantidade}</p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          R$ {(item.preco * item.quantidade).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total do pedido */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      {order.frete > 0 && ` + Frete R$ ${order.frete.toFixed(2)}`}
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      Total: R$ {(order.total + order.frete).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Estado vazio */
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
            <p className="text-gray-500 mb-6">
              {statusFilter || periodFilter
                ? 'Tente ajustar os filtros para encontrar seus pedidos.'
                : 'Você ainda não fez nenhum pedido. Que tal começar agora?'
              }
            </p>
            {!(statusFilter || periodFilter) && (
              <button
                onClick={() => router.push('/produtos')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
              >
                Ver Produtos
              </button>
            )}
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
                      {getStatusName(selectedOrder.status)}
                    </span>
                  </Dialog.Title>

                  <div className="space-y-6">
                    {/* Informações do pedido */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Informações do Pedido</h3>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Data:</span>
                            <span className="ml-2 font-medium">{formatDate(selectedOrder.data)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Pagamento:</span>
                            <span className="ml-2 font-medium">{selectedOrder.pagamento.metodo}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Endereço de entrega */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Endereço de Entrega</h3>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-900">{selectedOrder.endereco.rua}</div>
                        <div className="text-sm text-gray-600">
                          {selectedOrder.endereco.cidade}, {selectedOrder.endereco.estado}
                        </div>
                        <div className="text-sm text-gray-600">CEP: {selectedOrder.endereco.cep}</div>
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
                              <button
                                onClick={() => handleTrackOrder(selectedOrder)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                Rastrear 🔗
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Items do pedido */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Items do Pedido</h3>
                      <div className="bg-gray-50 rounded-lg p-3">
                        {selectedOrder.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                                {item.imagem ? (
                                  <img src={item.imagem} alt={item.nome} className="w-8 h-8 object-cover rounded" />
                                ) : (
                                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{item.nome}</div>
                                <div className="text-sm text-gray-600">Quantidade: {item.quantidade}</div>
                              </div>
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              R$ {(item.preco * item.quantidade).toFixed(2)}
                            </div>
                          </div>
                        ))}

                        <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-300">
                          <div className="text-sm text-gray-600">
                            Subtotal: R$ {selectedOrder.total.toFixed(2)}
                            {selectedOrder.frete > 0 && (
                              <div>Frete: R$ {selectedOrder.frete.toFixed(2)}</div>
                            )}
                          </div>
                          <div className="text-base font-semibold text-gray-900">
                            Total: R$ {(selectedOrder.total + selectedOrder.frete).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                    {selectedOrder.status === 'entregue' && (
                      <button
                        onClick={() => {
                          handleReorder(selectedOrder);
                          setShowOrderModal(false);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Comprar Novamente
                      </button>
                    )}
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
      </div>
    </div>
  );
}
