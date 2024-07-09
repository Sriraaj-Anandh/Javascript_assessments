import React, { useState } from 'react';
import { TodoProvider, useTodos } from './contexts/TodoContext';
import { Table, Button, Input, Space, Checkbox } from 'antd';
import 'antd/dist/reset.css';
import './App.css';

const TodoTable = () => {
    const { todos, isLoading, addTodo, removeTodo, updateTodo } = useTodos();
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            addTodo({
                id: Date.now(),
                task: newTodo,
                completed: false,
            });
            setNewTodo('');
        }
    };

    const columns = [
        {
            title: 'Task',
            dataIndex: 'task',
            key: 'task',
            sorter: (a, b) => a.task.localeCompare(b.task),
        },
        {
            title: 'Completed',
            dataIndex: 'completed',
            key: 'completed',
            filters: [
                { text: 'Completed', value: true },
                { text: 'Not Completed', value: false },
            ],
            onFilter: (value, record) => record.completed === value,
            render: (completed, record) => (
                <Checkbox
                    checked={completed}
                    onChange={() => updateTodo({ ...record, completed: !completed })}
                />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button type="primary" danger onClick={() => removeTodo(record.id)}>
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Space>
                    <Input
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add new TODO"
                    />
                    <Button type="primary" onClick={handleAddTodo}>
                        Add TODO
                    </Button>
                </Space>
                <Table
                    columns={columns}
                    dataSource={todos || []}
                    rowKey="id"
                    loading={isLoading}
                    pagination={{ pageSize: 5 }}
                />
            </Space>
        </>
    );
};

function App() {
    return (
        <TodoProvider>
            <div className="App">
                <h1>TODO List</h1>
                <TodoTable />
            </div>
        </TodoProvider>
    );
}

export default App;
