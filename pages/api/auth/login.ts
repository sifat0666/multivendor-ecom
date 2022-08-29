import argon2 from "argon2";
import { NextApiRequest, NextApiResponse } from "next";
import {sign} from 'jsonwebtoken'
import {serialize} from 'cookie'
import {omit} from 'lodash'
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   
    const secret: any = process.env.SECRET

    const {name, email, password} = req.body
    const user = await prisma.user.findUnique({where: {email: email}})

    if(!user) return res.json({err: 'user not found'})
    
    const hash = user?.password as string
    const isMatched = await argon2.verify(hash, password)

    if(!isMatched) return res.json({err: 'incorrect password'})
    
    const token = sign( omit(user, "password"), secret)

    const serialsed = serialize('auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60*60*24*30,
        path: '/'
    })


    res.setHeader('Set-Cookie', serialsed)

    res.status(200).json({message: 'success'})

}