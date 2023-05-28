import  React, { useState, useEffect, useRef } from 'react';
import TodoCreator from "./FormInput";
import TodoList from "./List";
import { createTheme } from "@material-ui/core/styles";


const theme = createTheme({
    palette: {
        primary: { main: '#000000' },
    },
});

const Form = () => {

    const [ newTodo, setNewTodo ] = useState('');
    const [ todos, setTodos ] = useState([
        {
            text: "Learn about LLMs",
            isCompleted: false,
            isEditing: false
        },
        {
            text: "Meet friend for lunch",
            isCompleted: false,
            isEditing: false
        },
        {
            text: "Buy groceries",
            isCompleted: false,
            isEditing: false
        }
    ]);
    const inputRef = useRef();
    const noteRef = useRef({});
    const [ isInputEmpty, setInputEmpty ] = useState(false)


    const handleSubmit = e => {
        e.preventDefault();
        addTodo(newTodo);
        clearInput();
        inputRef.current.focus();
    };

    const preventSubmit = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const addTodo = text => {
        if ( text !== '') {
            const newTodos = [...todos, { text }]
            setNewTodo('')
            setTodos(newTodos);
        } else {
            console.log('text', text)
            setInputEmpty(true);
        }
    };

    const removeTodo = index => {
        const newArr = [...todos]
        newArr.splice(index, 1)
        setTodos(newArr)
    }

    const completeTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
    };

    const editTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isEditing = !newTodos[index].isEditing;
        setTodos(newTodos);
    }

    const saveTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].isEditing = !newTodos[index].isEditing;
        newTodos[index].text = noteRef.current[index].value;
        setTodos(newTodos);
    }

    const clearInput = () => {
        setNewTodo('');
    }

    const setTodo = todo => {
        setInputEmpty(false);
        setNewTodo(todo);
    }

    useEffect(() => {

    }, [todos])

    return (
        <form onSubmit={handleSubmit} className="form" data-testid="form">

                <TodoCreator
                    theme={theme}
                    todo={newTodo}
                    setTodo={setTodo}
                    clearInput={clearInput}
                    inputRef={inputRef}
                    isInputEmpty={isInputEmpty}
                    preventSubmit={preventSubmit}
                />

                <TodoList
                    theme={theme}
                    todos={todos}
                    completeTodo={completeTodo}
                    editTodo={editTodo}
                    deleteTodo={removeTodo}
                    saveTodo={saveTodo}
                    noteRef={noteRef}
                    preventSubmit={preventSubmit}
                />
            </form>
    )
}

export default Form;