import React, { useState, useMemo, useEffect } from 'react';
import {
  Search, UserPlus, Award, Phone, Calendar, Star, X, AlertCircle,
  Coffee, IceCream, Cake, Trash2, Eye, EyeOff,
  Clock, Plus, CheckCircle, Flame, User, ShoppingCart, PlusCircle, MinusCircle,
  DollarSign, ShoppingBag, Users, TrendingUp, Sun, Moon, Bell, LayoutDashboard, Settings as SettingsIcon, LogOut,
  Percent, Printer, ShieldAlert, FileText, Check, Award as MedalIcon
} from 'lucide-react';

const calculateTotal = (items) => {
  if (!items || items.length === 0) return 0;
  return items.reduce((sum, item) => {
    const price = item.rawPrice || parseInt(item.price) || 0;
    return sum + (price * item.qty);
  }, 0);
};

const playSystemSound = (type) => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'cash_register') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.08);
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1);
      osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2);
      osc.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } else if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === 'alert') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    }
  } catch (e) {
    console.warn("المتصفح يمنع تشغيل الصوت قبل تفاعل المستخدم أولاً.", e);
  }
};

function Sidebar({ currentTab, setCurrentTab }) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  
  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: <LayoutDashboard size={20} /> },
    { id: 'orders', label: 'الطلبات الحية', icon: <ShoppingCart size={20} /> },
    { id: 'menu', label: 'المنيو والقائمة', icon: <Coffee size={20} /> },
    { id: 'customers', label: 'سجل العملاء', icon: <Users size={20} /> },
    { id: 'settings', label: 'إعدادات النظام', icon: <SettingsIcon size={20} /> },
  ];

  return (
    <div style={{
      width: '260px',
      background: '#1a1a1a',
      borderLeft: '1px solid #2d2d2d',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 16px',
      height: '100vh',
      boxSizing: 'border-box',
      position: 'sticky',
      top: 0
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '35px', padding: '0 8px' }}>
          <Coffee size={28} color="#ff9f43" />
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#ff9f43', margin: 0 }}>OPA CAFE</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#252525', padding: '12px', borderRadius: '12px', marginBottom: '30px' }}>
          <div style={{ background: '#ff9f43', color: '#121212', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            م
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '14px', color: '#fff' }}>محمد صلاح</h4>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#b3b3b3' }}>مدير النظام</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                playSystemSound('click');
                setCurrentTab(item.id);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                background: currentTab === item.id ? '#ff9f43' : 'transparent',
                color: currentTab === item.id ? '#121212' : '#b3b3b3',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '15px',
                fontWeight: 'bold',
                textAlign: 'right',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

     
      <button 
        onClick={handleLogout} 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
          background: 'transparent',
          color: '#e74c3c',
          border: '1px solid #e74c3c33',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        <LogOut size={18} />
        <span>تسجيل الخروج</span>
      </button>
    </div>
  );
}

