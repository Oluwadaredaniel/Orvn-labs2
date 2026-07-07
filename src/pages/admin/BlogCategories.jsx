import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Modal from '../../components/ui/Modal';

export default function BlogCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    loadCategories();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const loadCategories = async () => {
    try {
      setLoading(true);
      // We fetch distinct categories from blog_posts table for now
      // as there is no separate categories table yet.
      // In a more advanced system, we would have a 'categories' table.
      const { data, error } = await supabase
        .from('blog_posts')
        .select('category');

      if (error) throw error;
      const unique = [...new Set(data.map(p => p.category))].filter(Boolean);
      setCategories(unique.map((name, id) => ({ id, name })));
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    if (!newCategory.trim()) return;
    if (categories.some(c => c.name === newCategory.trim())) {
      showToast('Category already exists', 'error');
      return;
    }
    setCategories([...categories, { id: Date.now(), name: newCategory.trim() }]);
    setNewCategory('');
    showToast('Category added locally (save post to use)');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FB' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #E5E8F0', padding: '20px' }}>
        <div className="container-page" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => navigate('/admin/blog')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#5B3FD4', fontWeight: 600 }}
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>Manage Categories</h1>
        </div>
      </div>

      <div className="container-page" style={{ maxWidth: 600, paddingBlock: 40 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #E5E8F0', marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 12 }}>
            Add New Category
          </label>
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g. Technology"
              style={{ flex: 1, padding: '12px 14px', border: '1px solid #E5E8F0', borderRadius: 10, outline: 'none' }}
            />
            <button
              onClick={handleAdd}
              style={{ background: '#5B3FD4', color: '#fff', border: 'none', padding: '0 20px', borderRadius: 10, fontWeight: 600, cursor: 'pointer' }}
            >
              Add
            </button>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E8F0', overflow: 'hidden' }}>
          {categories.map((cat) => (
            <div key={cat.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ fontWeight: 600, color: '#0F172A' }}>{cat.name}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                   onClick={() => setCategories(categories.filter(c => c.id !== cat.id))}
                   style={{ background: '#FEE2E2', border: 'none', padding: 8, borderRadius: 6, color: '#DC2626', cursor: 'pointer' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {toast.show && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, padding: '12px 20px', background: '#0F172A', color: '#fff', borderRadius: 10, zIndex: 2000 }}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
