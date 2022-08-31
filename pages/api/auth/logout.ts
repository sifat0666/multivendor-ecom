import { serialize } from "cookie"
import { NextApiRequest, NextApiResponse } from "next"

export default async function(req:NextApiRequest, res:NextApiResponse){
    const { cookies }= req

    const jwt = cookies.auth

    if(!jwt){
        return res.send({message: 'not logged in'})
    }else{
        const serialsed = serialize('auth', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: -1,
        path: '/'
    })


    res.setHeader('Set-Cookie', serialsed)

    res.status(200).json({message: 'successfully logged out'})
    }


}