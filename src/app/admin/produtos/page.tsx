'use client';

import React, { useState, useMemo } from 'react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { Dialog } from '@headlessui/react';

interface Product {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  precoAntigo?: number;
  categoria?: string;
  imagem?: string;
  imagens?: string[];
  estoque?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

interface Filters {
  search: string;
  category: string;
  status: string;
  priceRange: string;
  sortBy: string;
}

export default function AdminProductsPage() {
  // Estados principais
  const [productList, setProductList] = useState<Product[]>(products);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  
  // Estados de modais
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  
  // Estados de formulário
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  
  // Estados de filtros
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: '',
    status: '',
    priceRange: '',
    sortBy: 'newest'
  });
  
  // Estados de formulário de produto
  const [productForm, setProductForm] = useState({
    nome: '',
    descricao: '',
    preco: '',
    precoAntigo: '',
    categoria: '',
    estoque: '',
    status: 'ativo',
    imagem: ''
  });
  
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // Filtrar e ordenar produtos
  const filteredProducts = useMemo(() => {
    let filtered = [...productList];

    // Filtro de busca
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.nome.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.descricao?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filtro de categoria
    if (filters.category) {
      filtered = filtered.filter(product => product.categoria === filters.category);
    }

    // Filtro de status
    if (filters.status) {
      filtered = filtered.filter(product => product.status === filters.status);
    }

    // Filtro de preço
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.preco >= min && product.preco <= max;
        } else {
          return product.preco >= min;
        }
      });
    }

    // Ordenação
    switch (filters.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.preco - b.preco);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.preco - a.preco);
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime());
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
    }

    return filtered;
  }, [productList, filters]);

  // Paginação
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Funções de filtro
  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset para primeira página
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      status: '',
      priceRange: '',
      sortBy: 'newest'
    });
    setCurrentPage(1);
  };

  // Funções de produto
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      nome: product.nome,
      descricao: product.descricao || '',
      preco: product.preco.toString(),
      precoAntigo: product.precoAntigo?.toString() || '',
      categoria: product.categoria || '',
      estoque: product.estoque?.toString() || '',
      status: product.status || 'ativo',
      imagem: product.imagem || ''
    });

    const existingImages = product.imagens || (product.imagem ? [product.imagem] : []);
    setSelectedImages(existingImages);

    setFormError(null);
    setFormSuccess(null);
    setShowProductModal(true);
  };

  const handleDeleteProduct = (productId: string) => {
    setProductToDelete(productId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      setProductList(productList.filter(p => p.id !== productToDelete));
      setSelectedProducts(selectedProducts.filter(id => id !== productToDelete));
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  };

  const handleBulkDelete = () => {
    setProductList(productList.filter(p => !selectedProducts.includes(p.id)));
    setSelectedProducts([]);
    setShowBulkActions(false);
  };

  const handleBulkStatusChange = (status: string) => {
    setProductList(productList.map(p =>
      selectedProducts.includes(p.id) ? { ...p, status } : p
    ));
    setSelectedProducts([]);
    setShowBulkActions(false);
  };

  // Funções do modal de produto
  const handleOpenProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      nome: '', descricao: '', preco: '', precoAntigo: '', categoria: '', estoque: '', status: 'ativo', imagem: ''
    });
    setSelectedImages([]);
    setFormError(null);
    setFormSuccess(null);
    setShowProductModal(true);
  };

  const handleProductFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file' && files) {
      handleImageUpload(files);
    } else {
      setProductForm({ ...productForm, [name]: value });
    }
  };

  const handleImageUpload = (files: FileList) => {
    const newImages: string[] = [];
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        newImages.push(url);
      }
    });

    const updatedImages = [...selectedImages, ...newImages];
    setSelectedImages(updatedImages);

    if (updatedImages.length > 0) {
      setProductForm({ ...productForm, imagem: updatedImages[0] });
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);

    if (updatedImages.length > 0) {
      setProductForm({ ...productForm, imagem: updatedImages[0] });
    } else {
      setProductForm({ ...productForm, imagem: '' });
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!productForm.nome || !productForm.preco || !productForm.categoria) {
      setFormError('Preencha os campos obrigatórios: nome, preço e categoria.');
      return;
    }

    if (editingProduct) {
      const produtoAtualizado = {
        ...editingProduct,
        nome: productForm.nome,
        descricao: productForm.descricao,
        preco: parseFloat(productForm.preco),
        precoAntigo: productForm.precoAntigo ? parseFloat(productForm.precoAntigo) : undefined,
        categoria: productForm.categoria,
        imagens: selectedImages,
        imagem: selectedImages[0] || '',
        estoque: productForm.estoque ? parseInt(productForm.estoque) : undefined,
        status: productForm.status,
        updated_at: new Date().toISOString(),
      };

      setProductList(productList.map(p => p.id === editingProduct.id ? produtoAtualizado : p));
      setFormSuccess('Produto atualizado com sucesso!');
    } else {
      const novoProduto = {
        id: (Math.random() * 100000).toFixed(0),
        nome: productForm.nome,
        descricao: productForm.descricao,
        preco: parseFloat(productForm.preco),
        precoAntigo: productForm.precoAntigo ? parseFloat(productForm.precoAntigo) : undefined,
        categoria: productForm.categoria,
        imagens: selectedImages,
        imagem: selectedImages[0] || '',
        estoque: productForm.estoque ? parseInt(productForm.estoque) : undefined,
        status: productForm.status,
        created_at: new Date().toISOString(),
      };

      setProductList([novoProduto, ...productList]);
      setFormSuccess('Produto adicionado com sucesso!');
    }

    setTimeout(() => {
      setShowProductModal(false);
      setFormSuccess(null);
      setEditingProduct(null);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Produtos</h1>
          <p className="text-gray-600 mt-1">Gerencie seu catálogo de produtos</p>
        </div>
        <button
          onClick={handleOpenProductModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Produto
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {/* Busca */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <div className="relative">
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Nome ou descrição..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas</option>
              {categories.map(cat => (
                <option key={cat.slug} value={cat.slug}>{cat.nome}</option>
              ))}
            </select>
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
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>

          {/* Preço */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="0-50">R$ 0 - R$ 50</option>
              <option value="50-100">R$ 50 - R$ 100</option>
              <option value="100-200">R$ 100 - R$ 200</option>
              <option value="200">R$ 200+</option>
            </select>
          </div>

          {/* Ordenação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Mais recente</option>
              <option value="oldest">Mais antigo</option>
              <option value="name">Nome A-Z</option>
              <option value="price-low">Menor preço</option>
              <option value="price-high">Maior preço</option>
            </select>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </span>
            {(filters.search || filters.category || filters.status || filters.priceRange) && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Limpar filtros
              </button>
            )}
          </div>
          
          {selectedProducts.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {selectedProducts.length} selecionado{selectedProducts.length !== 1 ? 's' : ''}
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

      {/* Lista de produtos */}
      {paginatedProducts.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === paginatedProducts.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProducts(paginatedProducts.map(p => p.id));
                        } else {
                          setSelectedProducts([]);
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts([...selectedProducts, product.id]);
                          } else {
                            setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center mr-4">
                          {product.imagem ? (
                            <img src={product.imagem} alt={product.nome} className="h-10 w-10 object-cover rounded" />
                          ) : (
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.nome}</div>
                          {product.descricao && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">{product.descricao}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {categories.find(cat => cat.slug === product.categoria)?.nome || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">R$ {product.preco.toFixed(2)}</div>
                      {product.precoAntigo && (
                        <div className="text-sm text-gray-500 line-through">R$ {product.precoAntigo.toFixed(2)}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.estoque || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.status === 'ativo'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-start justify-between mb-3">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProducts([...selectedProducts, product.id]);
                      } else {
                        setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                  />
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.status === 'ativo'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status === 'ativo' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                    {product.imagem ? (
                      <img src={product.imagem} alt={product.nome} className="h-14 w-14 object-cover rounded" />
                    ) : (
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{product.nome}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {categories.find(cat => cat.slug === product.categoria)?.nome || 'Sem categoria'}
                    </p>
                    <div className="mt-2">
                      <span className="text-lg font-semibold text-gray-900">R$ {product.preco.toFixed(2)}</span>
                      {product.precoAntigo && (
                        <span className="ml-2 text-sm text-gray-500 line-through">R$ {product.precoAntigo.toFixed(2)}</span>
                      )}
                    </div>
                    {product.estoque && (
                      <p className="text-xs text-gray-500 mt-1">Estoque: {product.estoque}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-4 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-900 text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-900 text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Excluir</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Estado vazio */
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
          <p className="text-gray-500 mb-6">
            {filters.search || filters.category || filters.status || filters.priceRange
              ? 'Tente ajustar os filtros para encontrar produtos.'
              : 'Comece adicionando seu primeiro produto ao catálogo.'
            }
          </p>
          {!(filters.search || filters.category || filters.status || filters.priceRange) && (
            <button
              onClick={handleOpenProductModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Adicionar Primeiro Produto
            </button>
          )}
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-700">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredProducts.length)} de {filteredProducts.length} produtos
            </div>

            <div className="flex items-center justify-center sm:justify-end space-x-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 text-sm font-medium border ${
                      currentPage === pageNum
                        ? 'bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      <Dialog open={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 py-4 relative">
          <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
          <Dialog.Panel className="relative bg-white rounded-lg shadow-lg w-full max-w-sm mx-auto p-4 md:p-6 z-10">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <Dialog.Title className="text-base md:text-lg font-medium text-gray-900 text-center mb-2">
              Confirmar Exclusão
            </Dialog.Title>
            <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </p>
            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full md:flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 md:py-2 px-4 rounded-lg transition-colors text-sm md:text-base"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteProduct}
                className="w-full md:flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 md:py-2 px-4 rounded-lg transition-colors text-sm md:text-base"
              >
                Excluir
              </button>
            </div>
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
              {selectedProducts.length} produto{selectedProducts.length !== 1 ? 's' : ''} selecionado{selectedProducts.length !== 1 ? 's' : ''}
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleBulkStatusChange('ativo')}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Marcar como Ativo
              </button>

              <button
                onClick={() => handleBulkStatusChange('inativo')}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Marcar como Inativo
              </button>

              <button
                onClick={handleBulkDelete}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Excluir Selecionados
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

      {/* Modal de Produto */}
      <Dialog open={showProductModal} onClose={() => setShowProductModal(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-2 md:px-4 py-4 relative">
          <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
          <Dialog.Panel className="relative bg-white rounded-lg shadow-lg w-full max-w-[95vw] sm:max-w-[600px] mx-auto p-4 md:p-6 z-10 max-h-[95vh] overflow-y-auto">
            <Dialog.Title className="text-lg md:text-xl font-bold mb-4">
              {editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
            </Dialog.Title>
            <form onSubmit={handleAddProduct} className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome*</label>
                <input
                  name="nome"
                  value={productForm.nome}
                  onChange={handleProductFormChange}
                  className="w-full px-3 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  required
                  placeholder="Digite o nome do produto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <textarea
                  name="descricao"
                  value={productForm.descricao}
                  onChange={handleProductFormChange}
                  className="w-full px-3 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base resize-none"
                  rows={3}
                  placeholder="Descreva o produto (opcional)"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Preço*</label>
                  <input
                    name="preco"
                    type="number"
                    step="0.01"
                    value={productForm.preco}
                    onChange={handleProductFormChange}
                    className="w-full px-3 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                    required
                    placeholder="0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Preço Antigo</label>
                  <input
                    name="precoAntigo"
                    type="number"
                    step="0.01"
                    value={productForm.precoAntigo}
                    onChange={handleProductFormChange}
                    className="w-full px-3 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                    placeholder="0,00 (opcional)"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Categoria*</label>
                  <select
                    name="categoria"
                    value={productForm.categoria}
                    onChange={handleProductFormChange}
                    className="w-full px-3 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map(cat => (
                      <option key={cat.slug} value={cat.slug}>{cat.nome}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Estoque</label>
                  <input
                    name="estoque"
                    type="number"
                    value={productForm.estoque}
                    onChange={handleProductFormChange}
                    className="w-full px-3 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                    placeholder="Quantidade (opcional)"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={productForm.status}
                  onChange={handleProductFormChange}
                  className="w-full px-3 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>

              {/* Upload de Imagens */}
              <div>
                <label className="block text-sm font-medium mb-2">Imagens do Produto</label>

                <div className="mb-4">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Clique para enviar</span> ou arraste as imagens
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB cada)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={handleProductFormChange}
                    />
                  </label>
                </div>

                {selectedImages.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Imagens selecionadas:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          >
                            ×
                          </button>
                          {index === 0 && (
                            <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                              Principal
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <label className="block text-sm font-medium mb-1">Ou adicione por URL</label>
                  <div className="flex gap-2">
                    <input
                      name="imagem"
                      type="url"
                      value={productForm.imagem}
                      onChange={handleProductFormChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (productForm.imagem && !selectedImages.includes(productForm.imagem)) {
                          setSelectedImages([...selectedImages, productForm.imagem]);
                        }
                      }}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors text-sm"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>

              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                  {formError}
                </div>
              )}
              {formSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-sm">
                  {formSuccess}
                </div>
              )}
              <div className="flex flex-col md:flex-row gap-3 md:gap-2 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="w-full md:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 md:py-2 rounded-lg transition-colors text-sm md:text-base"
                >
                  {editingProduct ? 'Atualizar Produto' : 'Adicionar Produto'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="w-full md:flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-3 md:py-2 rounded-lg transition-colors text-sm md:text-base"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
