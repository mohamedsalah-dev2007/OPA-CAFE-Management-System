import React, { useState } from 'react';
import { Search, Clock, Plus, CheckCircle, Flame, Coffee, X, User, ShoppingCart, PlusCircle, MinusCircle, AlertCircle } from 'lucide-react';

// Helper function to calculate total from items (fixes the bug!)
const calculateTotal = (items) => {
  return items.reduce((sum, item) => {
    const price = parseInt(item.price); // "45 ج.م" → 45
    return sum + (price * item.qty);
  }, 0);
};

function Orders() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationError, setValidationError] = useState('');

  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('صالة');
  const [tableNumber, setTableNumber] = useState('طاولة 1');
  const [formItems, setFormItems] = useState([
    { name: 'إسبريسو دبل', price: 45, qty: 0 },
    { name: 'سبانش لاتيه ساخن', price: 65, qty: 0 },
    { name: 'كابتشينو', price: 55, qty: 0 },
    { name: 'آيس كراميل ماكياتو', price: 75, qty: 0 },
    { name: 'تشيز كيك سان سيباستيان', price: 100, qty: 0 },
    { name: 'مولتن كيك الشوكولاتة', price: 85, qty: 0 }
  ]);

  const [orders, setOrders] = useState([
    {
      id: '#1025',
      customer: 'أحمد دياب',
      type: 'صالة',
      table: 'طاولة 5',
      time: 'منذ 5 دقائق',
      status: 'pending',
      items: [
        { name: 'إسبريسو دبل', qty: 2, price: '45 ج.م' },
        { name: 'تشيز كيك سان سيباستيان', qty: 1, price: '100 ج.م' }
      ]
    },
    {
      id: '#1024',
      customer: 'مريم صبري',
      type: 'تيك أواي',
      table: '-',
      time: 'منذ 12 دقيقة',
      status: 'preparing',
      items: [
        { name: 'آيس كراميل ماكياتو', qty: 1, price: '75 ج.م' }
      ]
    }
  ]);

  const advanceStatus = (orderId) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        let nextStatus = order.status;
        if (order.status === 'pending') nextStatus = 'preparing';
        else if (order.status === 'preparing') nextStatus = 'ready';
        else if (order.status === 'ready') nextStatus = 'completed';

        const updatedOrder = { ...order, status: nextStatus };
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(updatedOrder);
        }
        return updatedOrder;
      }
      return order;
    }));
  };

  const cancelOrder = (orderId) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        const updatedOrder = { ...order, status: 'cancelled' };
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(updatedOrder);
        }
        return updatedOrder;
      }
      return order;
    }));
  };

  const adjustFormItemQty = (index, delta) => {
    const updated = [...formItems];
    const newQty = updated[index].qty + delta;
    if (newQty >= 0) {
      updated[index].qty = newQty;
      setFormItems(updated);
    }
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!customerName.trim()) {
      setValidationError("برجاء إدخال اسم العميل أولاً");
      return;
    }

    const selectedProducts = formItems.filter(item => item.qty > 0);
    if (selectedProducts.length === 0) {
      setValidationError("برجاء اختيار صنف واحد على الأقل من المنيو");
      return;
    }

    const orderId = `#10${Math.floor(Math.random() * 900) + 100}`;

    const newOrder = {
      id: orderId,
      customer: customerName,
      type: orderType,
      table: orderType === 'صالة' ? tableNumber : '-',
      time: 'الآن',
      status: 'pending',
      items: selectedProducts.map(item => ({
        name: item.name,
        qty: item.qty,
        price: `${item.price} ج.م`
      }))
    };

    setOrders([newOrder, ...orders]);

    // Reset Form
    setCustomerName('');
    setOrderType('صالة');
    setTableNumber('طاولة 1');
    setFormItems(formItems.map(i => ({ ...i, qty: 0 })));
    setValidationError('');
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
    <div style={{ direction: 'rtl', color: '#fff', padding: '10px', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* Header section with Dynamic Add Order Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#ff9f43', margin: 0 }}>شاشة إدارة الطلبات الحية</h2>
          <p style={{ color: '#b3b3b3', margin: '5px 0 0 0', fontSize: '14px' }}>متابعة وإدخال طلبات الكاشير والصالة وتحديث حالاتها</p>
        </div>
        <button 
          onClick={() => {
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
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          <Plus size={18} /> تسجيل طلب جديد للعميل
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
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
              onClick={() => setActiveFilter(tab.id)}
              style={{
                background: activeFilter === tab.id ? '#ff9f43' : '#1a1a1a',
                color: activeFilter === tab.id ? '#121212' : '#fff',
                border: '1px solid #2d2d2d',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s'
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

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div style={{ display: 'flex', gap: '20px', flex: 1, minHeight: 0 }}>

        {/* Left Side: Orders List */}
        <div style={{ flex: selectedOrder ? '1.2' : '1', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '550px', paddingRight: '5px' }}>
          {filteredOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', background: '#1a1a1a', borderRadius: '12px', border: '1px solid #2d2d2d', color: '#b3b3b3' }}>
              <Coffee size={40} style={{ marginBottom: '10px', color: '#ff9f43', marginLeft: 'auto', marginRight: 'auto' }} />
              <p>لا توجد طلبات مسجلة حالياً.</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div 
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                style={{
                  background: '#1a1a1a',
                  borderRadius: '12px',
                  border: selectedOrder?.id === order.id ? '2px solid #ff9f43' : '1px solid #2d2d2d',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
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

        {/* Right Side: Selected Order Details */}
        {selectedOrder && (
          <div style={{ flex: '0.8', background: '#1a1a1a', borderRadius: '12px', border: '1px solid #2d2d2d', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxHeight: '550px', overflowY: 'auto' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2d2d2d', paddingBottom: '15px', marginBottom: '15px' }}>
                <h3 style={{ margin: 0, color: '#ff9f43', fontSize: '18px' }}>تفاصيل الفاتورة {selectedOrder.id}</h3>
                <button 
                  onClick={() => setSelectedOrder(null)}
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
        )}
      </div>

      {/* POPUP MODAL FOR ADDING CUSTOM ORDER */}
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
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#b3b3b3', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Custom Notification Alert Box inside Modal */}
            {validationError && (
              <div style={{
                background: '#e74c3c22',
                border: '1px solid #e74c3c',
                color: '#e74c3c',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertCircle size={18} />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleCreateOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Customer Name Input */}
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#b3b3b3' }}>اسم العميل *</label>
                <input 
                  type="text" 
                  placeholder="مثال: محمد صلاح"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
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

              {/* Order Type Select */}
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

              {/* Menu items Selector inside Modal */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: '#ff9f43', fontWeight: 'bold' }}>اختر الطلبات من المنيو:</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '180px', overflowY: 'auto', background: '#121212', padding: '10px', borderRadius: '8px' }}>
                  {formItems.map((item, index) => (
                    <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2d2d2d', paddingBottom: '6px' }}>
                      <div>
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name}</span>
                        <span style={{ fontSize: '12px', color: '#b3b3b3', marginRight: '8px' }}>({item.price} ج.م)</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button 
                          type="button" 
                          onClick={() => adjustFormItemQty(index, -1)}
                          style={{ background: 'none', border: 'none', color: '#ff9f43', cursor: 'pointer', padding: 0 }}
                        >
                          <MinusCircle size={20} />
                        </button>
                        <span style={{ fontSize: '16px', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                        <button 
                          type="button" 
                          onClick={() => adjustFormItemQty(index, 1)}
                          style={{ background: 'none', border: 'none', color: '#ff9f43', cursor: 'pointer', padding: 0 }}
                        >
                          <PlusCircle size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button 
                  type="submit"
                  style={{
                    flex: 1,
                    background: '#ff9f43',
                    color: '#121212',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  حفظ وتسجيل الطلب
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setValidationError('');
                    setIsModalOpen(false);
                  }}
                  style={{
                    flex: 0.5,
                    background: '#2d2d2d',
                    color: '#fff',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    padding: '12px',
                    cursor: 'pointer'
                  }}
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
  const deleteOrder = (orderId) => {
  playSystemSound('alert'); // صوت تنبيه عند الحذف
  setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
};
}

export default Orders;