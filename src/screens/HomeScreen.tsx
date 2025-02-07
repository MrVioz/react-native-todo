import {
    View,
    Text,
    StyleSheet,
    Button,
    Modal,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    Switch,
    ToastAndroid,
} from 'react-native';
import { useEffect, useState } from 'react';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../services/api.ts';
import { Todo } from '../interfaces/Todo.ts';

interface User {
    username: string;
    age: number;
}

const HomeScreen = ({ navigation }) => {
    const user: User = {
        username: 'Jan',
        age: 27,
    };
    const [todos, setTodos] = useState<Todo[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [expandedTodo, setExpandedTodo] = useState<number | null>(null); // Speichert die geöffnete Task-ID

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const data = await getTodos();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleAddTodo = async () => {
        if (!title.trim() || !description.trim() || !priority.trim()) {
            return Alert.alert('All fields are required');
        }

        try {
            await createTodo(title, description, parseInt(priority, 10));
            setTitle('');
            setDescription('');
            setPriority('');
            setModalVisible(false);
            fetchTodos();
            ToastAndroid.showWithGravity('Added Task successfully!', ToastAndroid.SHORT, ToastAndroid.TOP);
        } catch (error) {
            console.error('Error creating todo:', error);
            ToastAndroid.showWithGravity('Something went wrong!', ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    };

    const handleDeleteTodo = async (id: number) => {
        try {
            await deleteTodo(id);
            fetchTodos();
            ToastAndroid.showWithGravity('Task removed successfully!', ToastAndroid.SHORT, ToastAndroid.TOP);
        } catch (error) {
            console.error('Error deleting todo:', error);
            ToastAndroid.showWithGravity('Something went wrong', ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    };

    const toggleTodoStatus = async (id: number, isDone: boolean) => {
        await updateTodo(id, { isDone: !isDone });
        if (!isDone) {
            ToastAndroid.showWithGravity('Great Job! You finished your Task', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
        fetchTodos();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Your Todos! 🎉</Text>
            <Text style={styles.subtitle}>Hello {user.username} 🎉 It's nice to see you again.</Text>
            <View style={styles.listContainer}>
                <FlatList
                    data={todos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.todoItem}
                            onPress={() => setExpandedTodo(expandedTodo === item.id ? null : item.id)} // Expandieren oder Einklappen
                        >
                            <View style={styles.todoHeader}>
                                <Text style={styles.todoTitle}>{item.title}</Text>
                                <Switch value={item.isDone} onValueChange={() => toggleTodoStatus(item.id, item.isDone)} />
                            </View>

                            {/* Beschreibung nur anzeigen, wenn das Item aktiv ist */}
                            {expandedTodo === item.id && (
                                <Text style={styles.todoDescription}>{item.description}</Text>
                            )}

                            <TouchableOpacity onPress={() => handleDeleteTodo(item.id)} style={styles.deleteButton}>
                                <Text style={styles.deleteButtonText}>❌</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <Button title={'ADD TASK!'} onPress={() => setModalVisible(true)} color="#007BFF" />

            {/* Modal für neues Todo */}
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Create a new Task</Text>
                    <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
                    <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
                    <TextInput style={styles.input} placeholder="Priority (1-5)" value={priority} onChangeText={setPriority} keyboardType="numeric" />
                    <Button title="Add" onPress={handleAddTodo} />
                    <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

// **Styles**
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
        color: '#555',
    },
    listContainer: {
        flex: 1,
        width: '100%',
        maxHeight: 400, // Feste Größe für die Liste
    },
    todoItem: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    todoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    todoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    todoDescription: {
        marginTop: 8,
        fontSize: 14,
        color: '#555',
        backgroundColor: '#e3e3e3',
        padding: 8,
        borderRadius: 5,
    },
    deleteButton: {
        marginTop: 10,
        alignSelf: 'flex-end',
    },
    deleteButtonText: {
        color: 'red',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '100%',
        marginVertical: 5,
    },
});

export { HomeScreen };
