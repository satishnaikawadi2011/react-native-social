import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { ScreamsNavigator, AuthNavigator } from './AppNavigator';
import { AsyncStorage } from 'react-native';
import store from '../redux/store';
import { SET_AUTHENTICATED } from '../redux/types';
import JwtDecode from 'jwt-decode';
import axios from 'axios';
import { getUserData, logoutUser } from '../redux/actions/user';
// import StartupScreen from '../screens/StartupScreen';

const AppNavigator = (props) => {
	const isAuth = useSelector((state) => state.user.authenticated);
	// console.log('NAv => ', isAuth);
	const [
		token,
		setToken
	] = useState(null);
	useEffect(
		() => {
			AsyncStorage.getItem('token')
				.then((data) => {
					// console.log(data);
					const transformedToken = JSON.parse(data).token;
					setToken(transformedToken);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		[
			token
		]
	);
	if (token) {
		const decodedToken = JwtDecode(token);
		if (decodedToken.exp * 1000 < Date.now()) {
			store.dispatch(logoutUser());
		}
		else {
			store.dispatch({ type: SET_AUTHENTICATED });
			store.dispatch(getUserData());
		}
	}
	return (
		<NavigationContainer>
			{/* <ScreamsNavigator /> */}
			{!isAuth && <AuthNavigator />}
			{isAuth && <ScreamsNavigator />}
			{/*{!isAuth && didTryAutoLogin && <AuthNavigator />}
			{!isAuth && !didTryAutoLogin && <StartupScreen />} */}
		</NavigationContainer>
	);
};
export default AppNavigator;
