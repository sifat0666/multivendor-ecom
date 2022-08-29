import { NextApiRequest, NextApiResponse } from "next";
import argon2 from 'argon2'
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { omit } from "lodash";
import prisma from "../../../lib/prisma";

export default async function(req: NextApiRequest, res: NextApiResponse){
    const {name, email, password} = req.body
    const secret: any = process.env.SECRET
    // console.log(email)

    const user = await prisma.user.findUnique({where: {email : email}})

    if(user) return res.send('user alreadey exists')

    try {
      const hash = await argon2.hash(password)
      const newUser = await prisma.user.create({
        data: {
          email, password: hash, name
        }
      })

      const token = sign( omit(newUser, "password"), secret)

      const serialsed = serialize('auth', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 60*60*24*30,
          path: '/'
      })


      res.setHeader('Set-Cookie', serialsed)
      res.json({message: 'success'})
    } catch (error) {
      console.log(error)
    }
    
    
}