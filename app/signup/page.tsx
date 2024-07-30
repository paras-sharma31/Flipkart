'use client';
import React, { useState } from 'react';
import './signup.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export interface Form {
    firstName: string,
    lastName: string,
    email: string,
    phoneNo: string,
    password: string,
    confirmPassword: string,
}
const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};
export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState<Form>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const SignUp = async (formData: Form) => {
        try {
            const response = await fetch(`https://flipakartworking.onrender.com/api/auth/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error signing up:', error);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await SignUp({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            phoneNo: formData.phoneNo,
            confirmPassword: formData.confirmPassword,
        });
        console.log(result);
        if (result) {
            setCookie("user", JSON.stringify(result), 7)
            localStorage.setItem("user", JSON.stringify(result));
            router.push('/login')
            console.log('Signup successful');
        } else {
            console.log('Signup failed');
        }
    };

    return (
        <div className='bg-[#f1f3f5] p-7'>
            <div className="container flex justify-center">
                <div className='bg-img bg-[#2874f0] w-[25%] h-[80vh] shadow-lg' style={{ padding: '40px 35px' }} >
                    <h2 className='font-bold text-white text-3xl text-left p-5'>Looks like you are <br /> new here!</h2>
                    <p className='text-white text-xl font-md p-3 '>Sign up with your mobile number to get started</p>
                </div>
                <div className='bg-[#fff] w-[40%] shadow-lg p-3'>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4 p-6'>
                        <div>
                            <input
                                type='text'
                                placeholder='First Name'
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded'
                            />
                        </div>
                        <div>
                            <input
                                type='text'
                                placeholder='Last Name'
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded'
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder='Email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded'
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                placeholder='Phone Number'
                                name='phoneNo'
                                value={formData.phoneNo}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded'
                            />
                        </div>
                        <div>
                            <input
                                type='password'
                                placeholder='Password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded'
                            />
                        </div>
                        <div>
                            <input
                                type='password'
                                placeholder='Confirm Password'
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded'
                            />
                        </div>
                        <div>
                            <p className='text-sm text-gray-500 font-medium p-2'>By continuing, you agree to Flipkart <span className='text-[#2874f0]'>Terms of Use</span>
                                and
                                <span className='text-[#2874f0]'> Privacy Policy.</span>
                            </p>
                            <button type='submit' className='w-full bg-[#fb641b] shadow-lg text-white font-bold p-4 rounded'>
                                SIGN UP
                            </button>
                        </div>
                        <div>
                            <Link href='/login'>
                                <p className='text-[#2874f0] text-center text-md font-semibold tracking-wide p-4 shadow-lg'>
                                    Existing User? Log in
                                </p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
