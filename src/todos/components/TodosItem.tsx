'use client'
import { startTransition, useOptimistic } from 'react';
import { Todo } from "@prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
  todo: Todo;
  toggleTodo: (id:string, complete:boolean)=> Promise<Todo|void>
}

export const TodosItem = ({ todo,toggleTodo }: Props) => {

  const [ todoOptimistic, toggleTodoOptimistic ] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean ) => ({ ...state, complete: newCompleteValue })
  );


  const onToggleTodo = async() => {

    try {
      
      startTransition( () => toggleTodoOptimistic( !todoOptimistic.complete ) );
      
      await toggleTodo( todoOptimistic.id, !todoOptimistic.complete );


    } catch (error) {
      startTransition( () => toggleTodoOptimistic( !todoOptimistic.complete ) );
    }

  }    



  return (
    <div className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <div
        onClick={onToggleTodo}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 bg-blue-100 ${todoOptimistic.complete?'bg-blue-100':'bg-red-100'}`}
        >
          {todoOptimistic.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className="text-center sm:text-left">{todo.description}</div>
      </div>
    </div>
  );
};
