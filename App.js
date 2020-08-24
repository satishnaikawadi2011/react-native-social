import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import store from './redux/store';
import { LinearGradient } from 'expo-linear-gradient';
import AppNavigator from './navigation/NavigationContainer';

const fetchFonts = () => {
	return Font.loadAsync({
		ubuntu          : require('./assets/fonts/Ubuntu-Regular.ttf'),
		'ubuntu-bold'   : require('./assets/fonts/Ubuntu-Bold.ttf'),
		'ubuntu-medium' : require('./assets/fonts/Ubuntu-Medium.ttf')
	});
};

export default function App() {
	const [
		fontLoaded,
		setFontLoaded
	] = useState(false);
	if (!fontLoaded) {
		return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
	}
	return (
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	);
}
