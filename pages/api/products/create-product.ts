import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import cloudinary from "../../../utils/cloudinary";
import { getUser } from "../../../utils/getUser";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {img, title, content, price} = req.body

    const uploadImageRespoce = await cloudinary.uploader.upload(img, {
        upload_preset: 'next-ecom'
    })

    const imageUrl = uploadImageRespoce.url as string

    const priceInt= parseFloat(price)

    const currentUser = getUser(req) as any

    // console.log('currentuser',currentUser?.id)

    // const author = prisma.user.findUnique({where:{id: currentUser?.id}})

    try {
        
    const product = await prisma.product.create({data: {title, content, price:priceInt, image: imageUrl, authorId: currentUser.id}, include: {author: true}})
    res.json(product)
    } catch (error) {
     console.log(error)   
    }


}