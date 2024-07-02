"use client"
import Link from 'next/link';
import React, { useState } from 'react'


export default function page() {
    const [otp, setOtp] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://v3.nagadhat.com/api/otp-verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: '01310881051', otp }),
            });

            const otpVerify = await response.json();
            console.log({ otpVerify });

        } catch (error) {
            console.error(error);
        }
    };
    const handleResendOtp = async () => {
        console.log('hello')
        try {
            const response = await fetch('https://v3.nagadhat.com/api/resend-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: '01310881051' }),
            });

            const resendOtp = await response.json();
            console.log({ resendOtp });

        } catch (error) {
            console.error(error);
        }
    }
    const HandleRemovCustomer = async () => {
        console.log('remov')
        try {
            const response = await fetch('https://v3.nagadhat.com/api/remove-temp-customer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: '01310881051' }),
            });

            const removCustomer = await response.json();
            console.log({ removCustomer });

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <section className="users-registration-otp-section">
            <div className="">
                <div className="">
                    <div className="">
                        <div classNameName="users-registration-otp">
                            <div className="users-registration-otp-title">
                                <h1>OTP Verify</h1>
                            </div>
                            <form onSubmit={handleSubmit} className="" role="form" action="" method="">
                                <div className='mb-4'>
                                    <label className="block" htmlFor="user-otp">OTP Code</label>
                                    <input
                                        type="text"
                                        className="form-control p-2 border rounded w-full"
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                        name="user-otp" />
                                </div>
                                <div>
                                    <button className="w-full bg-indigo-600 rounded text-white px-4 py-2" type="submit">Verify</button>
                                </div>
                            </form>
                            <div className="pt-4">
                                <p className="pb-2">
                                    * check your phone or email for OTP code.
                                </p>
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <Link className="users-registration-otp-back-btn bg-indigo-600 rounded text-white px-4 py-2" href="#">
                                            <i className="fa-solid fa-arrow-left-long"></i>
                                            <span>
                                                Back
                                            </span>
                                        </Link>
                                    </div>

                                    <div className="resend-otp-timar">
                                        <button onClick={handleResendOtp} className="add-to-cart-link border-0 bg-indigo-600 rounded text-white px-4 py-2" id="resend-otp-btn ">resend otp</button>
                                        <p id="resend-otp"></p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className='bg-indigo-600 rounded text-white px-4 py-2 w-full' onClick={HandleRemovCustomer}>
                                    Remov Customer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
