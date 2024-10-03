import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 


   await prisma.todo.deleteMany();
   await prisma.user.deleteMany();

   const user = await prisma.user.create({
    data:{
        email:'test1@google.com',
        password:bcrypt.hashSync('123456'),
        roles:["admin", "client","super-user"],
        todo:{
            create:[
                {description:'piedra thor',complete:true},
                {description:'piedra del poder'},
                {description:'piedra del tiempo'},
                {description:'piedra del espacio'},
                {description:'piedra de la realidad'},
            ]
        }
    }
   })

    return NextResponse.json({ message: 'seed Executed'})
}