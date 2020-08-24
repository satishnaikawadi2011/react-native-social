import React from 'react';
import { View, Text } from 'react-native';

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
