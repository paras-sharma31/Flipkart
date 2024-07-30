'use client'
import { Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, ChevronDown, LogOut, User } from 'lucide-react';
import { useEffect } from 'react';
import { useUserContext } from '../utils/userContext';

export default function Navbar() {
    const deleteCookie = (name: string) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };
    const { isLoggedIn, setIsLoggedIn } = useUserContext()
    const router = useRouter()
    useEffect(() => {
        if (isLoggedIn) {
            setIsLoggedIn(true)
        }
    }, [])
    const handleLogout = () => {
        deleteCookie('user')
        localStorage.removeItem('user');
        router.push('/login')
        setIsLoggedIn(false)

    }
    const handleLogin = () => {
        router.push('/login')
        setIsLoggedIn(false)
    }
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setIsLoggedIn(true)
        }
    })
    return (
        <div className='border-b  border-gray-200 py-3 sticky top-0 z-10 bg-[#2874f0]'>
            <div className="container sm:flex justify-center gap-6 items-center">
                <div className=" font-bold text-4xl text-center pb-4 sm:pb-0 text-black flex" >
                    <Link href='/'>
                        <Image width={90} height={100} src="/Flipkart-plus.png" alt="banner-img" loading="eager" />
                        <p className='text-white text-xs italic flex items-center gap-1 '>Explore
                            <span className='text-xs text-[#FFE500] '>Plus</span>
                            <Image src="/plus.png" width={12} height={10} className='pb-1' />
                        </p>
                    </Link>
                </div>
                <div className=' sm:w-[300px] md:w-auto'>
                    <input className='border-gray-200 border p-2 px-5  w-[600px] text-md text-gray-500 shadow-lg outline-none'
                        type="text" placeholder='search for products brands and more'
                    />
                </div>
                {
                    isLoggedIn ? (
                        < Menu >
                            <MenuButton as={Button} className='bg-white flex text-[#2874f0] font-bold text-lg shadow-lg' style={{ padding: '4px 40px' }}>
                                My Account
                            </MenuButton>
                            <MenuList background='white' p='20px 55px'>
                                <MenuGroup>
                                    <MenuItem onClick={handleLogout} >
                                        <LogOut />
                                        Logout
                                    </MenuItem>
                                </MenuGroup>
                                <MenuDivider />

                            </MenuList>
                        </Menu>
                    ) : (
                        <Menu >
                            <MenuButton as={Button} className='bg-white flex text-[#2874f0] font-bold text-lg shadow-lg cursor-pointer' style={{ padding: '4px 40px' }}>
                                Login
                            </MenuButton>
                            <MenuList background='white' p='10px 10px'>
                                <MenuGroup textAlign='center'>
                                    <MenuItem onClick={handleLogin} className='text-black cursor-pointer' >New Customer</MenuItem>
                                    <span className='text-[#2874f0] flex'>
                                        <User /> Sign Up
                                    </span>
                                </MenuGroup>
                                <MenuDivider />

                            </MenuList>
                        </Menu>
                    )
                }
                <div>
                    <p className='text-white text-lg font-bold'>Become a Seller</p>
                </div>
                <div>
                    <p className='text-white text-lg font-bold flex items-center'>More <ChevronDown size='15px' /> </p>
                </div>
                <div className=' text-white'>
                    <Link href='/cart' className='flex items-center font-extrabold text-lg'>
                        <ShoppingCart fill='white' color='white' />
                        <span className='bg-red-600 text-white text-xs  p-[4px] rounded-xl absolute top-1 '>2</span>
                        Cart
                    </Link>
                </div>
            </div>
        </div >
    )
}