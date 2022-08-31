import axios from "axios";
import { decode } from "jsonwebtoken";

export const createOrGetUser = async (response: any ,addUser?: any) => {

    // console.log(response.credential)
  const decoded= decode(response.credential) ;
    // console.log("decoded", decoded)
  const {name, picture, sub, email} = decoded as any;

  const user=  {name, picture, id: sub, email, type: 'google-user'}


  
  addUser(user)




  await axios.post(`http://localhost:3000/api/auth`, user);
};