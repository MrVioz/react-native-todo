import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getTodos = async () => {
    const response = await api.get('/todos');
    return response.data;
};

export const createTodo = async (title: string, description: string, priority: number) => {
    const response = await api.post('/todos', {title, description, priority});
    return response.data;
};

export const deleteTodo = async (id: number) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
};

export const updateTodo = async (id: number, updatedFields: Partial<{
    title: string;
    description: string;
    priority: number;
    isDone: boolean
}>) => {
    const response = await api.patch(`/todos/${id}`, updatedFields);
    return response.data;
};
