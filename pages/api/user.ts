import { NextApiRequest, NextApiResponse } from "next";
import {PrismaClient} from '@prisma/client'
import { verify } from "jsonwebtoken";
import { omit } from "lodash";

export const SECRET = process.env.SECRET!

export default async function(req:NextApiRequest, res:NextApiResponse){



    const {cookies} = req

    const jwt = cookies.auth

    if(!jwt) return res.json({message: 'no token'})

    try {
     const payload = verify(jwt, process.env.SECRET!)
     console.log(payload)
     res.json(payload)
    } catch (error) {
        res.json({error: 'invalid token'})
   }

}