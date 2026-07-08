import React, { useState } from 'react';

const Orders = ({ customers }) => {
  const [customerName, setCustomerName] = useState(''); // للاسم اليدوي
  const [selectedDrink, setSelectedDrink] = useState('');

  const drinks = ["نسكافيه", "شاي", "قهوة", "عصير", "مياه"];

  const handleOrder = () => {
    if (!customerName || !selectedDrink) {
      alert("يرجى كتابة اسم العميل واختيار المشروب");
      return;
    }
    console.log(`تم إضافة طلب: ${selectedDrink} للعميل: ${customerName}`);
  };

  return (
    <div>
      <h2>إضافة طلب جديد</h2>
      
      {/* حقل إدخال يدوي للعميل */}
      <input 
        type="text" 
        placeholder="اكتب اسم العميل هنا" 
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      
      {/* أو اختيار من القائمة (اختياري) */}
      <select onChange={(e) => e.target.value && setCustomerName(e.target.value)}>
        <option value="">-- أو اختر عميل موجود --</option>
        {customers.map((c) => (
          <option key={c.id} value={c.name}>{c.name}</option>
        ))}
      </select>

      {/* اختيار المشروب */}
      <select onChange={(e) => setSelectedDrink(e.target.value)}>
        <option value="">اختر المشروب</option>
        {drinks.map((drink, index) => (
          <option key={index} value={drink}>{drink}</option>
        ))}
      </select>

      <button onClick={handleOrder}>إضافة الطلب</button>
    </div>
  );
};

export default Orders;