interface GoogleOauthReturnType{
    aud?: string
    azp?: string
    email?: string
    email_verified?: boolean
    exp?: number
    given_name?: strings
    iat?: number 
    iss?: string//accounts.google.com"
    jti?: string
    name?: string
    nbf?: number
    picture?: string
    sub?: string
}

interface IProduct{
    authorId?: string 
    content?: string
    id?: string
    image?: string
    price?: number
    published?: boolean
    title?: string
}