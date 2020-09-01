import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

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
