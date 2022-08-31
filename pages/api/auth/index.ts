import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        const user = req.body

        // console.log(user)

        // const findUser = await prisma.user.findUnique({where: {email : user.email}})

        const upsertUser = await prisma.user.upsert({
            where: {
                email: user.email
            },
            update: {
                email: user.email
            },
            create: user
        })

        console.log(upsertUser)


    


    }
}