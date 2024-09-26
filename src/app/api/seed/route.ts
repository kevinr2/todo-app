import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

   await prisma.todo.deleteMany();

   await prisma.todo.createMany({
    data:[
        {description:'piedra thor',complete:true},
        {description:'piedra del poder'},
        {description:'piedra del tiempo'},
        {description:'piedra del espacio'},
        {description:'piedra de la realidad'},
    ]
   })
    

    return NextResponse.json({ message: 'seed Executed'})
}