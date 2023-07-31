import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody=await request.json()
        const {email,password}=reqBody
        console.log(reqBody)

        const user=await User.findOne({email})
        if(!user){
            return NextResponse.json({error:'User not found'},{status:400})
        }

        const validpw=await bcryptjs.compare(password,user.password);

        if(!validpw){
            return NextResponse.json({error:'Incorrect Password'},{status:400})
        }

        const tokenData={
            id:user._id,
            username: user.username
        }

        const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET)
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
    
}