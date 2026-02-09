import { useEffect, useState } from "react";


interface Todo { 
    id:number;
    text:string;
    completed:boolean;
}


export default function Todolistapp() {

    const [ todos ,setTodos ] = useState<Todo[]>(() => {
        const savedTodo = localStorage.getItem('todos');
        return savedTodo ? JSON.parse(savedTodo) : [];
    });

    const [ input ,setInput ] = useState<string>('');

    useEffect(() => { 
        localStorage.setItem('todos' , JSON.stringify(todos))
    } , [todos]);

    function handleAdd(){
        if(!input.trim()){
            return;
        }

        const newTodo: Todo = {
            id:Date.now(),
            text:input.trim(),
            completed:false,

        }

        setTodos([...todos , newTodo]);

        setInput('');
    }


    function handleToggle(id:number){
        setTodos(
            todos.map(todo => todo.id === id ? {...todo , completed:!todo.completed} : todo )
        )
    };

    function handleDelete(id:number) {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    return (
        <>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">

            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8"> my todo list</h1>
            <div className="flex gap-2 mb-6">
            <input 
            type='text'
            value={input}
            placeholder="add a new todo"
            onChange={(e) => setInput(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && handleAdd()} 
             className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold transition-colors"> add </button>

            </div>


        <ul> 
            {todos.map(todo => (
                <li key={todo.id}
            className="flex  items-center p-3 border-b border-gray-300 last:border-0"
            >
                  <span 
        onClick={() => handleToggle(todo.id)}
        className={`cursor-pointer flex-1 ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}
            >
        {todo.text}
            </span>
            
            <button onClick={(e) => {
                 e.stopPropagation(); 
                handleDelete(todo.id);
            }}   className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full w-8 h-8 flex items-center justify-center transition-colors"> 
                X
            </button>
            
            
            </li>
            ))}
        </ul>

        </div>
        
        </div>
        
        </>
    )
}