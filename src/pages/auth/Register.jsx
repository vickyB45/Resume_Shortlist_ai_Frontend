import React from 'react'
import { useFormik } from 'formik'
import Button from '../../components/ui/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '../../api/api'
import toast from 'react-hot-toast'


const Register = () => {


    const  navigate = useNavigate()

const registerMutation = useMutation({
    mutationFn:(value) =>registerUser(value),
    onSuccess:(data)=>{
        toast.success(data.message)
        localStorage.setItem("token",data.token)
        navigate("/")
    },
     onError: (error) => {
      console.error("Login failed:", error);
      toast.error(error.response.data.message);
    },
})


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            registerMutation.mutate(values)
        },
        validate: (values) => {
            const errors = {}
            if (!values.name) errors.name = 'Name is required'
            if (!values.email) errors.email = 'Email is required'
            if (!values.password) errors.password = 'Password is required'
            return errors
        }
    })
    return (
        <div className='max-w-5xl mx-auto py-12 flex flex-col gap-4 px-4'>
            <h2 className='text-4xl hidden md:block tracking-tighter text-left'>Job Portal</h2>
            <div className='border-2 border-gray-100 flex flex-col md:flex-row justify-center  gap-8 w-full rounded-lg px-3 md:px-12 py-10'>

                {/* Left section */}
                <div className='flex flex-col space-y-3.5 w-full md:w-1/2 text-center md:text-left'>
                    <h2 className='text-4xl md:text-6xl font-[500] tracking-tight'>Welcome to the Job Portal</h2>
                    <p className='text-zinc-600 text-sm md:text-base'>Find your next Dream job in our portal</p>
                </div>

                {/* Right section */}
                <div className='w-full md:w-1/2 mt-6 md:mt-0'>
                    <div className='bg-white md:shadow-md rounded-md md:p-8 p-4 w-full sm:max-w-sm sm:mx-auto'>
                        <h2 className='text-3xl text-center mb-6'>Register</h2>
                        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <p className="text-red-500 text-start text-sm mt-1">{formik.errors.name}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-red-500 text-start text-sm mt-1">{formik.errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <p className="text-red-500 text-start text-sm mt-1">{formik.errors.password}</p>
                                )}
                            </div>
                            <button type='submit' className='w-full'>

                                <Button classname={'bg-black text-center border-1 text-white hover:bg-white hover:text-black hover:border-1'} text="Register" />
                            </button>
                            <p className="text-center md:text-left">
                                Don't have an Account?
                                <Link to="/login" className='hover:underline italic transition-all duration-150'> Login</Link>
                            </p>
                        </form>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Register