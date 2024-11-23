import React, { useState } from 'react'
import './Donation.css'
import donation_img from '/assets/dog-cat-smile.jpg'
// import donation_img from '/assets/donation-background.jpg'

const Donation = () => {
    const [amount, setAmount] = useState("");

    const handleAmountChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, ""); // Chỉ cho phép số
        value = new Intl.NumberFormat("vi-VN").format(value); // Định dạng vi-VN
        setAmount(value);
    };
    return (
        <div className='donation-container'>
            <div className="donation-left">
                <img src={donation_img} />
            </div>
            <div className="donation-right">
                <form className="donation-form">
                    <h2>💞 Quyên góp 💞</h2>
                    <p> Mỗi sự giúp đỡ của bạn sẽ giúp chúng tôi cứu thêm nhiều thú cưng cần trợ giúp. Cảm ơn bạn đã đồng hành!</p>

                    <div className="donation-amount">
                        <p>Số tiền quyên góp (VND):</p>
                        <input
                             type="text"
                             placeholder="Nhập số tiền"
                             value={amount}
                             onChange={handleAmountChange}
                        />
                    </div>

                    {/* <div className="donation-payment">
                        <label>Payment Method:</label>
                        <div>
                            <input type="radio" id="credit" name="payment" value="credit" />
                            <label htmlFor="credit">Credit Card</label>
                        </div>
                        <div>
                            <input type="radio" id="paypal" name="payment" value="paypal" />
                            <label htmlFor="paypal">PayPal</label>
                        </div>
                        <div>
                            <input type="radio" id="bank" name="payment" value="bank" />
                            <label htmlFor="bank">Bank Transfer</label>
                        </div>
                    </div> */}

                    <div className="donate-btn">
                        <button >Quyên góp</button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default Donation