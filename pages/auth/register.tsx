import React from 'react'
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { createOrGetUser } from '../../utils';
import useAuthStore from '../../store/authStore';
import toast from 'react-hot-toast';


type Inputs = {
    email: string,
    password: string,
    passwordConfirmation: string
}

const createUserSchema = object({
  password: string()
    .min(6, "Password too short - should be 6 chars minimum")
    .nonempty({
      message: "Password is required",
    }),
  passwordConfirmation: string().nonempty({
    message: "passwordConfirmation is required",
  }),
  email: string({
    required_error: "Email is required",
  })
    .email("Not a valid email")
    .nonempty({
      message: "Password is required",
    }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});


const Register = () => {

    const {addUser, removeUser} = useAuthStore()

    // removeUser()
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({
        resolver: zodResolver(createUserSchema)
    })

    const router = useRouter()


    const onSubmit: SubmitHandler<Inputs> = async value => {
        console.log(value)
        try {
            await axios.post(
                `http://localhost:3000/api/auth/register`,
                value,
                { withCredentials: true }
            ).then(res => {
                // console.log("res", res)
                const data = res.data 
                // console.log(data)
                if(data.message === 'success'){

                    router.push('/')
                    toast.success('succesfully created account')
                    
                }
            })
            .then(err => console.log('err',err));
          
            } catch (e) {

            console.log(e)
        }
    } 


    return (
    <div>

        <div className="w-full h-full bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                  <GoogleLogin 
                    onSuccess={async (response) => {
                        await createOrGetUser(response)
                        // router.reload()
                        router.push('/')

                        setTimeout(() => router.reload(), 2000)
                    }}
                    onError={() => console.log('err')}
                  
                  />
                </div>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create new account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder=''
                                    {...register('email', {required: true})}
                                />
                                {errors.email?.message}
                            </div>
                             <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    placeholder="••••••••" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    {...register('password', {required: true} )}
                                />
                                {errors.password?.message}
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="confirm-password" 
                                    placeholder="••••••••" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register('passwordConfirmation', {required: true})}
                                />
                                {errors.passwordConfirmation?.message}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                
                            </div>
                            <button type="submit" className=" text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Register</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Log in</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            </div>
    </div>
  )
}

export default Register