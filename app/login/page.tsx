'use client'
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserContext } from "../utils/userContext";

export interface FormData {
    email: string,
    password: string,
}
const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

export default function Login() {
    const router = useRouter()
    const { isLoggedIn, setIsLoggedIn } = useUserContext()
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const userLogin = async (formData: FormData) => {
        const response = await fetch(`https://flipakartworking.onrender.com/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        const result = await response.json()

        return result;
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await userLogin({
            email: formData.email,
            password: formData.password,
        });
        if (result && result.token) {
            setCookie('user', JSON.stringify(result), 7); // Setting cookie for 7 days
            localStorage.setItem('user', JSON.stringify(result));
            setIsLoggedIn(true);

            router.push('/');
        } else {
            console.log('Login failed');
        }
    };
    const handleForgotPassword = () => {
        router.push('/emailVerify')
    }
    return (

        < div className='bg-[#f1f3f5] p-7' >
            <div className="container flex justify-center">
                <div className='bg-img bg-[#2874f0] w-[25%] h-[80vh] shadow-lg' style={{ padding: '40px 35px' }} >
                    <h2 className='font-bold text-white text-3xl text-left p-5'>Login <br /></h2>
                    <p className='text-white text-xl font-md p-3 '>Get access to your Orders, Wishlist and Recommendations</p>
                </div>
                <div className='bg-[#fff] w-[40%] shadow-lg p-3'>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4 p-6'>

                        <div>
                            <input
                                type="email"
                                placeholder='Email'
                                name='email'
                                value={formData?.email}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded'
                            />
                        </div>
                        <div>
                            <input
                                type='password'
                                placeholder='Password'
                                name='password'
                                value={formData?.password}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded'
                            />
                        </div>
                        <div>
                            <p className='text-sm text-gray-500 font-medium p-2'>By continuing, you agree to Flipkart
                                <span className='text-[#2874f0]'>Terms of Use</span>
                                and
                                <span className='text-[#2874f0]'> Privacy Policy.</span>
                            </p>
                            <button type='submit' className='w-full bg-[#fb641b] shadow-lg text-white font-bold p-4 rounded'>
                                LOGIN
                            </button>
                        </div>
                        <div className="flex items-center justify-center">
                            <button onClick={handleForgotPassword}>
                                <p className='text-[#2874f0] text-center text-md font-semibold tracking-wide p-4'>
                                    Forgot Password
                                </p>
                            </button>
                        </div>
                        <div>
                            <Link href='/signup'>
                                <p className='text-[#2874f0] text-center text-md font-semibold tracking-wide p-4 shadow-lg'>
                                    New to Flipkart? Create an account
                                </p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}