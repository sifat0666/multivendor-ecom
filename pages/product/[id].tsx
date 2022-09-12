
import axios from 'axios';
import { BASE_URL } from '../../utils';
import Image from 'next/image';
import { useCartContext } from '../../context/CartContext';

interface IProps{
  productDetails: IProduct
}



export default function ProductPage({productDetails}: IProps) {
  
  // const { onAdd} = useCartContext()




  if (!productDetails) return <div>No product found</div>


  return (
    <div>
      <div className="flex justify-center gap-[100px] p-8 px-12 bg-white">
        <div>
          <img
            src={productDetails.image!} 
            height={400}
            width={400}
          />
        </div>
        <div className="p-4 flex flex-col w-[400px] h-[400px]">
          <p className='pt-10 pb-5 text-5xl font-semibold'>{productDetails.title}</p>
          <p className='py-5 text-2xl font-semibold text-gray-600'>Price: {productDetails.price}</p>

          <div className='flex gap-10 py-10'>
            <button className='p-6 py-3 font-bold text-white bg-gray-500 border-2 rounded-xl'>Buy Now</button>
            <button 
              className='p-6 py-3 font-bold text-white bg-blue-500 border-2 rounded-xl'
              // onClick={() => onAdd!(productDetails, 1)}
            >
              Add to Cart</button>
          </div>
        </div>
        
      </div>
      <div className='flex flex-col items-center justify-center text-xl font-semibold text-gray-600'>
        <p className='pb-2 underline'>Description</p>
        {productDetails.content}
      </div>
    </div>
  )
}


export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/products/${id}`);



  return {
    props: { productDetails: res.data },
  };
};
