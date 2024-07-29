import { useRouter } from "next/navigation"
import { useState } from "react"

interface Password {
    newPassword: string,
    email: string,
}
const Page = () => {
    const router = useRouter()
    const [newPassword, setNewPassword] = useState<Password>({
        newPassword: '',
        email: ''
    })
    const UpdatePassword = async (newPassword: Password) => {
        const response = await fetch(`https://flipakartworking.onrender.com/api/password/update-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPassword)
        })
        const result = await response.json()
        return result;
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPassword({ ...newPassword, [name]: value })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = await UpdatePassword({
            email: newPassword.email,
            newPassword: newPassword.newPassword,
        })
        if (result) {
            router.push('/login')
        }
    }
    return (
        <div className='bg-[#f1f3f5] p-7'>
            <div className="container flex justify-center">
                <div className='bg-img bg-[#2874f0] w-[25%] h-[80vh] shadow-lg' style={{ padding: '40px 35px' }} >
                    <h2 className='font-bold text-white text-3xl text-left p-5'>Forgot Password ? <br /></h2>
                    <p className='text-white text-xl font-md p-3 '>Enter your email to get OTP number</p>
                </div>
                <div className='bg-[#fff] w-[40%] shadow-lg p-3'>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4 p-6'>
                        <label htmlFor="" className="text-gray-400 text-md ">Enter Your Resgister Email Address!</label>
                        <div>
                            <input
                                type="password"
                                placeholder='new password'
                                name='password'
                                value={newPassword.newPassword}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded'
                            />
                        </div>
                        <div>
                            <button type='submit' className='w-full bg-[#2874f0] shadow-lg text-white font-bold p-4 rounded'>
                                UPDATE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Page;