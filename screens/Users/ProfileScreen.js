import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ProfileScreen(props) {
	return (
		<View style={styles.container}>
			<Text>Profile</Text>
		</View>
	);
}

export default ProfileScreen;

const styles = StyleSheet.create({
	container : {
		flex           : 1,
		justifyContent : 'center',
		alignSelf      : 'center'
	}
});
