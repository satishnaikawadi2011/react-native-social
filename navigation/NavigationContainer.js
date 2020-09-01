import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { ScreamsNavigator, AuthNavigator, MainNavigator } from './AppNavigator';
import {
	Provider as PaperProvider,
	DarkTheme as PaperDarkTheme,
	DefaultTheme as PaperDefaultTheme
} from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = (props) => {
	const token = useSelector((state) => !!state.user.token);
	const username = useSelector((state) => !!state.user.credentials.username);
	const isAuth = token;
	const { credentials } = useSelector((state) => state.user);
	const didTryAutoLogin = useSelector((state) => state.user.didTryAutoLogin);
	const isDarkTheme = props.isDarkTheme;

	const CustomDefaultTheme = {
		...NavigationDefaultTheme,
		...PaperDefaultTheme,
		colors : {
			...NavigationDefaultTheme.colors,
			...PaperDefaultTheme.colors
		}
	};

	const CustomDarkTheme = {
		...NavigationDarkTheme,
		...PaperDarkTheme,
		colors : {
			...NavigationDarkTheme.colors,
			...PaperDarkTheme.colors
		}
	};

	const theme =
		isDarkTheme ? CustomDarkTheme :
		CustomDefaultTheme;

	return (
		<NavigationContainer theme={theme}>
			{isAuth && <MainNavigator setIsDarkTheme={props.setIsDarkTheme} />}
			{!isAuth && didTryAutoLogin && <AuthNavigator />}
			{!isAuth && !didTryAutoLogin && <StartupScreen />}
		</NavigationContainer>
	);
};
export default AppNavigator;
