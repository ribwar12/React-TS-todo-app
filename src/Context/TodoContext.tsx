import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface Todo {
    id :number;
    text :string;
    completed :boolean;
}

interface TodoContextType {
    todos :Todo[];
    addTodo: (text: string ) => void;
    toggleTodo: ( id: number) => void;
    deleteTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({children}: { children: ReactNode}) {
   const [ todos ,setTodos ] = useState<Todo[]>(() => {
          const savedTodo = localStorage.getItem('todos');
          return savedTodo ? JSON.parse(savedTodo) : [];
      });

       useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  const addTodo = (text: string) => {
     const newTodo: Todo = { id: Date.now(), text, completed: false };
      setTodos([...todos, newTodo]);
      
  };

    const toggleTodo = (id: number) => {
      setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: number) => {
      setTodos(todos.filter(t => t.id !== id));
  };

return (
    <TodoContext.Provider value={{todos , addTodo , toggleTodo , deleteTodo}}>
        {children}
    </TodoContext.Provider>
)

}

export function useTodos() {
    const context = useContext(TodoContext);

    if(!context){
        throw new Error('useTodos must be used within a TodoProvider');
        
    }
    return context;
}