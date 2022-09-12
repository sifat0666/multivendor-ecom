import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
export default async function handler(req: NextApiRequest, res: NextApiResponse){

    if(req.method === 'GET') {
        const {id} = req.query as any

        const product = await prisma.product.findUnique({where: {id: id}})


        res.status(200).json(product)   

    }
}