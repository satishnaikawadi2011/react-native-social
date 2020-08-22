import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { ScreamsNavigator } from './AppNavigator';
// import StartupScreen from '../screens/StartupScreen';

const AppNavigator = (props) => {
	// const isAuth = useSelector((state) => !!state.auth.token);
	// const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
	return (
		<NavigationContainer>
			<ScreamsNavigator />
			{/* {isAuth && <ShopNavigator />}
			{!isAuth && didTryAutoLogin && <AuthNavigator />}
			{!isAuth && !didTryAutoLogin && <StartupScreen />} */}
		</NavigationContainer>
	);
};
export default AppNavigator;
