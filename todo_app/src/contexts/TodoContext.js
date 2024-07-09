import React, { createContext, useContext, useReducer } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const TodoContext = createContext();

const initialState = JSON.parse(localStorage.getItem('todos')) || [];

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TODOS':
            return action.payload;
        case 'ADD_TODO':
            return [...state, action.payload];
        case 'REMOVE_TODO':
            return state.filter(todo => todo.id !== action.payload);
        case 'UPDATE_TODO':
            return state.map(todo => todo.id === action.payload.id ? action.payload : todo);
        default:
            return state;
    }
};

const mockApi = {
    fetchTodos: () => new Promise((resolve) => {
        setTimeout(() => {
            resolve(JSON.parse(localStorage.getItem('todos')) || []);
        }, 1000);
    }),
    addTodo: (todo) => new Promise((resolve) => {
        setTimeout(() => {
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            localStorage.setItem('todos', JSON.stringify([...todos, todo]));
            resolve(todo);
        }, 500);
    }),
    removeTodo: (id) => new Promise((resolve) => {
        setTimeout(() => {
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            const updatedTodos = todos.filter(todo => todo.id !== id);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            resolve(id);
        }, 500);
    }),
    updateTodo: (updatedTodo) => new Promise((resolve) => {
        setTimeout(() => {
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            const updatedTodos = todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            resolve(updatedTodo);
        }, 500);
    })
};

export const TodoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const queryClient = useQueryClient();

    useQuery({
        queryKey: ['todos'],
        queryFn: mockApi.fetchTodos,
        onSuccess: (data) => {
            dispatch({ type: 'SET_TODOS', payload: data });
        },
    });

    const addTodoMutation = useMutation({
        mutationFn: mockApi.addTodo,
        onSuccess: (newTodo) => {
            queryClient.invalidateQueries(['todos']);
            dispatch({ type: 'ADD_TODO', payload: newTodo });
        },
    });

    const removeTodoMutation = useMutation({
        mutationFn: mockApi.removeTodo,
        onSuccess: (id) => {
            queryClient.invalidateQueries(['todos']);
            dispatch({ type: 'REMOVE_TODO', payload: id });
        },
    });

    const updateTodoMutation = useMutation({
        mutationFn: mockApi.updateTodo,
        onSuccess: (updatedTodo) => {
            queryClient.invalidateQueries(['todos']);
            dispatch({ type: 'UPDATE_TODO', payload: updatedTodo });
        },
    });

    const addTodo = (todo) => {
        addTodoMutation.mutate(todo);
    };

    const removeTodo = (id) => {
        removeTodoMutation.mutate(id);
    };

    const updateTodo = (updatedTodo) => {
        updateTodoMutation.mutate(updatedTodo);
    };

    return (
        <TodoContext.Provider value={{ todos: state, addTodo, removeTodo, updateTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = () => useContext(TodoContext);
