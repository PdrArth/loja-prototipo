'use client';

import React, { useState } from 'react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { Dialog } from '@headlessui/react';


export default function AdminDashboard() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [productForm, setProductForm] = useState({
    nome: '',
    descricao: '',
    preco: '',
    precoAntigo: '',
    categoria: '',
    estoque: '',
    status: 'ativo',
    imagem: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [productList, setProductList] = useState(products);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  function handleOpenProductModal() {
    setEditingProduct(null);
    setProductForm({
      nome: '', descricao: '', preco: '', precoAntigo: '', categoria: '', estoque: '', status: 'ativo', imagem: ''
    });
    setSelectedImages([]);
    setImagePreview(null);
    setFormError(null);
    setFormSuccess(null);
    setShowProductModal(true);
  }

  function handleEditProduct(product: any) {
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

    // Carregar imagens existentes
    const existingImages = product.imagens || (product.imagem ? [product.imagem] : []);
    setSelectedImages(existingImages);
    setImagePreview(existingImages[0] || null);

    setFormError(null);
    setFormSuccess(null);
    setShowProductModal(true);
  }

  function handleDeleteProduct(productId: string) {
    setProductToDelete(productId);
    setShowDeleteConfirm(true);
  }

  function confirmDeleteProduct() {
    if (productToDelete) {
      setProductList(productList.filter(p => p.id !== productToDelete));
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  }

  function handleProductFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file' && files) {
      handleImageUpload(files);
    } else {
      setProductForm({ ...productForm, [name]: value });
      if (name === 'imagem') setImagePreview(value);
    }
  }

  function handleImageUpload(files: FileList) {
    const newImages: string[] = [];
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        newImages.push(url);
      }
    });

    const updatedImages = [...selectedImages, ...newImages];
    setSelectedImages(updatedImages);

    // Usar a primeira imagem como imagem principal
    if (updatedImages.length > 0) {
      setProductForm({ ...productForm, imagem: updatedImages[0] });
      setImagePreview(updatedImages[0]);
    }
  }

  function removeImage(index: number) {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);

    // Atualizar imagem principal se necessário
    if (updatedImages.length > 0) {
      setProductForm({ ...productForm, imagem: updatedImages[0] });
      setImagePreview(updatedImages[0]);
    } else {
      setProductForm({ ...productForm, imagem: '' });
      setImagePreview(null);
    }
  }

  function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    // Validação simples
    if (!productForm.nome || !productForm.preco || !productForm.categoria) {
      setFormError('Preencha os campos obrigatórios: nome, preço e categoria.');
      return;
    }

    if (editingProduct) {
      // Editando produto existente
      const produtoAtualizado = {
        ...editingProduct,
        nome: productForm.nome,
        descricao: productForm.descricao,
        preco: parseFloat(productForm.preco),
        precoAntigo: productForm.precoAntigo ? parseFloat(productForm.precoAntigo) : undefined,
        categoria: productForm.categoria,
        imagens: productForm.imagem ? [productForm.imagem] : editingProduct.imagens || [],
        imagem: productForm.imagem || editingProduct.imagem || '',
        estoque: productForm.estoque ? parseInt(productForm.estoque) : undefined,
        status: productForm.status,
        updated_at: new Date().toISOString(),
      };

      setProductList(productList.map(p => p.id === editingProduct.id ? produtoAtualizado : p));
      setFormSuccess('Produto atualizado com sucesso!');
    } else {
      // Adicionando novo produto
      const novoProduto = {
        id: (Math.random() * 100000).toFixed(0),
        nome: productForm.nome,
        descricao: productForm.descricao,
        preco: parseFloat(productForm.preco),
        precoAntigo: productForm.precoAntigo ? parseFloat(productForm.precoAntigo) : undefined,
        categoria: productForm.categoria,
        imagens: productForm.imagem ? [productForm.imagem] : [],
        imagem: productForm.imagem || '',
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
  }

  return (
    <>
      {/* Dashboard Header - Responsivo */}
      <div className="mb-6 md:mb-8 px-4 md:px-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Bem-vindo ao painel de administração da Valentina</p>
      </div>

      {/* Stats Cards - Mobile Otimizado */}
      <div className="px-4 md:px-0 mb-6 md:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-3 md:ml-4 min-w-0 flex-1">
                <p className="text-xs md:text-sm font-medium text-gray-600 truncate">Total de Produtos</p>
                <p className="text-xl md:text-2xl font-semibold text-gray-900">{productList.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="ml-3 md:ml-4 min-w-0 flex-1">
                <p className="text-xs md:text-sm font-medium text-gray-600 truncate">Pedidos Hoje</p>
                <p className="text-xl md:text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 md:p-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-3 md:ml-4 min-w-0 flex-1">
                <p className="text-xs md:text-sm font-medium text-gray-600 truncate">Categorias</p>
                <p className="text-xl md:text-2xl font-semibold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas - Mobile Otimizado */}
      <div className="px-4 md:px-0 mb-6 md:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-4">Gerenciar Produtos</h3>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Adicione novos produtos ao seu catálogo</p>
            <button
              onClick={handleOpenProductModal}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 md:py-2 px-4 rounded-lg transition-colors text-sm md:text-base"
            >
              + Adicionar Produto
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-4">Pedidos Recentes</h3>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Acompanhe as vendas do dia</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 md:py-2 px-4 rounded-lg transition-colors text-sm md:text-base">
              Ver Pedidos
            </button>
          </div>
        </div>
      </div>

      {/* Seção de Produtos - Mobile Otimizado */}
      <div className="mx-4 md:mx-0 bg-white rounded-lg shadow">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Produtos Recentes</h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1">Últimos 10 produtos adicionados</p>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productList.slice(0, 10).map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                      {product.imagem ? (
                        <img src={product.imagem} alt={product.nome} className="h-8 w-8 object-cover rounded" />
                      ) : (
                        <span className="text-xs text-gray-500">Sem foto</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.categoria || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ {product.preco.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-blue-600 hover:text-blue-900 mr-3 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards - Otimizado */}
        <div className="md:hidden space-y-3 p-3">
          {productList.slice(0, 10).map((product) => (
            <div key={product.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-start space-x-3">
                <div className="h-14 w-14 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                  {product.imagem ? (
                    <img src={product.imagem} alt={product.nome} className="h-12 w-12 object-cover rounded" />
                  ) : (
                    <span className="text-xs text-gray-500 text-center leading-tight">Sem foto</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">{product.nome}</h3>
                  <p className="text-xs text-gray-500 mt-1">{product.categoria || 'Sem categoria'}</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">R$ {product.preco.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-3 pt-3 border-t border-gray-200">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-900 text-sm font-medium transition-colors py-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-900 text-sm font-medium transition-colors py-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Excluir</span>
                </button>
              </div>
            </div>
          ))}

          {/* Mensagem quando não há produtos */}
          {productList.length === 0 && (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-gray-500 text-sm">Nenhum produto encontrado</p>
              <button
                onClick={handleOpenProductModal}
                className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Adicionar primeiro produto
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de produto - Mobile Otimizado */}
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

                {/* Upload de arquivos */}
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

                {/* Preview das imagens selecionadas */}
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

                {/* Campo de URL alternativo */}
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium mb-1">Ou adicione por URL</label>
                  <div className="flex gap-2">
                    <input
                      name="imagem"
                      type="url"
                      value={productForm.imagem}
                      onChange={handleProductFormChange}
                      className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (productForm.imagem && !selectedImages.includes(productForm.imagem)) {
                          setSelectedImages([...selectedImages, productForm.imagem]);
                          setImagePreview(productForm.imagem);
                        }
                      }}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors"
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

      {/* Modal de Confirmação de Exclusão - Mobile Otimizado */}
      <Dialog open={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 py-4 relative">
          <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm mx-auto p-4 md:p-6 z-10">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-base md:text-lg font-medium text-gray-900 text-center mb-2">Confirmar Exclusão</h3>
            <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-3">
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
          </div>
        </div>
      </Dialog>
    </>
  );
}