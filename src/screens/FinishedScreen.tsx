import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Todo } from '../interfaces/Todo';
import { getTodos } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';

const FinishedScreen = () => {
    const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchTodos = async () => {
                try {
                    const data = await getTodos();
                    const filteredData = data.filter(todo => todo.isDone);
                    setCompletedTodos(filteredData);
                } catch (error) {
                    console.error('Fehler beim Laden der Todos:', error);
                }
            };
            fetchTodos();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Erledigte Todos ✅</Text>
            <FlatList
                data={completedTodos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <Text style={styles.todoTitle}>{item.title}</Text>
                        <Text style={styles.todoDescription}>{item.description}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Keine erledigten Todos gefunden.</Text>}
            />
        </View>
    );
};

// **Styles**
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    todoItem: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    todoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'line-through', // Zeigt an, dass das Todo erledigt ist
        color: 'gray',
    },
    todoDescription: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
    },
});

export { FinishedScreen };
