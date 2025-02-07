import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Switch, StyleSheet } from 'react-native';
import { Todo } from '../interfaces/Todo';
import { getTodos } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const FilterScreen = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
    const [showCompleted, setShowCompleted] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const fetchTodos = async () => {
                try {
                    const data = await getTodos();
                    setTodos(data);
                    setFilteredTodos(data);
                } catch (error) {
                    console.error('Fehler beim Laden der Todos:', error);
                }
            };
            fetchTodos();
        }, [])
    );

    useEffect(() => {
        if (showCompleted) {
            setFilteredTodos(todos.filter(todo => todo.isDone));
        } else {
            setFilteredTodos(todos);
        }
    }, [showCompleted, todos]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Filter Todos</Text>
            <View style={styles.filterContainer}>
                <Text>Zeige nur erledigte Todos</Text>
                <Switch
                    value={showCompleted}
                    onValueChange={() => setShowCompleted(!showCompleted)}
                />
            </View>

            {/* Gefilterte Todos anzeigen */}
            <FlatList
                data={filteredTodos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={[styles.todoItem, item.isDone && styles.completed]}>
                        {item.title} (Priorität: {item.priority})
                    </Text>
                )}
                ListEmptyComponent={<Text>Keine Todos gefunden.</Text>}
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
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    todoItem: {
        fontSize: 18,
        padding: 10,
    },
    completed: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
});

export { FilterScreen };
