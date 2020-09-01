import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import { LinearGradient } from 'expo-linear-gradient';
import AppNavigator from './navigation/NavigationContainer';
import {
	Provider as PaperProvider,
	DarkTheme as PaperDarkTheme,
	DefaultTheme as PaperDefaultTheme
} from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

const fetchFonts = () => {
	return Font.loadAsync({
		ubuntu          : require('./assets/fonts/Ubuntu-Regular.ttf'),
		'ubuntu-bold'   : require('./assets/fonts/Ubuntu-Bold.ttf'),
		'ubuntu-medium' : require('./assets/fonts/Ubuntu-Medium.ttf')
	});
};

export default function App() {
	// const isDarkTheme = store.getState().user.isDarkTheme;
	const [
		isDarkTheme,
		setIsDarkTheme
	] = useState(false);
	const [
		fontLoaded,
		setFontLoaded
	] = useState(false);
	if (!fontLoaded) {
		return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
	}
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
		<Provider store={store}>
			<PaperProvider theme={theme}>
				<AppNavigator isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
			</PaperProvider>
		</Provider>
	);
}
