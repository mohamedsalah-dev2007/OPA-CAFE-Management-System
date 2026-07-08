import React, { useState } from 'react';
import { Search, Coffee, IceCream, Cake, Trash2, Eye, EyeOff } from 'lucide-react';

function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // بيانات تجريبية للمنيو
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'إسبريسو دبل', price: '45 ج.م', category: 'hot', image: '☕', description: 'جرعتين من قهوة الإسبريسو المركزة والغنية', available: true },
    { id: 2, name: 'سبانش لاتيه ساخن', price: '65 ج.م', category: 'hot', image: '☕', description: 'إسبريسو مع حليب مكثف ومبخر برغوة خفيفة', available: true },
    { id: 3, name: 'كابتشينو', price: '55 ج.م', category: 'hot', image: '☕', description: 'إسبريسو مغطى بطبقة سميكة من رغوة الحليب', available: true },
    { id: 4, name: 'آيس كراميل ماكياتو', price: '75 ج.م', category: 'cold', image: '🥤', description: 'قهوة مثلجة ممزوجة بالفانيليا والكراميل اللذيذ', available: true },
    { id: 5, name: 'آيس سبانش لاتيه', price: '75 ج.م', category: 'cold', image: '🥤', description: 'النسخة المثلجة من السبانش لاتيه المميز', available: false },
    { id: 6, name: 'تشيز كيك سان سيباستيان', price: '90 ج.م', category: 'dessert', image: '🍰', description: 'كيكة الجبن المحروقة الشهيرة بنكهة غنية', available: true },
    { id: 7, name: 'مولتن كيك الشوكولاتة', price: '85 ج.م', category: 'dessert', image: '🍰', description: 'كيك شوكولاتة دافئ محشو بصلصة الشوكولاتة السائلة', available: true },
  ]);

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAvailability = (id) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const deleteItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  return (
    <div style={{ direction: 'rtl', color: '#fff', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', color: '#ff9f43', margin: 0 }}>إدارة قائمة المنيو</h2>
      </div>

      {/* شريط البحث وفلترة التصنيفات */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '30px', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* أزرار الفئات */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setActiveCategory('all')}
            style={{
              background: activeCategory === 'all' ? '#ff9f43' : '#1a1a1a',
              color: activeCategory === 'all' ? '#121212' : '#fff',
              border: '1px solid #2d2d2d',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            الكل
          </button>
          <button 
            onClick={() => setActiveCategory('hot')}
            style={{
              background: activeCategory === 'hot' ? '#ff9f43' : '#1a1a1a',
              color: activeCategory === 'hot' ? '#121212' : '#fff',
              border: '1px solid #2d2d2d',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Coffee size={16} /> مشروبات ساخنة
          </button>
          <button 
            onClick={() => setActiveCategory('cold')}
            style={{
              background: activeCategory === 'cold' ? '#ff9f43' : '#1a1a1a',
              color: activeCategory === 'cold' ? '#121212' : '#fff',
              border: '1px solid #2d2d2d',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <IceCream size={16} /> مشروبات باردة
          </button>
          <button 
            onClick={() => setActiveCategory('dessert')}
            style={{
              background: activeCategory === 'dessert' ? '#ff9f43' : '#1a1a1a',
              color: activeCategory === 'dessert' ? '#121212' : '#fff',
              border: '1px solid #2d2d2d',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Cake size={16} /> حلويات
          </button>
        </div>

        {/* خانة البحث */}
        <div style={{ position: 'relative', width: '300px' }}>
          <input 
            type="text" 
            placeholder="ابحث عن مشروب أو حلوى..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: '#1a1a1a',
              border: '1px solid #2d2d2d',
              borderRadius: '8px',
              padding: '10px 35px 10px 15px',
              color: '#fff',
              outline: 'none',
              textAlign: 'right'
            }}
          />
          <Search size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#b3b3b3' }} />
        </div>
      </div>

      {/* شبكة المنتجات */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {filteredItems.map(item => (
          <div key={item.id} style={{
            background: '#1a1a1a',
            borderRadius: '16px',
            border: '1px solid #2d2d2d',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            opacity: item.available ? 1 : 0.6,
            transition: 'opacity 0.3s'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '32px' }}>{item.image}</span>
                <span style={{ 
                  background: item.available ? '#2ecc7122' : '#e74c3c22', 
                  color: item.available ? '#2ecc71' : '#e74c3c',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {item.available ? 'متوفر' : 'غير متوفر'}
                </span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{item.name}</h3>
              <p style={{ color: '#b3b3b3', fontSize: '13px', lineHeight: '1.5', height: '40px', overflow: 'hidden', marginBottom: '16px' }}>
                {item.description}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #2d2d2d', paddingTop: '15px' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff9f43' }}>{item.price}</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => toggleAvailability(item.id)}
                  title={item.available ? "تعطيل التوفر" : "تفعيل التوفر"}
                  style={{
                    background: '#2d2d2d',
                    border: 'none',
                    borderRadius: '8px',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  {item.available ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button 
                  onClick={() => deleteItem(item.id)}
                  title="حذف المنتج"
                  style={{
                    background: '#e74c3c22',
                    border: 'none',
                    borderRadius: '8px',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#e74c3c',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;