import { getUserSessionServer } from '@/auth/actions/auth-actions'
import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

interface Segments {
    params:{
        id:string
    }
}
const getTodo = async (id:string):Promise<Todo | null> =>{
    const user = await getUserSessionServer()
    if(!user){
      return null
    }
    const todo = await prisma.todo.findFirst({where:{id}})

    if(todo?.userId !== user.id){
        return null
    }

    return todo
}




export async function GET(request: Request, { params}:Segments) { 

    const {id} = params
    const todo =  await getTodo(id)
    

    if(!todo) {
        return NextResponse.json({message: `todo no existe con id: ${id} `}, {status:401})
    }

    return NextResponse.json(todo)
}

const putSchema = yup.object({
    complete:yup.boolean().optional(),
    description: yup.string().optional(),
})


export async function PUT(request: Request, { params}:Segments) { 

    try {
        
        const {id} = params
        const todo = await  getTodo(id)
    
        if(!todo) {
            return NextResponse.json({message: `todo no existe con id: ${id} `}, {status:401})
        }
    
        const {complete, description, ...rest} = await putSchema.validate( await request.json())
    
        const updatedTodo = await prisma.todo.update({
            where: {id},
            data:{complete,description}
        })
    
        return NextResponse.json(updatedTodo)
    } catch ({message}:string | any) {

        return NextResponse.json(message,{status: 400})
    }



}
export async function DELETE(request: Request) { 

    try {
        
        await prisma.todo.deleteMany({where:{complete:true}})

        return NextResponse.json("Borrados")

    

    } catch ({message}:string | any) {

        return NextResponse.json(message,{status: 400})
    }



}

