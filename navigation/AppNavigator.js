import React from 'react';
import NotificationScreen, { screenOptions as NotificationScreenOptions } from '../screens/MainApp/NotificationScreen';
import ScreamDetailScreen, { screenOptions as DetailScreenOptions } from '../screens/MainApp/ScreamDetailScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import LoginScreen from '../screens/Users/LoginScreen';
import SignupScreen from '../screens/Users/SignupScreen';
import TabNavigator from './TabNavigator';
import ScreamListScreen, { screenOptions } from '../screens/MainApp/ScreamListScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import ProfileScreen, { screenOptions as profileOptions } from '../screens/Users/ProfileScreen';

const defaltNavOptions = {
	headerStyle          : {
		backgroundColor :

				Platform.OS === 'android' ? Colors.primary :
				''
	},
	headerBackTitleStyle : {
		fontFamily : 'ubuntu'
	},
	headerTitleStyle     : {
		fontFamily : 'ubuntu-bold'
	},
	headerTintColor      :

			Platform.OS === 'android' ? 'white' :
			Colors.primary
};

const ScreamsStackNavigator = createStackNavigator();
export const ScreamsNavigator = () => {
	return (
		<ScreamsStackNavigator.Navigator screenOptions={defaltNavOptions}>
			<ScreamsStackNavigator.Screen name="ScreamsOverview" component={TabNavigator} options={screenOptions} />
			<ScreamsStackNavigator.Screen
				name="Notification"
				component={NotificationScreen}
				options={NotificationScreenOptions}
			/>
			<ScreamsStackNavigator.Screen
				name="ScreamDetail"
				component={ScreamDetailScreen}
				options={DetailScreenOptions}
			/>
		</ScreamsStackNavigator.Navigator>
	);
};

const AuthStackNavigator = createStackNavigator();
export const AuthNavigator = () => {
	return (
		<AuthStackNavigator.Navigator screenOptions={defaltNavOptions}>
			<AuthStackNavigator.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
			<AuthStackNavigator.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
		</AuthStackNavigator.Navigator>
	);
};

const MainDrawerNavigator = createDrawerNavigator();

export const MainNavigator = (props) => {
	const setIsDarkTheme = props.setIsDarkTheme;
	return (
		<MainDrawerNavigator.Navigator
			drawerContentOptions={{ activeTintColor: Colors.primary }}
			drawerContent={(props) => <DrawerContent {...props} setIsDarkTheme={setIsDarkTheme} />}
		>
			<MainDrawerNavigator.Screen name="HomeDrawer" component={ScreamsNavigator} />
			<MainDrawerNavigator.Screen name="ProfileDrawer" component={ProfileNavigator} />
			{/* <MainDrawerNavigator.Screen name=""/> */}
		</MainDrawerNavigator.Navigator>
	);
};

const ProfileStackNavigator = createStackNavigator();
export const ProfileNavigator = () => {
	return (
		<ProfileStackNavigator.Navigator screenOptions={defaltNavOptions}>
			<ProfileStackNavigator.Screen name="Profile" component={ProfileScreen} options={profileOptions} />
		</ProfileStackNavigator.Navigator>
	);
};
