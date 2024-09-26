import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

export async function GET(request: Request) { 

    const {searchParams} = new URL(request.url)
    const take = Number(searchParams.get('take')?? '10')// si le colocas + donde esta number se combierte a number
    const skip = Number(searchParams.get('take')?? '0')    
    if(isNaN(take)) {
        return NextResponse.json({message: 'take tiene que ser un numero'}, {status:400})
    }
    if(isNaN(skip)) {
        return NextResponse.json({message: 'skip tiene que ser un numero'}, {status:400})
    }
    const todos = await prisma.todo.findMany({
        take: take,
        skip:skip
    })

    return NextResponse.json(todos)

}

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),
})

export async function POST(request: Request) { 

    try {
        
        const {complete, description} = await postSchema.validate( await request.json())
        const todo = await prisma.todo.create({data:{complete, description}})
        return NextResponse.json(todo)
    } catch (error) {
        return NextResponse.json(error,{status:400})
    }


}