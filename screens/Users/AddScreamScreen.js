import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AddScreamScreen(props) {
	return (
		<View style={styles.container}>
			<Text>Add Scream</Text>
		</View>
	);
}

export default AddScreamScreen;

const styles = StyleSheet.create({
	container : {
		flex           : 1,
		justifyContent : 'center',
		alignSelf      : 'center'
	}
});
