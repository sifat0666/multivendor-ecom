import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import {SiAnalogue} from 'react-icons/si'
import {MdKeyboardArrowDown} from 'react-icons/md'
import useAuthStore from '../store/authStore'





const Navbar = () => {


    
    const {userProfile, addUser, removeUser} : any = useAuthStore()

    // console.log(user)

    // console.log('user',user)

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
            {userProfile.name ? (
            <div className='flex items-center gap-2 p-1 rounded-lg cursor-pointer hover:bg-light-gray' onClick={() => {}}>            
                <img 
                    className='w-8 h-8 rounded-full'
                    src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' 
                    alt="user" 
                />
                <p>
                    <span className='text-gray-400 text-14'>Hi, </span>
                    <span className='ml-1 font-bold text-gray-400 text-14'>{userProfile?.name}</span>
                    <MdKeyboardArrowDown className='text-gray-400 text-14' />
                </p>              
              </div>
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
              </div>
            
            <button className='pl-5'>
                <FaShoppingCart className='text-2xl' />
            </button>
        </div>
    </div>
  )
}

export default Navbar