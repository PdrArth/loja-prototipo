'use client';

import React, { useState } from 'react';
import { categories as initialCategories } from '@/data/categories';
import { Dialog } from '@headlessui/react';

interface Category {
  id: string;
  nome: string;
  slug: string;
  descricao?: string;
  imagem?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export default function AdminCategoriesPage() {
  // Estados principais
  const [categoryList, setCategoryList] = useState<Category[]>(initialCategories);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Estados de modais
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  
  // Estados de formulário
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  
  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Estados de formulário de categoria
  const [categoryForm, setCategoryForm] = useState({
    nome: '',
    slug: '',
    descricao: '',
    imagem: '',
    status: 'ativo'
  });

  // Filtrar categorias
  const filteredCategories = categoryList.filter(category => {
    const matchesSearch = category.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || category.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Funções de categoria
  const handleOpenCategoryModal = () => {
    setEditingCategory(null);
    setCategoryForm({
      nome: '', slug: '', descricao: '', imagem: '', status: 'ativo'
    });
    setFormError(null);
    setFormSuccess(null);
    setShowCategoryModal(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({
      nome: category.nome,
      slug: category.slug,
      descricao: category.descricao || '',
      imagem: category.imagem || '',
      status: category.status || 'ativo'
    });
    setFormError(null);
    setFormSuccess(null);
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategoryToDelete(categoryId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      setCategoryList(categoryList.filter(c => c.id !== categoryToDelete));
      setSelectedCategories(selectedCategories.filter(id => id !== categoryToDelete));
      setShowDeleteConfirm(false);
      setCategoryToDelete(null);
    }
  };

  const handleCategoryFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategoryForm({ ...categoryForm, [name]: value });
    
    // Auto-gerar slug baseado no nome
    if (name === 'nome') {
      const slug = value.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setCategoryForm(prev => ({ ...prev, slug }));
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    
    if (!categoryForm.nome || !categoryForm.slug) {
      setFormError('Preencha os campos obrigatórios: nome e slug.');
      return;
    }

    // Verificar se slug já existe
    const slugExists = categoryList.some(c => 
      c.slug === categoryForm.slug && c.id !== editingCategory?.id
    );
    
    if (slugExists) {
      setFormError('Este slug já está em uso. Escolha outro.');
      return;
    }

    if (editingCategory) {
      const categoriaAtualizada = {
        ...editingCategory,
        nome: categoryForm.nome,
        slug: categoryForm.slug,
        descricao: categoryForm.descricao,
        imagem: categoryForm.imagem,
        status: categoryForm.status,
        updated_at: new Date().toISOString(),
      };
      
      setCategoryList(categoryList.map(c => c.id === editingCategory.id ? categoriaAtualizada : c));
      setFormSuccess('Categoria atualizada com sucesso!');
    } else {
      const novaCategoria = {
        id: (Math.random() * 100000).toFixed(0),
        nome: categoryForm.nome,
        slug: categoryForm.slug,
        descricao: categoryForm.descricao,
        imagem: categoryForm.imagem,
        status: categoryForm.status,
        created_at: new Date().toISOString(),
      };
      
      setCategoryList([novaCategoria, ...categoryList]);
      setFormSuccess('Categoria adicionada com sucesso!');
    }
    
    setTimeout(() => {
      setShowCategoryModal(false);
      setFormSuccess(null);
      setEditingCategory(null);
    }, 1200);
  };

  const handleBulkDelete = () => {
    setCategoryList(categoryList.filter(c => !selectedCategories.includes(c.id)));
    setSelectedCategories([]);
    setShowBulkActions(false);
  };

  const handleBulkStatusChange = (status: string) => {
    setCategoryList(categoryList.map(c => 
      selectedCategories.includes(c.id) ? { ...c, status } : c
    ));
    setSelectedCategories([]);
    setShowBulkActions(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Categorias</h1>
          <p className="text-gray-600 mt-1">Organize seus produtos em categorias</p>
        </div>
        <button
          onClick={handleOpenCategoryModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nova Categoria
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nome ou descrição..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {filteredCategories.length} categoria{filteredCategories.length !== 1 ? 's' : ''} encontrada{filteredCategories.length !== 1 ? 's' : ''}
            </span>
            {(searchTerm || statusFilter) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('');
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Limpar filtros
              </button>
            )}
          </div>
          
          {selectedCategories.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {selectedCategories.length} selecionada{selectedCategories.length !== 1 ? 's' : ''}
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

      {/* Lista de categorias */}
      {filteredCategories.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedCategories.length === filteredCategories.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories(filteredCategories.map(c => c.id));
                        } else {
                          setSelectedCategories([]);
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
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
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, category.id]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(id => id !== category.id));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center mr-4">
                          {category.imagem ? (
                            <img src={category.imagem} alt={category.nome} className="h-8 w-8 object-cover rounded" />
                          ) : (
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{category.nome}</div>
                          {category.descricao && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">{category.descricao}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">{category.slug}</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        category.status === 'ativo'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {category.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
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

          {/* Mobile Cards */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {filteredCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-start justify-between mb-3">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories([...selectedCategories, category.id]);
                      } else {
                        setSelectedCategories(selectedCategories.filter(id => id !== category.id));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                  />
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    category.status === 'ativo'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {category.status === 'ativo' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                    {category.imagem ? (
                      <img src={category.imagem} alt={category.nome} className="h-10 w-10 object-cover rounded" />
                    ) : (
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900">{category.nome}</h3>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">{category.slug}</code>
                    {category.descricao && (
                      <p className="text-xs text-gray-500 mt-2">{category.descricao}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-4 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-900 text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma categoria encontrada</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter
              ? 'Tente ajustar os filtros para encontrar categorias.'
              : 'Comece criando sua primeira categoria para organizar os produtos.'
            }
          </p>
          {!(searchTerm || statusFilter) && (
            <button
              onClick={handleOpenCategoryModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Criar Primeira Categoria
            </button>
          )}
        </div>
      )}

      {/* Modal de Categoria */}
      <Dialog open={showCategoryModal} onClose={() => setShowCategoryModal(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-2 md:px-4 py-4 relative">
          <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
          <Dialog.Panel className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-4 md:p-6 z-10">
            <Dialog.Title className="text-lg md:text-xl font-bold mb-4">
              {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
            </Dialog.Title>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome*</label>
                <input
                  name="nome"
                  value={categoryForm.nome}
                  onChange={handleCategoryFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="Nome da categoria"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Slug*</label>
                <input
                  name="slug"
                  value={categoryForm.slug}
                  onChange={handleCategoryFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  required
                  placeholder="slug-da-categoria"
                />
                <p className="text-xs text-gray-500 mt-1">URL amigável (gerada automaticamente)</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <textarea
                  name="descricao"
                  value={categoryForm.descricao}
                  onChange={handleCategoryFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Descrição da categoria (opcional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Imagem (URL)</label>
                <input
                  name="imagem"
                  type="url"
                  value={categoryForm.imagem}
                  onChange={handleCategoryFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={categoryForm.status}
                  onChange={handleCategoryFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
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

              <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="w-full md:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  {editingCategory ? 'Atualizar Categoria' : 'Criar Categoria'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="w-full md:flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

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
              Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.
            </p>
            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full md:flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteCategory}
                className="w-full md:flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
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
              {selectedCategories.length} categoria{selectedCategories.length !== 1 ? 's' : ''} selecionada{selectedCategories.length !== 1 ? 's' : ''}
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
                Excluir Selecionadas
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
    </div>
  );
}
