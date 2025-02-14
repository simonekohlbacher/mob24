import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, FlatList } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../styles/exercise';
import { Exercise } from '@/types/exercise';
import { fetchExercises } from '@/api/exerciseapi';
import { useLikedWorkouts } from '@/context/LikedWorkoutsContext';
import ExerciseDetail from './ExerciseDetail';
import { useWorkouts } from '@/context/WorkoutsContext';
import FlatButton from "@/components/button";


// ExerciseComponent component
// This component displays a list of exercises filtered by level
const ExerciseComponent: React.FC<{ level: string }> = ({ level }) => {

    // State for storing the exercises
    const [exercises, setExercises] = useState<Exercise[]>([]);
    // State for loading state
    const [loading, setLoading] = useState(true);
    // State for error state
    const [error, setError] = useState<Error | null>(null);
    // Get the liked workouts and functions to add/remove liked workouts from the context
    const { likedWorkouts, addLikedWorkout, removeLikedWorkout } = useLikedWorkouts();
    // Get the workouts and function to add exercises to a workout from the context
    const { workouts, addExerciseToWorkout } = useWorkouts();
    // State for storing the selected exercise
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    // State for storing the selected workout in the dropdown
    const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
    // State for open and close the dropdown
    const [open, setOpen] = useState(false);

    // Fetch exercises when the component mounts
    useEffect(() => {
        const getExercises = async () => {
            try {
                const exercisesData = await fetchExercises();
                setExercises(exercisesData);
                setLoading(false);
            } catch (error) {
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

    // If an exercise is selected, display the ExerciseDetail component
    if (selectedExercise) {
        return <ExerciseDetail exercise={selectedExercise} onBack={() => setSelectedExercise(null)} />;
    }

    // Filter the exercises by level
    const filteredExercises = exercises.filter(exercise => exercise.level === level);

    // Function to add an exercise to a workout
    const handleAddToWorkout = (item: Exercise) => {
        if (selectedWorkout) {
            // Check if the workout already contains this exercise ID
            if (workouts.some(workout => workout.id === selectedWorkout && workout.exercises && workout.exercises.some(ex => ex.id === item.id))) {
                alert(`Exercise with ID ${item.id} is already added to workout ${selectedWorkout}`);
            } else {
                addExerciseToWorkout(selectedWorkout, item);
                alert(`Added exercise ${item.name} to workout ${selectedWorkout}`);
            }
        } else {
            console.warn('No workout selected');
        }
    };

    // Display the list of exercises
    return (
        <FlatList
            data={filteredExercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.exerciseContainer}>
                    <Text style={styles.exerciseName}>{item.name}</Text>
                    <Text style={styles.exerciseDetailLabel}>Force: <Text style={styles.exerciseDetail}>{item.force}</Text></Text>
                    <Text style={styles.exerciseDetailLabel}>Level: <Text style={styles.exerciseDetail}>{item.level}</Text></Text>


                    <DropDownPicker
                        items={workouts.map(workout => ({ label: workout.title, value: workout.id }))}
                        containerStyle={{ height: 40, marginBottom: 10 }}
                        open={open}
                        setOpen={setOpen}
                        setValue={setSelectedWorkout}
                        value={selectedWorkout}
                        onChangeValue={(value) => setSelectedWorkout(value)}
                    />


                    <FlatButton
                        text="Add to Workout"
                        onPress={() => handleAddToWorkout(item)}
                    />


                    <FlatButton
                        text={likedWorkouts.some(w => w.id === item.id) ? 'Unlike' : 'Like'}
                        onPress={() => {
                            likedWorkouts.some(w => w.id === item.id) ? removeLikedWorkout(item) : addLikedWorkout(item);
                        }}
                    />

                    <FlatButton
                        text="Details"
                        onPress={() => setSelectedExercise(item)}
                    />
                </View>
            )}
        />
    );


};



export default ExerciseComponent;