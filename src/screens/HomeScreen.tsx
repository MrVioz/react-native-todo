import {
    View,
    Text,
    StyleSheet,
    Button,
    Modal,
    TextInput,
    TouchableOpacity, FlatList, Alert, Switch,
} from 'react-native';
import {useEffect, useState} from 'react';
import {createTodo, deleteTodo, getTodos, updateTodo} from '../services/api.ts';
import {Todo} from '../interfaces/Todo.ts';

interface User {
    username: string;
    age: number;
}



const HomeScreen = () => {
    const user: User = {
        username: 'Jan',
        age: 27,
    };
    const [todos, setTodos] = useState<Todo[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');

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
            return Alert.alert('all fields are required');
        }

        try {
            await createTodo(title, description, parseInt(priority, 10));
            setTitle('');
            setDescription('');
            setPriority('');
            setModalVisible(false);
            fetchTodos();
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };
    const handleDeleteTodo = async (id: number) => {
        try {
            await deleteTodo(id);
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };
    const toggleTodoStatus = async (id: number, isDone: boolean) => {
        await updateTodo(id, { isDone: !isDone });
        fetchTodos();
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text style={styles.titleText}>Your Todos! 🎉
                {'\n'}
                {'\n'}
            </Text>
            <Text> Hello {user.username} 🎉
                {'\n'}
                It's nice to see you again. Please create a new Task!
            </Text>
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.todoItem}>
                        <Text style={styles.todoTitle}>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Switch
                            value={item.isDone}
                            onValueChange={() => toggleTodoStatus(item.id, item.isDone)}
                        />
                        <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
                            <Text style={styles.deleteButton}>❌</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <Button title={'add task!'} onPress={() => {
                setModalVisible(true);
            }}/>
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Create a new Task</Text>
                    <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle}/>
                    <TextInput style={styles.input} placeholder="Description" value={description}
                               onChangeText={setDescription}/>
                    <TextInput style={styles.input} placeholder="Priority (1-5)" value={priority}
                               onChangeText={setPriority} keyboardType="numeric"/>
                    <Button title="Add" onPress={handleAddTodo}/>
                    <Button title="Cancel" color="red" onPress={() => setModalVisible(false)}/>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {flex: 1, padding: 20, backgroundColor: '#fff'},
    titleText: {fontSize: 24, fontWeight: 'bold', marginBottom: 10},
    todoItem: {flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1},
    todoTitle: {fontSize: 18, fontWeight: 'bold'},
    deleteButton: {color: 'red', fontSize: 18},
    modalContainer: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20},
    modalTitle: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
    input: {borderWidth: 1, borderColor: '#ccc', padding: 10, width: '100%', marginVertical: 5},
});
export {HomeScreen};


