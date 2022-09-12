import axios from 'axios'
import { omit } from 'lodash'
import Router from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const ABC = () => {
  const {register, watch, handleSubmit, formState: {errors}} = useForm()



    const [file, setFile] = useState()


  const onSubmit = async (values: any) => {
    // console.log(values)
    // const image = console.log(values.img[0])
    const data = omit(values, 'img')
    // console.log(data) 

    const payload = {...data, img: file}

    const result = await axios.post('http://localhost:3000/api/products/create-product', payload)

    try {
       toast.success('Product created successfully')
      
    } catch (error) {
       console.log(error)
    }
  } 

  const handleChange = (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend =() => {
      setFile(reader.result as any)
    }

  }

  


  return (
    <div className='grid h-screen place-items-center '>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor="title">Title:</label>
        <input 
            className='border-2' 
            {...register('title')}
        />
        <span>{errors.title?.message as any}</span>


        <label htmlFor="content">Content:</label>
        <textarea 
            className='border-2' 
            {...register('content')}
        />
        <span>{errors.content?.message as any}</span>

        <label htmlFor="price">Price:</label>
        <input 
            type='number'
            className='border 2'
            {...register('price')} 
        />
        <span>{errors.price?.message as any}</span>

       <label htmlFor="image" className='mt-10'>Image:</label>
        <div className='flex gap-5 p-24'>


        <input type="file" {...register('img')} onChange={e => handleChange(e)}/> 
      <img src={file} className='w-40' />
        </div>
        <input 
          type="submit" 
          value="publish"
          className='p-3 text-white bg-blue-200 rounded-lg'
        />
      </form>


    </div>
  )
}

export default ABC