import React, { useEffect, useState } from 'react'
import './Cart.css'
import product_img from '/assets/clear-dogfood.png'
import trash_img from '/assets/trash.png'
import cart_empty from '/assets/cart-empty.png'
import { Link, useNavigate } from 'react-router-dom'
import { cartApi } from '../../apis/cart.request'
import { productApi } from '../../apis/product.request'
import { message, Skeleton } from 'antd'

const Cart = () => {
  // const initialProducts = [
  //   { id: 1, name: 'Dry Food for Puppy', price: 500000, quantity: 1, img: product_img, category: 'food', selected: false },
  //   { id: 2, name: 'Scratching post', price: 120000, quantity: 1, img: product_img, category: 'essential', selected: false },
  //   { id: 3, name: 'Cat Litter', price: 250000, quantity: 1, img: product_img, category: 'essential', selected: false },
  //   { id: 4, name: 'Food and Water Bowls for Dog', price: 100000, img: product_img, quantity: 1, category: 'essential', selected: false },
  //   { id: 5, name: 'Dog Poop Bags', price: 130000, quantity: 1, img: product_img, category: 'essential', selected: false },
  //   { id: 6, name: 'Dry Food for Cat', price: 500000, quantity: 1, img: product_img, category: 'food', selected: false },
  //   { id: 7, name: 'Senior Dog Food', price: 450000, quantity: 1, img: product_img, category: 'food', selected: false },
  // ];
  //const [products, setProducts] = useState(initialProducts);
  const [products, setProducts] = useState([]);
  const [tmpProducts, setTmpProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        const response = await cartApi.getAllCart("");
        const cartItems = response?.data?.data?.cartItems || [];
        if (cartItems.length !== 0) {
          // Sử dụng map để tạo danh sách các Promise
          const productPromises = cartItems.map(async (item) => {
            const productResponse = await productApi.getProductById(item.productId);
            // console.log(productResponse);
            return productResponse.data.data;
          });

          // Chờ tất cả các Promise hoàn thành
          const productList = await Promise.all(productPromises);
          // console.log(productList);
          setTmpProducts(productList);
        }
        setIsLoading(false);
        setProducts(response.data.data.cartItems.map(item => ({
          ...item,
          selected: false // Thêm trường selected vào mỗi sản phẩm trong cartItems
        })));
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  const handleIncrease = async (id) => {
    const updatedProducts = products.map(product => {
      // Tìm sản phẩm cần thay đổi
      if (product._id === id) {
        const tmpProduct = tmpProducts.find(tmpProduct => tmpProduct._id === product.productId);
        // Kiểm tra số lượng sản phẩm hiện tại với số lượng trong kho
        if (tmpProduct && product.quantity < tmpProduct.quantity) {
          // Nếu số lượng hiện tại nhỏ hơn số lượng trong kho, tăng lên
          return {
            ...product,
            quantity: product.quantity + 1,
            subtotal: tmpProduct.price * (product.quantity + 1)
          };
        }
        // Nếu số lượng vượt quá kho, không thay đổi quantity
        return product;
      }
      return product;
    });

    const updatedProduct = updatedProducts.find(product => product._id === id);

    try {
      // Gửi yêu cầu cập nhật lại số lượng sản phẩm lên server
      await cartApi.updateCart({ id, quantity: updatedProduct.quantity });
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const handleDecrease = async (id) => {
    const updatedProducts = products.map(product => {
      // Tìm sản phẩm cần thay đổi
      if (product._id === id) {
        const tmpProduct = tmpProducts.find(tmpProduct => tmpProduct._id === product.productId);
        if (tmpProduct && product.quantity > 1) {
          return {
            ...product,
            quantity: product.quantity - 1,
            subtotal: tmpProduct.price * (product.quantity - 1)
          };
        }
        return product;
      }
      return product;
    });

    const updatedProduct = updatedProducts.find(product => product._id === id);

    if (updatedProduct.quantity >= 1) {
      try {
        await cartApi.updateCart({ id, quantity: updatedProduct.quantity });
        setProducts(updatedProducts);
      } catch (error) {
        console.error('Error updating cart quantity:', error);
      }
    }
  };

  const handleDeleteProduct = async (id, e) => {
    e.preventDefault();
    try {
      await cartApi.deleteCart(id);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setProducts(products.map(product => ({ ...product, selected: newSelectAll })));
  };

  const handleSelectProduct = (id) => {
    const updatedProducts = products.map(product =>
      product._id === id ? { ...product, selected: !product.selected } : product
    );
    setProducts(updatedProducts);

    // Kiểm tra xem tất cả các sản phẩm đã được chọn chưa
    const allSelected = updatedProducts.every(product => product.selected);
    setSelectAll(allSelected);
  };

  const totalSelectedPrice = products
    .filter(product => product.selected)
    .reduce((total, product) => total + product.subtotal, 0);

  const totalSelectedQuantity = products
    .filter(product => product.selected)
    .reduce((total, product) => total + product.quantity, 0);

  const shippingFee = 20000;
  const discount = 10000;
  const finalTotal = totalSelectedPrice > 0 ? (totalSelectedPrice /*+ shippingFee - discount*/).toLocaleString('vi-VN') : "0";

  const handleOrder = (e) => {
    e.preventDefault();
    // Lọc ra các sản phẩm đã được chọn
    const selectedProducts = products.filter(product => product.selected);

    if (selectedProducts.length === 0) {
      message.error('Vui lòng chọn sản phẩm trên giỏ hàng');
      return;
    }
    // Loại bỏ field selected
    // const sanitizedProducts = selectedProducts.map(({ selected, ...rest }) => rest);
    // const sanitizedProducts = selectedProducts.reduce((acc, product, index) => {
    //   acc[index + 1] = product; // Key bắt đầu từ 1
    //   return acc;
    // }, {});
    const sanitizedProducts = selectedProducts.map(product => ({ _id: product._id }));

    const cartItems = {
      cartItems: sanitizedProducts,
      totalAmount: totalSelectedPrice,
    }

    // Lưu tạm thời danh sách này vào localStorage
    localStorage.setItem('checkoutProducts', JSON.stringify(cartItems));

    navigate('/payment', window.scrollTo(0, 0));
  }

  return (
    <div className='cart-container'>

      <p className='title'>Giỏ hàng</p>
      {!isLoading && products.length == 0 ? (
        <div className="no-product">
          <img src={cart_empty} />
          <p>Chưa có sản phẩm nào trong giỏ hàng</p>
        </div>
      ) : (
        <>
          <div className="cart-left">
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
                {isLoading ? <>
                  <tr className='category-title'>
                    <th colSpan={3}>Thức ăn</th>
                  </tr>
                  <Skeleton style={{ width: '100%' }} active paragraph={{ rows: 1 }} />
                </> : products.filter(product => product.category === 'Thức ăn').length === 0 ? (
                  <></>
                ) : (
                  <>
                    <tr className="category-title">
                      <th colSpan={3}>Thức ăn</th>
                    </tr>
                    {products
                      .filter(product => product.category === 'Thức ăn')
                      .map(product => {
                        const tmpProduct = tmpProducts.find(tmpProduct => tmpProduct._id === product.productId);
                        return (
                          <tr key={product._id}>
                            <td>
                              <input
                                type="checkbox"
                                checked={product.selected}
                                onChange={() => handleSelectProduct(product._id)}
                              />
                              <img src={tmpProduct?.image.url} className="cart-product-img" alt="Product" />
                              <p className="cart-product-name">{tmpProduct?.name}</p>
                            </td>
                            <td>
                              <div className="cart-product-quantity">
                                <button onClick={() => handleDecrease(product._id)}>-</button>
                                <p>{product.quantity}</p>
                                <button onClick={() => handleIncrease(product._id)}>+</button>
                              </div>
                            </td>
                            <td>
                              <div className="cart-product-price">
                                <p>{product.subtotal.toLocaleString('vi-VN')} VND</p>
                                <button onClick={e => handleDeleteProduct(product._id, e)}>
                                  <img src={trash_img} alt="Delete" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </>
                )}

                {/* Danh mục sản phẩm thuộc essential */}
                {isLoading ? <>
                  <tr className='category-title'>
                    <th colSpan={3}>Vật dụng</th>
                  </tr>
                  <Skeleton style={{ width: '100%' }} active paragraph={{ rows: 1 }} />
                </> : products.filter(product => product.category === 'Vật dụng').length === 0 ? (
                  <></>
                ) : (
                  <>
                    <tr className="category-title">
                      <th colSpan={3}>Vật dụng</th>
                    </tr>
                    {products
                      .filter(product => product.category === 'Vật dụng')
                      .map(product => {
                        const tmpProduct = tmpProducts.find(tmpProduct => tmpProduct._id === product.productId);
                        return (
                          <tr key={product._id}>
                            <td>
                              <input
                                type="checkbox"
                                checked={product.selected}
                                onChange={() => handleSelectProduct(product._id)}
                              />
                              <img src={tmpProduct?.image.url} className="cart-product-img" alt="Product" />
                              <p className="cart-product-name">{tmpProduct?.name}</p>
                            </td>
                            <td>
                              <div className="cart-product-quantity">
                                <button onClick={() => handleDecrease(product._id)}>-</button>
                                <p>{product.quantity}</p>
                                <button onClick={() => handleIncrease(product._id)}>+</button>
                              </div>
                            </td>
                            <td>
                              <div className="cart-product-price">
                                <p>{product.subtotal.toLocaleString('vi-VN')} VND</p>
                                <button onClick={e => handleDeleteProduct(product._id, e)}>
                                  <img src={trash_img} alt="Delete" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="cart-right">
            <div className='cart-total-price'>
              <p className='title'>Đơn đặt hàng</p>
              <div className="order">
                <div className="order-left">
                  {/* <p>Tổng phụ</p>
              <p>Phí ship</p>
              <p>Giảm giá</p> */}
                  <p>Tổng</p>
                </div>
                <div className="order-right">
                  {/* <p>{totalSelectedPrice.toLocaleString('vi-VN')} VND</p>
              <p>{shippingFee.toLocaleString('vi-VN')} VND</p>
              <p>{discount.toLocaleString('vi-VN')} VND</p> */}
                  {/* <p>{(totalSelectedPrice + 20000 - 10000).toLocaleString('vi-VN')} VND</p> */}
                  <p>{finalTotal} VND</p>
                </div>
              </div>
              <div>
                <button onClick={(e) => handleOrder(e)} className='order-btn'>Thanh toán</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart