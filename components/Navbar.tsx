import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import {SiAnalogue} from 'react-icons/si'
import {MdKeyboardArrowDown} from 'react-icons/md'
import useAuthStore from '../store/authStore'
import { useState } from 'react';
import user from '../pages/api/user'
import { useRouter } from 'next/router'





const Navbar = () => {


   const {data: user, isLoading} = useQuery(['user'], () => axios.get('http://localhost:3000/api/user', {withCredentials: true}).then(res => res.data)) 

    const [dropdown, setDropDown] = useState(false)

    const router = useRouter()

    // console.log(user)

    // console.log('user',user)
      if (isLoading) {
    return <span>Loading...</span>
  }

  return (
    <div className='flex items-center justify-between p-6 border-b-2 border-gray-200'>
        <Link href='/'>
            <div className='flex items-center px-6 text-3xl cursor-pointer'>
                <SiAnalogue />
                <p className='p-2 texl-xl'>Ecom</p>
            </div>
        </Link>
        <div>
            <input type="text" placeholder='Search' className="p-2 px-5 w-80 rounded-xl" />
        </div>
        <div className='flex items-center justify-between px-6'>
            <div>
            {user?.name ? (
            <button 
                className='flex items-center gap-2 p-1 rounded-lg cursor-pointer hover:bg-light-gray' 
                onClick={() => setDropDown(prv => !prv)}
            >            
                <img 
                    className='w-8 h-8 rounded-full'
                    src={user.picture ? user.picture : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'}
                    alt="user" 
                />
                <p>
                    <span className='text-gray-400 text-14'>Hi, </span>
                    <span className='ml-1 font-bold text-gray-400 text-14'>{user?.name}</span>
                    <MdKeyboardArrowDown className='text-gray-400 text-14' />
                </p>   

        
              </button>
              ): (
                <div className='flex items-center gap-2 p-1'>
                    <Link href='/auth/register'>
                        <div className='p-2 text-lg font-bold underline cursor-pointer'>
                            Register
                        </div>
                    </Link>            
                    <Link href='/auth/login' >
                        <button className='p-2 m-2 font-semibold bg-blue-500 rounded-xl'>
                            Login
                        </button>
                    </Link>
                </div>
              )}
            <div className="relative dropdown">
                <ul className={`absolute right-0 left-auto z-50 ${dropdown ? 'block' : 'hidden'} float-left py-2 m-0 mt-1 text-base text-left list-none bg-white border-none rounded-lg shadow-lg dropdown-menu min-w-max bg-clip-padding`} aria-labelledby="dropdownMenuButton2">
                <li>
                    <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100" href="#">Action</a>
                </li>
                <li>
                    <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100" href="#">Another action</a>
                </li>
                <li>
                    <button 
                        className="block w-full px-4 py-2 font-bold text-red-500 border text-bold border-y-black dropdown-item whitespace-nowrap hover:bg-gray-100" 
                        onClick={async () => {
                            await axios.get('http://localhost:3000/api/auth/logout').then((response) => console.log(response))
                            router.reload()
                            // setTimeout( () => router.reload(), 2000)
                        }}
                    >
                        Logout
                    </button>
                </li>
                </ul>
            </div>   
            </div>
            
            <button className='pl-5'>
                <FaShoppingCart className='text-2xl' />
            </button>
        </div>
    </div>
  )
}

export default Navbar