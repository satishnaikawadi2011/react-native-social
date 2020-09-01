import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import { setDidTryAL, authenticate } from '../redux/actions/user';

const StartupScreen = (props) => {
	const dispatch = useDispatch();

	useEffect(
		() => {
			const tryLogin = async () => {
				const userData = await AsyncStorage.getItem('userData');
				console.log(userData);
				if (!userData) {
					dispatch(setDidTryAL());
					return;
				}
				const transformedData = JSON.parse(userData);
				const { token, expiryDate } = transformedData;
				const expirationDate = new Date(expiryDate);

				if (expirationDate <= new Date() || !token) {
					// props.navigation.navigate('Auth');
					dispatch(setDidTryAL());
					return;
				}

				const expirationTime = expirationDate.getTime() - new Date().getTime();

				// props.navigation.navigate('Shop');
				dispatch(authenticate(token, expirationTime));
			};

			tryLogin();
		},
		[
			dispatch
		]
	);

	return (
		<View style={styles.screen}>
			<ActivityIndicator size="large" color={Colors.primary} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen : {
		flex           : 1,
		justifyContent : 'center',
		alignItems     : 'center'
	}
});

export default StartupScreen;
