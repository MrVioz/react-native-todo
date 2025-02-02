import {View, Text, StyleSheet, Button, Modal, TouchableWithoutFeedback, Keyboard, TextInput} from 'react-native';
import {useState} from 'react';

interface User {
    username: string;
    age: number;
}

const HomeScreen = () => {
    const user:User = {
        username: 'Jan',
        age: 27,
    };
    const [modalVisible, setModalVisible] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [error, setError] = useState('');

    const handleAddTask = () => {
        if (taskTitle.trim() === '') {
            setError('Title cannot be empty');
            return;
        }
        console.log('Task added:', { taskTitle, taskDescription });
        setTaskTitle('');
        setTaskDescription('');
        setError('');
        setModalVisible(false);
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
            <Button title={'add task!'} onPress={()=>{setModalVisible(true);}}/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Create a new Task</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Task Title"
                                value={taskTitle}
                                onChangeText={setTaskTitle}
                            />
                            {error ? <Text style={styles.errorText}>{error}</Text> : null}

                            <TextInput
                                style={styles.input}
                                placeholder="Task Description (optional)"
                                value={taskDescription}
                                onChangeText={setTaskDescription}
                            />

                            <View style={styles.buttonContainer}>
                                <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
                                <Button title="Add" onPress={handleAddTask} />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});
export {HomeScreen};

