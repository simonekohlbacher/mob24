// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 40,

	},
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	heading: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
		margin: 20,
		textAlign: 'center',
		color: '#333',
	},
	exerciseContainer: {
		marginBottom: 20,
		backgroundColor: 'rgba(255,255,255,0.51)',
		padding: 15,
		borderRadius: 10,
		boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
		margin: 20,
	},
	exerciseName: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#772877',
		padding: 5,
	},
	exerciseDetailLabel: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#772877',
		padding: 5,
	},
	exerciseDetail: {
		fontSize: 16,
		color: '#666',
		marginBottom: 5,
	},
	instructionsContainer: {
		marginTop: 10,
		padding: 10,
		backgroundColor: '#E8EAF6',
		borderRadius: 10,
	},
	instructionsTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 5,
		color: '#333',
	},
	instructionText: {
		fontSize: 14,
		marginTop: 5,
		color: '#555',
	},
	exerciseImage: {
		width: '100%', // 100% der Breite des Containers
		aspectRatio: 1, // Verhältnis von Breite zu Höhe (1:1), könnte anpassen
		marginTop: 10,
		marginBottom: 10,
		resizeMode: 'cover', // Anpassen, um das Verhalten der Bildskalierung zu steuern
		borderRadius: 10,
	},
	noImageText: {
		fontSize: 14,
		color: 'red',
		marginTop: 10,
	},
});

export default styles;