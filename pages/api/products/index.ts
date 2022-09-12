import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';





export default async function handler (req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'GET'){
        const product = await prisma.product.findMany()

        res.json(product)
    }
}