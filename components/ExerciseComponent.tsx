import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, FlatList, Button } from "react-native";
import styles from '../styles/exercise';
import { Exercise } from '../types/exercise';
import { fetchExercises } from '../api/exerciseapi';
import { useLikedWorkouts } from '../context/LikedWorkoutsContext';
import ExerciseDetail from './ExerciseDetail';

const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

interface ExerciseComponentProps {
    level: string;
}

const ExerciseComponent: React.FC<ExerciseComponentProps> = ({ level }) => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { likedWorkouts, addLikedWorkout, removeLikedWorkout } = useLikedWorkouts();
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

    useEffect(() => {
        const getExercises = async () => {
            try {
                const exercisesData = await fetchExercises();
                setExercises(exercisesData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        getExercises();
    }, []);

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }

    if (selectedExercise) {
        return <ExerciseDetail exercise={selectedExercise} onBack={() => setSelectedExercise(null)} />;
    }

    // Filtern der Übungen nach dem übergebenen Level
    const filteredExercises = exercises.filter(exercise => exercise.level === level);

    return (
        <FlatList
            data={filteredExercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.exerciseContainer}>
                    <Text style={styles.exerciseName}>{item.name}</Text>
                    <Text style={styles.exerciseDetailLabel}>Force: <Text style={styles.exerciseDetail}>{item.force}</Text></Text>
                    <Text style={styles.exerciseDetailLabel}>Level: <Text style={styles.exerciseDetail}>{item.level}</Text></Text>

                    <Button
                        title={likedWorkouts.some(w => w.id === item.id) ? 'Unlike' : 'Like'}
                        onPress={() => {
                            likedWorkouts.some(w => w.id === item.id) ? removeLikedWorkout(item) : addLikedWorkout(item)
                        }}
                    />

                    <Button
                        title="Details"
                        onPress={() => setSelectedExercise(item)}
                    />
                </View>
            )}
        />
    );
};

export default ExerciseComponent;
