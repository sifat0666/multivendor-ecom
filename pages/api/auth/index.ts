import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import { omit } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export const secret = process.env.SECRET!

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


        const token = sign( omit(upsertUser, "password"), secret)

        const serialsed = serialize('auth', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 60*60*24*30,
            path: '/'
        })


        res.setHeader('Set-Cookie', serialsed)

        res.status(200).json({message: 'success'})

        // console.log(upsertUser)


    


    }
}