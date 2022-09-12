import { decode } from "jsonwebtoken";
import { NextApiRequest } from "next";

export function getUser(req:NextApiRequest){
    const {cookies} = req

    const jwt = cookies.auth


   
    const payload = decode(jwt!)

    return payload
}