import React, { useState } from 'react'
import './Cart.css'
import product_img from '/assets/clear-dogfood.png'
import trash_img from '/assets/trash.png'
import { Link } from 'react-router-dom'

const Cart = () => {
  const initialProducts = [
    { id: 1, name: 'Dry Food for Puppy', price: 500000, quantity: 1, img: product_img, category: 'food', selected: false },
    { id: 2, name: 'Scratching post', price: 120000, quantity: 1, img: product_img, category: 'essential', selected: false },
    { id: 3, name: 'Cat Litter', price: 250000, quantity: 1, img: product_img, category: 'essential', selected: false },
    { id: 4, name: 'Food and Water Bowls for Dog', price: 100000, quantity: 1, category: 'essential', img: product_img, selected: false },
    { id: 5, name: 'Dog Poop Bags', price: 130000, quantity: 1, img: product_img, category: 'essential', selected: false },
    { id: 6, name: 'Dry Food for Cat', price: 500000, quantity: 1, img: product_img, category: 'food', selected: false },
    { id: 7, name: 'Senior Dog Food', price: 450000, quantity: 1, img: product_img, category: 'food', selected: false },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [selectAll, setSelectAll] = useState(false);

  const handleIncrease = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    ));
  };

  const handleDecrease = (id) => {
    setProducts(products.map(product =>
      product.id === id && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
    ));
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setProducts(products.map(product => ({ ...product, selected: newSelectAll })));
  };

  const handleSelectProduct = (id) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, selected: !product.selected } : product
    );
    setProducts(updatedProducts);

    // Kiểm tra xem tất cả các sản phẩm đã được chọn chưa
    const allSelected = updatedProducts.every(product => product.selected);
    setSelectAll(allSelected);
  };

  const totalSelectedPrice = products
    .filter(product => product.selected)
    .reduce((total, product) => total + product.price * product.quantity, 0);

  const totalSelectedQuantity = products
    .filter(product => product.selected)
    .reduce((total, product) => total + product.quantity, 0);

  const shippingFee = 20000;
  const discount = 10000;
  const finalTotal = totalSelectedPrice > 0 ? (totalSelectedPrice + shippingFee - discount).toLocaleString('vi-VN') : "0";

  return (
    <div className='cart-container'>
      <div className="cart-left">
        <p className='title'>Giỏ hàng</p>

        <table className='cart-list'>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                Chọn tất cả
              </th>
              <th colSpan={2}>{totalSelectedQuantity} sản phẩm đã chọn</th>
            </tr>
            <tr>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Tổng Giá</th>
            </tr>
          </thead>

          <tbody>

            {/* Danh mục sản phẩm thuộc food */}
            <tr className='category-title'>
              <th colSpan={3}>Thức ăn</th>
            </tr>
            {products.filter(product => product.category === 'food').map(product => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={product.selected}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                  <img src={product.img} className='cart-product-img' />
                  <p className='cart-product-name'>{product.name}</p>
                </td>
                <td>
                  <div className='cart-product-quantity'>
                    <button onClick={() => handleDecrease(product.id)}>-</button>
                    <p>{product.quantity}</p>
                    <button onClick={() => handleIncrease(product.id)}>+</button>
                  </div>
                </td>
                <td>
                  <div className='cart-product-price'>
                    <p>{(product.quantity * product.price).toLocaleString('vi-VN')} VND</p>
                    <button><img src={trash_img} /></button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Danh mục sản phẩm thuộc essential */}
            <tr  className='category-title'>
              <th colSpan={3}>Vật dụng</th>
            </tr>
            {products.filter(product => product.category === 'essential').map(product => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={product.selected}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                  <img src={product.img} className='cart-product-img' />
                  <p className='cart-product-name'>{product.name}</p>
                </td>
                <td>
                  <div className='cart-product-quantity'>
                    <button onClick={() => handleDecrease(product.id)}>-</button>
                    <p>{product.quantity}</p>
                    <button onClick={() => handleIncrease(product.id)}>+</button>
                  </div>
                </td>
                <td>
                  <div className='cart-product-price'>
                    <p>{(product.quantity * product.price).toLocaleString('vi-VN')} VND</p>
                    <button><img src={trash_img} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cart-right">
        <div className='cart-total-price'>
          <p className='title'>Đơn đặt hàng</p>
          <div className="order">
            <div className="order-left">
              <p>Tổng phụ</p>
              <p>Phí ship</p>
              <p>Giảm giá</p>
              <p>Tổng</p>
            </div>
            <div className="order-right">
              <p>{totalSelectedPrice.toLocaleString('vi-VN')} VND</p>
              <p>{shippingFee.toLocaleString('vi-VN')} VND</p>
              <p>{discount.toLocaleString('vi-VN')} VND</p>
              {/* <p>{(totalSelectedPrice + 20000 - 10000).toLocaleString('vi-VN')} VND</p> */}
              <p>{finalTotal} VND</p>
            </div>
          </div>
          <Link to="/payment">
            <button className='order-btn'>Thanh toán</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart