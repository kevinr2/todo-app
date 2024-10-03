'use server'

import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"

const sleep = ( seconds:number =0,):Promise<boolean>=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(true)
        },seconds * 1000)
    })
}


export const toggleTodo = async(id:string, complete:boolean): Promise<Todo>=>{

    await sleep(3);
    const todo = await prisma.todo.findFirst({where:{id}})

    if(!todo){
        throw `Todo con id ${id} no encontrado`
    }
    const updatedTodo = await prisma.todo.update({
        where:{id},
        data: {complete:complete}
    })
    revalidatePath('/dashboard/server-action')
    return updatedTodo
}

export const addTodo = async(description:string,userId:string)=>{
    try {
    
        const todo = await prisma.todo.create({data:{description,userId:'...'}})
        revalidatePath('/dashboard/server-action')
       return todo
    } catch (error) {
        return {
            message:"error creando TODO"
        }
    }
}
export const deleteCompleted = async ():Promise<void> =>{
    await prisma.todo.deleteMany({where:{complete:true}})
    revalidatePath('/dashboard/server-action')
}