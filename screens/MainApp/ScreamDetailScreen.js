import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

function ScreamListScreen(props) {
	const screamId = props.route.params.screamId;
	return (
		<View>
			<Text>Scream Detail</Text>
			<Text>{screamId}</Text>
		</View>
	);
}

export default ScreamListScreen;

export const screenOptions = (navData) => {
	return {
		hederTitle : 'Scream Detail'
	};
};