function Navbar({ isDarkMode, toggleTheme }) {
  return (
    <div style={{
      height: '70px',
      background: '#1a1a1a',
      borderBottom: '1px solid #2d2d2d',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <h3 style={{ margin: 0, fontSize: '18px', color: '#fff' }}>أهلاً بك مجدداً في نظام كاشير OPA CAFE 👋</h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={() => {
            playSystemSound('click');
            toggleTheme();
          }}
          style={{
            background: '#2d2d2d',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ff9f43',
            cursor: 'pointer'
          }}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div style={{ position: 'relative' }}>
          <button style={{
            background: '#2d2d2d',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer'
          }}>
            <Bell size={20} />
          </button>
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            background: '#e74c3c',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 'bold',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            3
          </span>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ orders, customers }) {
  const totalSales = useMemo(() => {
    return orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => {
        const val = calculateTotal(o.items);
        return sum + (isNaN(val) ? 0 : val);
      }, 0);
  }, [orders]);

  const activeOrdersCount = useMemo(() => {
    return orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length;
  }, [orders]);

  const tableStatusMap = useMemo(() => {
    const map = {};
    for (let i = 1; i <= 10; i++) {
      map[`طاولة ${i}`] = 'available';
    }
    orders.forEach(order => {
      if (order.table !== '-' && order.status !== 'completed' && order.status !== 'cancelled') {
        if (order.status === 'pending' || order.status === 'preparing') {
          map[order.table] = 'preparing';
        } else if (order.status === 'ready') {
          map[order.table] = 'ready';
        }
      }
    });
    return map;
  }, [orders]);

  const stats = [
    { id: 1, title: 'إجمالي المبيعات (المكتملة)', value: `${totalSales} ج.م`, icon: <DollarSign size={24} />, color: '#2ecc71' },
    { id: 2, title: 'الطلبـات النشطة حاليـاً', value: `${activeOrdersCount} طلب`, icon: <ShoppingBag size={24} />, color: '#3498db' },
    { id: 3, title: 'الزبائـن المسجليـن', value: `${customers.length} عميل`, icon: <Users size={24} />, color: '#9b59b6' },
    { id: 4, title: 'معدل رضـا العملاء', value: '98%', icon: <MedalIcon size={24} />, color: '#e67e22' },
  ];

  return (
    <div style={{ color: '#fff', padding: '10px' }}>
      <h2 style={{ marginBottom: '8px', fontSize: '24px', color: '#ff9f43' }}>لوحة التحكم العامة</h2>
      <p style={{ color: '#b3b3b3', margin: '0 0 25px 0', fontSize: '14px' }}>متابعة فورية للمبيعات، إحصائيات حركة العملاء، وحالة إشغال الطاولات في الصالة</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '35px' }}>
        {stats.map((stat) => (
          <div key={stat.id} style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #2d2d2d', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#b3b3b3', fontSize: '13px', marginBottom: '8px' }}>{stat.title}</p>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold' }}>{stat.value}</h3>
            </div>
            <div style={{ background: `${stat.color}22`, color: stat.color, padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center' }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', marginBottom: '35px' }}>

        {/* Visual Map of the Hall Tables */}
        <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #2d2d2d' }}>
          <h3 style={{ fontSize: '16px', color: '#ff9f43', marginBottom: '15px' }}>خريطة الطاولات الحية بالصالة</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
            {Array.from({ length: 10 }).map((_, index) => {
              const tableName = `طاولة ${index + 1}`;
              const status = tableStatusMap[tableName] || 'available';
              let bg = '#2ecc7122';
              let border = '1px solid #2ecc71';
              let text = '#2ecc71';
              if (status === 'preparing') {
                bg = '#e67e2222';
                border = '1px solid #e67e22';
                text = '#e67e22';
              } else if (status === 'ready') {
                bg = '#3498db22';
                border = '1px solid #3498db';
                text = '#3498db';
              }
              return (
                <div 
                  key={index} 
                  style={{
                    background: bg,
                    border: border,
                    borderRadius: '8px',
                    padding: '12px 6px',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: text
                  }}
                >
                  <Coffee size={16} style={{ marginBottom: '6px', margin: '0 auto' }} />
                  <div>ط {index + 1}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '15px', justifyContent: 'center', fontSize: '11px', color: '#b3b3b3' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2ecc71' }}></span> فارغة</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e67e22' }}></span> قيد التحضير</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3498db' }}></span> جاهزة للتسليم</span>
          </div>
        </div>

        {/* Custom SVG Peak Hours Chart */}
        <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #2d2d2d', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '16px', color: '#ff9f43', marginBottom: '4px' }}>مؤشر ذروة الإيرادات اليومية</h3>
            <p style={{ margin: '0 0 15px 0', fontSize: '12px', color: '#b3b3b3' }}>تحليل مبيعات الصباح الباكر، الظهيرة، والمساء</p>
          </div>

          <div style={{ height: '120px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: '10px', paddingBottom: '10px' }}>
            {[
              { label: 'صباحاً', height: '40px', value: '450 ج' },
              { label: 'ظهراً', height: '85px', value: '1,200 ج' },
              { label: 'مساءً', height: '110px', value: '1,950 ج' },
              { label: 'ليلاً', height: '60px', value: '800 ج' }
            ].map((bar, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <span style={{ fontSize: '10px', color: '#ff9f43', marginBottom: '4px' }}>{bar.value}</span>
                <div style={{ 
                  width: '100%', 
                  maxHeight: bar.height, 
                  height: bar.height, 
                  background: 'linear-gradient(to top, #ff9f43, #ff7a00)', 
                  borderRadius: '6px 6px 0 0',
                  transition: 'height 0.3s ease'
                }} />
                <span style={{ fontSize: '11px', color: '#b3b3b3', marginTop: '6px' }}>{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div style={{ background: '#1a1a1a', padding: '24px', borderRadius: '12px', border: '1px solid #2d2d2d' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '18px', color: '#ff9f43' }}>مراقبة العمليات الحالية</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #2d2d2d', color: '#b3b3b3' }}>
              <th style={{ padding: '12px' }}>رقم الطلب</th>
              <th style={{ padding: '12px' }}>العميل</th>
              <th style={{ padding: '12px' }}>النوع</th>
              <th style={{ padding: '12px' }}>الإجمالي</th>
              <th style={{ padding: '12px' }}>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #2d2d2d' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{order.id}</td>
                <td style={{ padding: '12px' }}>{order.customer}</td>
                <td style={{ padding: '12px', color: '#b3b3b3' }}>{order.type} {order.table !== '-' && `(${order.table})`}</td>
                {/* ✅ FIXED: Use calculateTotal */}
                <td style={{ padding: '12px', color: '#ff9f43' }}>{calculateTotal(order.items)} ج.م</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '6px', 
                    fontSize: '12px',
                    background: order.status === 'completed' ? '#2ecc7122' : order.status === 'pending' ? '#f39c1222' : order.status === 'preparing' ? '#e67e2222' : order.status === 'ready' ? '#3498db22' : '#e74c3c22',
                    color: order.status === 'completed' ? '#2ecc71' : order.status === 'pending' ? '#f39c12' : order.status === 'preparing' ? '#e67e22' : order.status === 'ready' ? '#3498db' : '#e74c3c'
                  }}>
                    {order.status === 'completed' ? 'مكتمل' : order.status === 'pending' ? 'بانتظار التأكيد' : order.status === 'preparing' ? 'جاري التحضير' : order.status === 'ready' ? 'جاهز للتسليم' : 'ملغي'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Menu({ menuItems, toggleAvailability }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ color: '#fff', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#ff9f43', margin: 0 }}>إدارة قائمة المنيو</h2>
          <p style={{ color: '#b3b3b3', margin: '5px 0 0 0', fontSize: '14px' }}>التحكم بالمنتجات المعروضة وتعديل حالات توافرها فوراً في الصالة</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '30px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => { playSystemSound('click'); setActiveCategory('all'); }}
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
            onClick={() => { playSystemSound('click'); setActiveCategory('hot'); }}
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
            onClick={() => { playSystemSound('click'); setActiveCategory('cold'); }}
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
            onClick={() => { playSystemSound('click'); setActiveCategory('dessert'); }}
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
              textAlign: 'right',
              boxSizing: 'border-box'
            }}
          />
          <Search size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#b3b3b3' }} />
        </div>
      </div>

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
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff9f43' }}>{item.price} ج.م</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => {
                    playSystemSound('click');
                    toggleAvailability(item.id);
                  }}
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Orders({ orders, setOrders, menuItems, customers, settings, coupons }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationError, setValidationError] = useState('');

  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('صالة');
  const [tableNumber, setTableNumber] = useState('طاولة 1');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const [receiptToShow, setReceiptToShow] = useState(null);

  const availableMenuProducts = useMemo(() => {
    return menuItems.filter(item => item.available);
  }, [menuItems]);

  const [formQtys, setFormQtys] = useState({});

  const adjustQty = (name, delta) => {
    playSystemSound('click');
    setFormQtys(prev => {
      const current = prev[name] || 0;
      const next = current + delta;
      return { ...prev, [name]: next >= 0 ? next : 0 };
    });
  };

  const advanceStatus = (orderId) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        let nextStatus = order.status;
        if (order.status === 'pending') {
          nextStatus = 'preparing';
          playSystemSound('click');
        } else if (order.status === 'preparing') {
          nextStatus = 'ready';
          playSystemSound('click');
        } else if (order.status === 'ready') {
          nextStatus = 'completed';
          playSystemSound('success');
          setReceiptToShow(order);
        }

        const updated = { ...order, status: nextStatus };
        if (selectedOrder?.id === orderId) setSelectedOrder(updated);
        return updated;
      }
      return order;
    }));
  };

  const cancelOrder = (orderId) => {
    playSystemSound('alert');
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updated = { ...order, status: 'cancelled' };
        if (selectedOrder?.id === orderId) setSelectedOrder(updated);
        return updated;
      }
      return order;
    }));
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!customerName.trim()) {
      playSystemSound('alert');
      setValidationError("برجاء اختيار عميل أولاً من القائمة");
      return;
    }

    const itemsSelected = [];
    availableMenuProducts.forEach(prod => {
      const q = formQtys[prod.name] || 0;
      if (q > 0) {
        itemsSelected.push({
          name: prod.name,
          qty: q,
          price: `${prod.price} ج.م`,
          rawPrice: prod.price
        });
      }
    });

    if (itemsSelected.length === 0) {
      playSystemSound('alert');
      setValidationError("برجاء اختيار منتج واحد على الأقل لإرسال الطلب الكاشير");
      return;
    }

    const subtotal = itemsSelected.reduce((sum, item) => sum + (item.rawPrice * item.qty), 0);
    const taxAmount = subtotal * (settings.tax / 100);
    const serviceAmount = orderType === 'صالة' ? (subtotal * (settings.service / 100)) : 0;

    let discountAmount = 0;
    if (appliedCoupon.trim()) {
      const couponObj = coupons.find(c => c.code.toLowerCase() === appliedCoupon.trim().toLowerCase());
      if (couponObj) {
        discountAmount = subtotal * (couponObj.value / 100);
      }
    }

    const grandTotal = subtotal + taxAmount + serviceAmount - discountAmount;
    const orderId = `#10${Math.floor(Math.random() * 900) + 100}`;

    const newOrder = {
      id: orderId,
      customer: customerName,
      type: orderType,
      table: orderType === 'صالة' ? tableNumber : '-',
      time: 'الآن',
      total: `${Math.round(grandTotal)} ج.م`,
      status: 'pending',
      items: itemsSelected,
      subtotal: `${subtotal} ج.م`,
      tax: `${Math.round(taxAmount)} ج.م`,
      service: `${Math.round(serviceAmount)} ج.م`,
      discount: `${Math.round(discountAmount)} ج.م`
    };

    setOrders([newOrder, ...orders]);
    playSystemSound('cash_register');

    setCustomerName('');
    setOrderType('صالة');
    setTableNumber('طاولة 1');
    setAppliedCoupon('');
    setFormQtys({});
    setIsModalOpen(false);
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = activeFilter === 'all' || order.status === activeFilter;
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.id.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span style={{ background: '#f39c1222', color: '#f39c12', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>قيد الانتظار</span>;
      case 'preparing':
        return <span style={{ background: '#e67e2222', color: '#e67e22', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>جاري التحضير</span>;
      case 'ready':
        return <span style={{ background: '#2ecc7122', color: '#2ecc71', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>جاهز للتسليم</span>;
      case 'completed':
        return <span style={{ background: '#3498db22', color: '#3498db', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>مكتمل</span>;
      case 'cancelled':
        return <span style={{ background: '#e74c3c22', color: '#e74c3c', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>ملغي</span>;
      default:
        return null;
    }
  };

  return (
    <div style={{ color: '#fff', padding: '10px', display: 'flex', flexDirection: 'column' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#ff9f43', margin: 0 }}>شاشة إدارة الطلبات الحية</h2>
          <p style={{ color: '#b3b3b3', margin: '5px 0 0 0', fontSize: '14px' }}>تسجيل وإرسال فواتير الكافيه ومتابعة خطوات تحضيرها مع البار</p>
        </div>
        <button 
          onClick={() => {
            playSystemSound('click');
            setValidationError('');
            setIsModalOpen(true);
          }}
          style={{
            background: '#ff9f43',
            color: '#121212',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          <Plus size={18} /> تسجيل طلب جديد
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', marginBottom: '25px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'الكل' },
            { id: 'pending', label: 'قيد الانتظار' },
            { id: 'preparing', label: 'جاري التحضير' },
            { id: 'ready', label: 'جاهز للتسليم' },
            { id: 'completed', label: 'مكتمل' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                playSystemSound('click');
                setActiveFilter(tab.id);
              }}
              style={{
                background: activeFilter === tab.id ? '#ff9f43' : '#1a1a1a',
                color: activeFilter === tab.id ? '#121212' : '#fff',
                border: '1px solid #2d2d2d',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <input 
            type="text"
            placeholder="ابحث برقم الطلب أو العميل..."
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
              textAlign: 'right',
              boxSizing: 'border-box'
            }}
          />
          <Search size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#b3b3b3' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: selectedOrder ? '1.2' : '1', display: 'flex', flexDirection: 'column', gap: '15px', minWidth: '300px' }}>
          {filteredOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', background: '#1a1a1a', borderRadius: '12px', border: '1px solid #2d2d2d', color: '#b3b3b3' }}>
              <Coffee size={40} style={{ marginBottom: '10px', color: '#ff9f43', marginLeft: 'auto', marginRight: 'auto' }} />
              <p>لا توجد طلبات مسجلة ضمن هذا القسم.</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div 
                key={order.id}
                onClick={() => {
                  playSystemSound('click');
                  setSelectedOrder(order);
                }}
                style={{
                  background: '#1a1a1a',
                  borderRadius: '12px',
                  border: selectedOrder?.id === order.id ? '2px solid #ff9f43' : '1px solid #2d2d2d',
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ff9f43' }}>{order.id}</span>
                    <span style={{ background: '#2d2d2d', color: '#b3b3b3', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>{order.type}</span>
                    {order.table !== '-' && <span style={{ background: '#2d2d2d', color: '#b3b3b3', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>{order.table}</span>}
                  </div>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '16px' }}>{order.customer}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b3b3b3', fontSize: '12px' }}>
                    <Clock size={12} />
                    <span>{order.time}</span>
                    <span>•</span>
                    <span>{order.items.length} أصناف</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  {/* ✅ FIXED: Calculate total dynamically from items */}
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff9f43' }}>{calculateTotal(order.items)} ج.م</span>
                  {getStatusBadge(order.status)}
                </div>
              </div>
            ))
          )}
        </div>

        {selectedOrder && (
          <div style={{ flex: '0.8', background: '#1a1a1a', borderRadius: '12px', border: '1px solid #2d2d2d', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: '300px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2d2d2d', paddingBottom: '15px', marginBottom: '15px' }}>
                <h3 style={{ margin: 0, color: '#ff9f43', fontSize: '18px' }}>تفاصيل الفاتورة {selectedOrder.id}</h3>
                <button 
                  onClick={() => {
                    playSystemSound('click');
                    setSelectedOrder(null);
                  }}
                  style={{ background: 'none', border: 'none', color: '#b3b3b3', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ background: '#2d2d2d', padding: '10px', borderRadius: '50%' }}>
                  <User size={18} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 2px 0' }}>{selectedOrder.customer}</h4>
                  <p style={{ margin: 0, color: '#b3b3b3', fontSize: '12px' }}>{selectedOrder.type} {selectedOrder.table !== '-' ? `• ${selectedOrder.table}` : ''}</p>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <p style={{ color: '#ff9f43', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>الطلبات المطلوبة:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', background: '#2d2d2d22', padding: '10px', borderRadius: '8px' }}>
                      <span>{item.name} <span style={{ color: '#ff9f43', fontWeight: 'bold' }}>x{item.qty}</span></span>
                      <span>{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #2d2d2d', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>الحساب الإجمالي:</span>
                {/* ✅ FIXED: Calculate total dynamically from items */}
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff9f43' }}>{calculateTotal(selectedOrder.items)} ج.م</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => {
                  playSystemSound('click');
                  setReceiptToShow(selectedOrder);
                }}
                style={{
                  background: '#2d2d2d',
                  color: '#fff',
                  border: '1px solid #ff9f4355',
                  borderRadius: '8px',
                  padding: '10px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <FileText size={16} /> عرض الفاتورة الحرارية (طباعة)
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                {selectedOrder.status !== 'completed' && selectedOrder.status !== 'cancelled' && (
                  <button
                    onClick={() => advanceStatus(selectedOrder.id)}
                    style={{
                      flex: 1,
                      background: selectedOrder.status === 'pending' ? '#e67e22' : selectedOrder.status === 'preparing' ? '#2ecc71' : '#3498db',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    {selectedOrder.status === 'pending' && <><Flame size={16} /> بدء التحضير</>}
                    {selectedOrder.status === 'preparing' && <><Coffee size={16} /> جاهز للتسليم</>}
                    {selectedOrder.status === 'ready' && <><CheckCircle size={16} /> إكمال الطلب</>}
                  </button>
                )}

                {selectedOrder.status !== 'completed' && selectedOrder.status !== 'cancelled' && (
                  <button
                    onClick={() => cancelOrder(selectedOrder.id)}
                    style={{
                      background: '#e74c3c22',
                      color: '#e74c3c',
                      border: '1px solid #e74c3c',
                      borderRadius: '8px',
                      padding: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    إلغاء
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.85)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
          padding: '20px'
        }}>
          <div style={{
            background: '#1a1a1a',
            border: '2px solid #ff9f43',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '550px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2d2d2d', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, color: '#ff9f43', display: 'flex', alignItems: 'center', gap: '8px' }}><ShoppingCart size={20} /> تسجيل طلب جديد للعميل</h3>
              <button 
                onClick={() => {
                  playSystemSound('click');
                  setIsModalOpen(false);
                }} 
                style={{ background: 'none', border: 'none', color: '#b3b3b3', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {validationError && (
              <div style={{ background: '#e74c3c22', border: '1px solid #e74c3c', color: '#e74c3c', padding: '10px 14px', borderRadius: '8px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={18} />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleCreateOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#b3b3b3' }}>اختر العميل *</label>
                <input
                 list="customers-list"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="اكتب اسم العميل "
                      style={{
                   width: '100%',
                   background: '#2d2d2d',
                    border: '1px solid #444',
                   borderRadius: '8px',
                   padding: '10px',
                   color: '#fff',
                   outline: 'none',
                   textAlign: 'right'
                        }}
                       />
                     </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#b3b3b3' }}>نوع الطلب</label>
                  <select 
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#2d2d2d',
                      border: '1px solid #444',
                      borderRadius: '8px',
                      padding: '10px',
                      color: '#fff',
                      outline: 'none',
                      textAlign: 'right'
                    }}
                  >
                    <option value="صالة">صالة</option>
                    <option value="تيك أواي">تيك أواي</option>
                    <option value="دليفري">دليفري</option>
                  </select>
                </div>

                {orderType === 'صالة' && (
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#b3b3b3' }}>رقم الطاولة</label>
                    <select 
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      style={{
                        width: '100%',
                        background: '#2d2d2d',
                        border: '1px solid #444',
                        borderRadius: '8px',
                        padding: '10px',
                        color: '#fff',
                        outline: 'none',
                        textAlign: 'right'
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <option key={n} value={`طاولة ${n}`}>{`طاولة ${n}`}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: '#ff9f43', fontWeight: 'bold' }}>كوبون الخصم (اختياري)</label>
                <input 
                  type="text"
                  placeholder="مثال: OPA10"
                  value={appliedCoupon}
                  onChange={(e) => setAppliedCoupon(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#2d2d2d',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    padding: '10px',
                    color: '#fff',
                    outline: 'none',
                    textAlign: 'right',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: '#ff9f43', fontWeight: 'bold' }}>اختر المشروبات والأصناف المتوفرة:</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '180px', overflowY: 'auto', background: '#121212', padding: '10px', borderRadius: '8px' }}>
                  {availableMenuProducts.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2d2d2d', paddingBottom: '6px' }}>
                      <div>
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name}</span>
                        <span style={{ fontSize: '12px', color: '#b3b3b3', marginRight: '8px' }}>({item.price} ج.م)</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button type="button" onClick={() => adjustQty(item.name, -1)} style={{ background: 'none', border: 'none', color: '#ff9f43', cursor: 'pointer', padding: 0 }}>
                          <MinusCircle size={20} />
                        </button>
                        <span style={{ fontSize: '16px', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{formQtys[item.name] || 0}</span>
                        <button type="button" onClick={() => adjustQty(item.name, 1)} style={{ background: 'none', border: 'none', color: '#ff9f43', cursor: 'pointer', padding: 0 }}>
                          <PlusCircle size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button type="submit" style={{ flex: 1, background: '#ff9f43', color: '#121212', border: 'none', borderRadius: '8px', padding: '12px', fontWeight: 'bold', cursor: 'pointer' }}>حفظ الفاتورة والتشغيل</button>
                <button 
                  type="button" 
                  onClick={() => {
                    playSystemSound('click');
                    setIsModalOpen(false);
                  }} 
                  style={{ flex: 0.5, background: '#2d2d2d', color: '#fff', border: '1px solid #444', borderRadius: '8px', padding: '12px', cursor: 'pointer' }}
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 80mm Printable Thermal Receipt view */}
      {receiptToShow && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.85)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#fff',
            color: '#000',
            width: '320px',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            fontFamily: 'Courier New, Courier, monospace',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxSizing: 'border-box'
          }}>
            <div style={{ textAlign: 'center', borderBottom: '1px dashed #000', paddingBottom: '12px' }}>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: 'bold' }}>OPA CAFE</h2>
              <p style={{ margin: '0 0 2px 0', fontSize: '11px' }}>6 أكتوبر - الجيزة</p>
              <p style={{ margin: '0 0 2px 0', fontSize: '11px' }}>تليفون: 01023456789</p>
              <h4 style={{ margin: '8px 0 0 0', fontSize: '14px', border: '1px solid #000', padding: '3px', display: 'inline-block' }}>فاتورة حساب كاشير</h4>
            </div>

            <div style={{ fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>رقم الفاتورة: <span style={{ fontWeight: 'bold' }}>{receiptToShow.id}</span></div>
              <div>العميل: <span style={{ fontWeight: 'bold' }}>{receiptToShow.customer}</span></div>
              <div>التاريخ: {new Date().toISOString().split('T')[0]} - {new Date().toLocaleTimeString('ar-EG', {hour: '2-digit', minute:'2-digit'})}</div>
              <div>طريقة التقديم: {receiptToShow.type} {receiptToShow.table !== '-' ? `| ${receiptToShow.table}` : ''}</div>
              <div>الكاشير: محمد صلاح</div>
            </div>

            <div style={{ borderTop: '1px dashed #000', borderBottom: '1px dashed #000', padding: '8px 0' }}>
              <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', textAlign: 'right' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'right' }}>الصنف</th>
                    <th style={{ textAlign: 'center' }}>الكمية</th>
                    <th style={{ textAlign: 'left' }}>الإجمالي</th>
                  </tr>
                </thead>
                <tbody>
                  {receiptToShow.items.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: '3px 0' }}>{item.name}</td>
                      <td style={{ textAlign: 'center' }}>{item.qty}</td>
                      <td style={{ textAlign: 'left' }}>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '11px', textAlign: 'right', borderBottom: '1px dashed #000', paddingBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>المجموع الفرعي:</span>
                <span>{receiptToShow.subtotal || `${calculateTotal(receiptToShow.items)} ج.م`}</span>
              </div>
              {receiptToShow.tax && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>ضريبة القيمة المضافة ({settings.tax}%):</span>
                  <span>+{receiptToShow.tax}</span>
                </div>
              )}
              {receiptToShow.type === 'صالة' && receiptToShow.service && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>خدمة الصالة ({settings.service}%):</span>
                  <span>+{receiptToShow.service}</span>
                </div>
              )}
              {receiptToShow.discount && receiptToShow.discount !== '0 ج.م' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d32f2f' }}>
                  <span>الخصم المستحق:</span>
                  <span>-{receiptToShow.discount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold', borderTop: '1px solid #000', paddingTop: '4px', marginTop: '4px' }}>
                <span>الإجمالي الكلي:</span>
                {/* ✅ FIXED: Use calculateTotal */}
                <span>{calculateTotal(receiptToShow.items)} ج.م</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ fontSize: '8px', letterSpacing: '2px', fontWeight: 'bold' }}>||||||| | ||||| |||| | |||||</div>
              <span style={{ fontSize: '10px' }}>شكراً لزيارتكم أوبا كافيه 👋</span>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button 
                onClick={() => {
                  playSystemSound('success');
                  window.print();
                }}
                style={{
                  flex: 1.2,
                  background: '#ff9f43',
                  color: '#121212',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                طباعة الفاتورة 🚀
              </button>
              <button 
                onClick={() => {
                  playSystemSound('click');
                  setReceiptToShow(null);
                }}
                style={{
                  flex: 0.8,
                  background: '#e0e0e0',
                  color: '#333',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function Customers({ customers, setCustomers }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationError, setValidationError] = useState('');

  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');

  const handleAddCustomer = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!newCustName.trim() || !newCustPhone.trim()) {
      playSystemSound('alert');
      setValidationError('برجاء ملء جميع الحقول المطلوبة');
      return;
    }

    if (newCustPhone.length < 11) {
      playSystemSound('alert');
      setValidationError('برجاء إدخال رقم هاتف صحيح مكون من 11 رقم');
      return;
    }

    const newCust = {
      id: customers.length + 1,
      name: newCustName,
      phone: newCustPhone,
      visits: 1,
      points: 10,
      joinDate: new Date().toISOString().split('T')[0],
      tier: 'برونزي'
    };

    setCustomers([newCust, ...customers]);
    playSystemSound('success');
    setNewCustName('');
    setNewCustPhone('');
    setIsModalOpen(false);
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.phone.includes(searchQuery)
  );

  const getTierColor = (tier) => {
    switch (tier) {
      case 'اخضر': return '#06fa0e';
      case 'ذهبي': return '#f1c40f';
      case 'فضي': return '#bdc3c7';
      default: return '#cd7f32';
    }
  };

  return (
    <div style={{ color: '#fff', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#ff9f43', margin: 0 }}>سجل عملاء OPA CAFE</h2>
          <p style={{ color: '#06fa0e', margin: '5px 0 0 0', fontSize: '14px' }}>متابعة ولاء العملاء وعدد زياراتهم لتطبيق خصومات الفواتير</p>
        </div>
        <button 
          onClick={() => {
            playSystemSound('click');
            setValidationError('');
            setIsModalOpen(true);
          }}
          style={{
            background: '#ff9f43',
            color: '#121212',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          <UserPlus size={18} /> إضافة عميل جديد
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <input 
            type="text"
            placeholder="ابحث باسم العميل أو رقم الهاتف..."
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
              textAlign: 'right',
              boxSizing: 'border-box'
            }}
          />
          <Search size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#b3b3b3' }} />
        </div>

        <div style={{ background: '#1a1a1a', padding: '10px 20px', borderRadius: '8px', border: '1px solid #2d2d2d' }}>
          <span style={{ color: '#b3b3b3', fontSize: '12px' }}>إجمالي العملاء المسجلين</span>
          <h4 style={{ margin: '5px 0 0 0', fontSize: '18px', color: '#ff9f43' }}>{customers.length} عميل</h4>
        </div>
      </div>

      <div style={{ background: '#1a1a1a', borderRadius: '12px', border: '1px solid #2d2d2d', padding: '20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #2d2d2d', color: '#b3b3b3' }}>
              <th style={{ padding: '12px' }}>الاسم</th>
              <th style={{ padding: '12px' }}>رقم الهاتف</th>
              <th style={{ padding: '12px' }}>فئة العميل</th>
              <th style={{ padding: '12px' }}>عدد الزيارات</th>
              <th style={{ padding: '12px' }}>نقاط الولاء</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id} style={{ borderBottom: '1px solid #2d2d2d' }}>
                <td style={{ padding: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ background: '#2d2d2d', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {customer.name[0]}
                  </div>
                  {customer.name}
                </td>
                <td style={{ padding: '12px', color: '#b3b3b3' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={12} />
                    <span>{customer.phone}</span>
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: getTierColor(customer.tier), fontSize: '13px', fontWeight: 'bold' }}>
                    <Star size={12} fill={getTierColor(customer.tier)} /> {customer.tier}
                  </span>
                </td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{customer.visits} زيارة</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ background: '#ff9f4322', color: '#ff9f43', padding: '4px 10px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold' }}>
                    {customer.points} نقطة
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#1a1a1a',
            border: '2px solid #ff9f43',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '450px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2d2d2d', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, color: '#ff9f43', display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={20} /> إضافة عميل جديد</h3>
              <button 
                onClick={() => {
                  playSystemSound('click');
                  setIsModalOpen(false);
                }} 
                style={{ background: 'none', border: 'none', color: '#b3b3b3', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {validationError && (
              <div style={{ background: '#e74c3c22', border: '1px solid #e74c3c', color: '#e74c3c', padding: '10px', borderRadius: '8px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={16} />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleAddCustomer} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#b3b3b3' }}>اسم العميل رباعي *</label>
                <input 
                  type="text" 
                  placeholder="أحمد رأفت "
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#2d2d2d',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    padding: '10px',
                    color: '#fff',
                    outline: 'none',
                    textAlign: 'right',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#b3b3b3' }}>رقم الهاتف (الواتساب) *</label>
                <input 
                  type="text" 
                  placeholder="01012345678"
                  value={newCustPhone}
                  onChange={(e) => setNewCustPhone(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#2d2d2d',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    padding: '10px',
                    color: '#fff',
                    outline: 'none',
                    textAlign: 'right',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button type="submit" style={{ flex: 1, background: '#ff9f43', color: '#121212', border: 'none', borderRadius: '8px', padding: '12px', fontWeight: 'bold', cursor: 'pointer' }}>حفظ وإغلاق</button>
                <button 
                  type="button" 
                  onClick={() => {
                    playSystemSound('click');
                    setIsModalOpen(false);
                  }} 
                  style={{ flex: 0.5, background: '#2d2d2d', color: '#fff', border: '1px solid #444', borderRadius: '8px', padding: '12px', cursor: 'pointer' }}
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Settings({ settings, setSettings, coupons, setCoupons, cashiers, setCashiers }) {
  const [subTab, setSubTab] = useState('general');
  const [cashierName, setCashierName] = useState('');
  const [cashierRole, setCashierRole] = useState('كاشير');
  const [couponCode, setCouponCode] = useState('');
  const [couponValue, setCouponValue] = useState('');

  const handleAddCashier = (e) => {
    e.preventDefault();
    if (!cashierName.trim()) return;
    setCashiers([...cashiers, { id: Date.now(), name: cashierName, role: cashierRole }]);
    playSystemSound('success');
    setCashierName('');
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim() || !couponValue) return;
    setCoupons([...coupons, { id: Date.now(), code: couponCode.toUpperCase(), value: parseFloat(couponValue) }]);
    playSystemSound('success');
    setCouponCode('');
    setCouponValue('');
  };

  return (
    <div style={{ color: '#fff', padding: '10px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', color: '#ff9f43', margin: 0 }}>إعدادات النظام والكافيه</h2>
        <p style={{ color: '#b3b3b3', margin: '5px 0 0 0', fontSize: '14px' }}>تخصيص الحسابات والضرائب، وطابعات البون، وإدارة الكاشيرات النشطين</p>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '25px', borderBottom: '1px solid #2d2d2d', paddingBottom: '10px' }}>
        <button 
          onClick={() => { playSystemSound('click'); setSubTab('general'); }}
          style={{
            background: 'none',
            border: 'none',
            color: subTab === 'general' ? '#ff9f43' : '#b3b3b3',
            fontSize: '15px',
            fontWeight: 'bold',
            padding: '8px 12px',
            cursor: 'pointer',
            borderBottom: subTab === 'general' ? '3px solid #ff9f43' : 'none'
          }}
        >
          الحسابات والضرائب
        </button>
        <button 
          onClick={() => { playSystemSound('click'); setSubTab('cashiers'); }}
          style={{
            background: 'none',
            border: 'none',
            color: subTab === 'cashiers' ? '#ff9f43' : '#b3b3b3',
            fontSize: '15px',
            fontWeight: 'bold',
            padding: '8px 12px',
            cursor: 'pointer',
            borderBottom: subTab === 'cashiers' ? '3px solid #ff9f43' : 'none'
          }}
        >
          الموظفين والكاشير
        </button>
        <button 
          onClick={() => { playSystemSound('click'); setSubTab('coupons'); }}
          style={{
            background: 'none',
            border: 'none',
            color: subTab === 'coupons' ? '#ff9f43' : '#b3b3b3',
            fontSize: '15px',
            fontWeight: 'bold',
            padding: '8px 12px',
            cursor: 'pointer',
            borderBottom: subTab === 'coupons' ? '3px solid #ff9f43' : 'none'
          }}
        >
          كوبونات الخصم
        </button>
      </div>

      {subTab === 'general' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2d2d2d', padding: '20px', borderRadius: '12px' }}>
            <h4 style={{ color: '#ff9f43', margin: '0 0 20px 0', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Percent size={18} /> نسب الضرائب والخدمة</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#b3b3b3' }}>ضريبة القيمة المضافة (%) *</label>
                <input 
                  type="number" 
                  value={settings.tax}
                  onChange={(e) => setSettings({ ...settings, tax: parseFloat(e.target.value) || 0 })}
                  style={{ width: '100%', background: '#2d2d2d', border: '1px solid #444', borderRadius: '8px', padding: '10px', color: '#fff', textAlign: 'right' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#b3b3b3' }}>خدمة الصالة والخدمة الكهربية (%) *</label>
                <input 
                  type="number" 
                  value={settings.service}
                  onChange={(e) => setSettings({ ...settings, service: parseFloat(e.target.value) || 0 })}
                  style={{ width: '100%', background: '#2d2d2d', border: '1px solid #444', borderRadius: '8px', padding: '10px', color: '#fff', textAlign: 'right' }}
                />
              </div>
            </div>
          </div>

          <div style={{ background: '#1a1a1a', border: '1px solid #2d2d2d', padding: '20px', borderRadius: '12px' }}>
            <h4 style={{ color: '#ff9f43', margin: '0 0 20px 0', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Printer size={18} /> إعدادات طابعات الكاشير والبار</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#b3b3b3' }}>طابعة الفواتير الأساسية (كاشير)</label>
                <select style={{ width: '100%', background: '#2d2d2d', border: '1px solid #444', borderRadius: '8px', padding: '10px', color: '#fff', textAlign: 'right' }}>
                  <option value="XP-80">XP-80 Thermals (Default)</option>
                  <option value="PDF">حفظ كـ PDF إلكتروني</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#2a1a1a', border: '1px solid #e74c3c33', padding: '12px', borderRadius: '8px', color: '#e74c3c' }}>
                <ShieldAlert size={18} />
                <span style={{ fontSize: '12px' }}>تنبيه: تأكد من اتصال الطابعة بنفس شبكة الواي فاي للعمل الفوري.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === 'cashiers' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2d2d2d', padding: '20px', borderRadius: '12px' }}>
            <h4 style={{ color: '#ff9f43', margin: '0 0 20px 0', fontSize: '16px' }}>إضافة موظف / كاشير جديد</h4>
            <form onSubmit={handleAddCashier} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#b3b3b3' }}>الاسم بالكامل *</label>
                <input 
                  type="text" 
                  placeholder="مثال: يوسف الشريف"
                  value={cashierName}
                  onChange={(e) => setCashierName(e.target.value)}
                  style={{ width: '100%', background: '#2d2d2d', border: '1px solid #444', borderRadius: '8px', padding: '10px', color: '#fff', textAlign: 'right' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#b3b3b3' }}>الصلاحية والمهمة</label>
                <select 
                  value={cashierRole}
                  onChange={(e) => setCashierRole(e.target.value)}
                  style={{ width: '100%', background: '#2d2d2d', border: '1px solid #444', borderRadius: '8px', padding: '10px', color: '#fff', textAlign: 'right' }}
                >
                  <option value="كاشير صالة">كاشير صالة</option>
                  <option value="كاشير بار">كاشير بار</option>
                  <option value="مدير صالة">مدير صالة</option>
                </select>
              </div>

              <button type="submit" style={{ background: '#ff9f43', color: '#121212', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: 'bold', cursor: 'pointer' }}>حفظ الموظف</button>
            </form>
          </div>

          <div style={{ background: '#1a1a1a', border: '1px solid #2d2d2d', padding: '20px', borderRadius: '12px' }}>
            <h4 style={{ color: '#ff9f43', margin: '0 0 20px 0', fontSize: '16px' }}>قائمة الموظفين المسجلين</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cashiers.map(c => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#2d2d2d22', padding: '12px', borderRadius: '8px', border: '1px solid #2d2d2d' }}>
                  <span>{c.name}</span>
                  <span style={{ color: '#ff9f43', fontSize: '12px', fontWeight: 'bold', background: '#ff9f4311', padding: '2px 8px', borderRadius: '6px' }}>{c.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {subTab === 'coupons' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2d2d2d', padding: '20px', borderRadius: '12px' }}>
            <h4 style={{ color: '#ff9f43', margin: '0 0 20px 0', fontSize: '16px' }}>إضافة كوبون خصم جديد</h4>
            <form onSubmit={handleAddCoupon} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#b3b3b3' }}>كود الكوبون *</label>
                <input 
                  type="text" 
                  placeholder="مثال: COFFEE20"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{ width: '100%', background: '#2d2d2d', border: '1px solid #444', borderRadius: '8px', padding: '10px', color: '#fff', textAlign: 'right' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#b3b3b3' }}>قيمة الخصم (%) *</label>
                <input 
                  type="number" 
                  placeholder="مثال: 20"
                  value={couponValue}
                  onChange={(e) => setCouponValue(e.target.value)}
                  style={{ width: '100%', background: '#2d2d2d', border: '1px solid #444', borderRadius: '8px', padding: '10px', color: '#fff', textAlign: 'right' }}
                />
              </div>

              <button type="submit" style={{ background: '#ff9f43', color: '#121212', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: 'bold', cursor: 'pointer' }}>تفعيل الكوبون</button>
            </form>
          </div>

          <div style={{ background: '#1a1a1a', border: '1px solid #2d2d2d', padding: '20px', borderRadius: '12px' }}>
            <h4 style={{ color: '#ff9f43', margin: '0 0 20px 0', fontSize: '16px' }}>الكوبونات الفعالة حالياً</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {coupons.map(c => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#2d2d2d22', padding: '12px', borderRadius: '8px', border: '1px solid #2d2d2d' }}>
                  <span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>{c.code}</span>
                  <span style={{ color: '#b3b3b3', fontSize: '12px', fontWeight: 'bold' }}>خصم {c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('opa_cafe_isDarkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('opa_cafe_isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('opa_cafe_customers');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: 'أحمد رأفت', phone: '01012345678', visits: 24, points: 120, joinDate: '2026-01-10', tier: 'ذهبي' },
      { id: 2, name: 'سارة ممدوح', phone: '01298765432', visits: 15, points: 75, joinDate: '2026-02-15', tier: 'فضي' },
      { id: 3, name: 'محمود حسن', phone: '01155667788', visits: 8, points: 40, joinDate: '2026-03-01', tier: 'برونزي' },
      { id: 4, name: 'ياسمين علي', phone: '01500112233', visits: 32, points: 210, joinDate: '2025-11-20', tier: 'بلاتيني' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('opa_cafe_customers', JSON.stringify(customers));
  }, [customers]);

  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('opa_cafe_menuItems');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: 'إسبريسو دبل', price: 45, category: 'hot', image: '☕', description: 'جرعتين من قهوة الإسبريسو المركزة والغنية', available: true },
      { id: 2, name: 'سبانش لاتيه ساخن', price: 65, category: 'hot', image: '☕', description: 'إسبريسو مع حليب مكثف ومبخر برغوة خفيفة', available: true },
      { id: 3, name: 'كابتشينو', price: 55, category: 'hot', image: '☕', description: 'إسبريسو مغطى بطبقة سميكة من رغوة الحليب', available: true },
      { id: 4, name: 'آيس كراميل ماكياتو', price: 75, category: 'cold', image: '🥤', description: 'قهوة مثلجة ممزوجة بالفانيليا والكراميل اللذيذ', available: true },
      { id: 5, name: 'آيس سبانش لاتيه', price: 75, category: 'cold', image: '🥤', description: 'النسخة المثلجة من السبانش لاتيه المميز', available: false },
      { id: 6, name: 'تشيز كيك سان سيباستيان', price: 90, category: 'dessert', image: '🍰', description: 'كيكة الجبن المحروقة الشهيرة بنكهة غنية', available: true },
      { id: 7, name: 'مولتن كيك الشوكولاتة', price: 85, category: 'dessert', image: '🍰', description: 'كيك شوكولاتة دافئ محشو بصلصة الشوكولاتة السائلة', available: true },
    ];
  });

  useEffect(() => {
    localStorage.setItem('opa_cafe_menuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('opa_cafe_orders');
    if (saved) {
      const parsed = JSON.parse(saved);
      // FIX: Recalculate total for each order from items
      return parsed.map(order => ({
        ...order,
        total: `${calculateTotal(order.items)} ج.م`
      }));
    }
    return [
      {
        id: '#1025',
        customer: 'أحمد رأفت',
        type: 'صالة',
        table: 'طاولة 5',
        time: 'منذ 5 دقائق',
        status: 'pending',
        items: [
          { name: 'إسبريسو دبل', qty: 2, price: '45 ج.م', rawPrice: 45 },
          { name: 'تشيز كيك سان سيباستيان', qty: 1, price: '90 ج.م', rawPrice: 90 }
        ],
        subtotal: '180 ج.م',
        tax: '25 ج.م',
        service: '22 ج.م',
        discount: '0 ج.م'
      },
      {
        id: '#1024',
        customer: 'سارة ممدوح',
        type: 'تيك أواي',
        table: '-',
        time: 'منذ 12 دقيقة',
        status: 'preparing',
        items: [
          { name: 'آيس كراميل ماكياتو', qty: 1, price: '75 ج.م', rawPrice: 75 }
        ],
        subtotal: '75 ج.م',
        tax: '11 ج.م',
        service: '0 ج.م',
        discount: '0 ج.م'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('opa_cafe_orders', JSON.stringify(orders));
  }, [orders]);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('opa_cafe_settings');
    if (saved) return JSON.parse(saved);
    return { tax: 14, service: 12, currency: 'ج.م' };
  });

  useEffect(() => {
    localStorage.setItem('opa_cafe_settings', JSON.stringify(settings));
  }, [settings]);

  const [coupons, setCoupons] = useState(() => {
    const saved = localStorage.getItem('opa_cafe_coupons');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, code: 'OPA10', value: 10 },
      { id: 2, code: 'COFFEE20', value: 20 }
    ];
  });

  
  useEffect(() => {
    localStorage.setItem('opa_cafe_coupons', JSON.stringify(coupons));
  }, [coupons]);

 
  const [cashiers, setCashiers] = useState(() => {
    const saved = localStorage.getItem('opa_cafe_cashiers');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: 'محمد صلاح', role: 'مدير النظام' },
      { id: 2, name: 'أحمد رأفت', role: 'كاشير صالة' }
    ];
  });

  // مزامنة الكاشيرات المسجلة
  useEffect(() => {
    localStorage.setItem('opa_cafe_cashiers', JSON.stringify(cashiers));
  }, [cashiers]);

  const toggleAvailability = (id) => {
    setMenuItems(prev => prev.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard orders={orders} customers={customers} />;
      case 'orders':
        return (
          <Orders 
            orders={orders} 
            setOrders={setOrders} 
            menuItems={menuItems} 
            customers={customers} 
            settings={settings}
            coupons={coupons}
          />
        );
      case 'menu':
        return <Menu menuItems={menuItems} toggleAvailability={toggleAvailability} />;
      case 'customers':
        return <Customers customers={customers} setCustomers={setCustomers} />;
      case 'settings':
        return (
          <Settings 
            settings={settings} 
            setSettings={setSettings} 
            coupons={coupons} 
            setCoupons={setCoupons}
            cashiers={cashiers}
            setCashiers={setCashiers}
          />
        );
      default:
        return <Dashboard orders={orders} customers={customers} />;
    }
  };

  return (
    <div style={{
      display: 'flex',
      direction: 'rtl',
      background: isDarkMode ? '#121212' : '#f5f6fa',
      color: isDarkMode ? '#fff' : '#1a202c',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        <main style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 70px)',
          boxSizing: 'border-box'
        }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );

}