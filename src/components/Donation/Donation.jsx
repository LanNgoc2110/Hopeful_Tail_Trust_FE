import React, { useState } from 'react'
import './Donation.css'
import donation_img from '/assets/dog-cat-smile.jpg'
import { message } from 'antd';
import { fundApi } from '../../apis/fund.request';
import { LoadingOutlined } from '@ant-design/icons';
// import donation_img from '/assets/donation-background.jpg'

const Donation = () => {
    const [isDonationLoading, setIsDonationLoading] = useState(false);
    const [amount, setAmount] = useState("");

    const handleSubmit = async () => {
        setIsDonationLoading(true);
        try {
            const data = {
                amount: Number(amount)
            }
            if (amount == 0) {
                message.error("Vui lòng nhập số tiền bạn muốn quyên góp");
                setIsDonationLoading(false);
                return;
            }
            const response = await fundApi.addFund(data);
            setIsDonationLoading(false);
            window.location.href = response.data.checkoutUrl;
        } catch (error) {
            console.log(error);
            setIsDonationLoading(false);
        }

    };

    return (
        <div className='donation-container'>
            <div className="donation-left">
                <img src={donation_img} />
            </div>
            <div className="donation-right">
                <div className="donation-form" >
                    <h2>💞 Quyên góp 💞</h2>
                    <p> Mỗi sự giúp đỡ của bạn sẽ giúp chúng tôi cứu thêm nhiều thú cưng cần trợ giúp. Cảm ơn bạn đã đồng hành!</p>

                    <div className="donation-amount">
                        <p>Số tiền quyên góp (VND):</p>
                        <input
                            type="text"
                            placeholder="Nhập số tiền"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
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
                        <button disabled={isDonationLoading} onClick={() => handleSubmit()}> {isDonationLoading && <LoadingOutlined style={{ marginRight: 5 }} />} Quyên góp</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Donation