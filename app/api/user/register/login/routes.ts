import { NextResponse } from "next/server";
import {User} from "@/app/models/User"
import bcrypt from "bcrypt"

export async function POST(req){



    try {

        const body = await req.json();

        const {email, password} = body

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({
                messga: "No user with this email"
            },
            {
               status : 400,
            }
        )
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if(!matchPassword){
            return NextResponse.json({
                message: "Wrong Password",
            },

            {
                status: 400,
            }

        
        )
        }


        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{
            expiresIn : "5d"
        })


        return NextResponse.json({
            message: `Welcome back ${user.name}`,
            user ,
            token,
        })



    } catch (error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
      console.log(error);
      console.log("error during login");
    }
}