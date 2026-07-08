import React from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

function Dashboard() {
  const stats = [
    { id: 1, title: 'إجمالي المبيعات', value: '4,520 ج.م', icon: <DollarSign size={24} />, color: '#2ecc71' },
    { id: 2, title: 'طلبات اليوم', value: '42 طلب', icon: <ShoppingBag size={24} />, color: '#3498db' },
    { id: 3, title: 'الزبائن الجدد', value: '12 عميل', icon: <Users size={24} />, color: '#9b59b6' },
    { id: 4, title: 'معدل النمو', value: '+15%', icon: <TrendingUp size={24} />, color: '#e67e22' },
  ];

  const recentOrders = [
    { id: '#1024', customer: 'أحمد علي', items: '2 قهوة تركي + تشيز كيك', total: '140 ج.م', status: 'مكتمل' },
    { id: '#1023', customer: 'سارة ممدوح', items: '1 كابتشينو ميكس', total: '65 ج.م', status: 'قيد التنفيذ' },
    { id: '#1022', customer: 'محمود حسن', items: '3 عصير مانجو فريش', total: '180 ج.م', status: 'ملغي' },
  ];

  return (
    <div style={{ direction: 'rtl', color: '#fff', padding: '10px' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '24px', color: '#ff9f43' }}>لوحة التحكم العامة</h2>
      
      {/* كروت الإحصائيات */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {stats.map((stat) => (
          <div key={stat.id} style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #2d2d2d', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#b3b3b3', fontSize: '14px', marginBottom: '8px' }}>{stat.title}</p>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold' }}>{stat.value}</h3>
            </div>
            <div style={{ background: `${stat.color}22`, color: stat.color, padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center' }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* جدول آخر الطلبات */}
      <div style={{ background: '#1a1a1a', padding: '24px', borderRadius: '12px', border: '1px solid #2d2d2d' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '18px', color: '#ff9f43' }}>آخر الطلبات الحالية</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #2d2d2d', color: '#b3b3b3' }}>
              <th style={{ padding: '12px' }}>رقم الطلب</th>
              <th style={{ padding: '12px' }}>العميل</th>
              <th style={{ padding: '12px' }}>الطلبات</th>
              <th style={{ padding: '12px' }}>الإجمالي</th>
              <th style={{ padding: '12px' }}>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #2d2d2d' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{order.id}</td>
                <td style={{ padding: '12px' }}>{order.customer}</td>
                <td style={{ padding: '12px', color: '#b3b3b3' }}>{order.items}</td>
                <td style={{ padding: '12px', color: '#ff9f43' }}>{order.total}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '6px', 
                    fontSize: '12px',
                    background: order.status === 'مكتمل' ? '#2ecc7122' : order.status === 'قيد التنفيذ' ? '#3498db22' : '#e74c3c22',
                    color: order.status === 'مكتمل' ? '#2ecc71' : order.status === 'قيد التنفيذ' ? '#3498db' : '#e74c3c'
                  }}>
                    {order.status}
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

export default Dashboard;