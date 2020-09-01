import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/Users/ProfileScreen';
import AddScreamScreen from '../screens/Users/AddScreamScreen';
import { Entypo, AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import ScreamListScreen from '../screens/MainApp/ScreamListScreen';
import Colors from '../constants/Colors';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	const { isDarkTheme } = useSelector((state) => state.user);
	const tabBarOptions = {
		activeTintColor         : Colors.primary,
		inactiveTintColor       :
			isDarkTheme ? 'white' :
			'gray',
		activeBackgroundColor   :
			isDarkTheme ? Colors.darkBackground :
			Colors.background,
		inactiveBackgroundColor :
			isDarkTheme ? 'black' :
			'white',
		labelStyle              : {
			fontSize     : 16,
			fontFamily   : 'ubuntu-bold',
			marginBottom : 5,
			marginTop    : 10
		},
		iconStyle               : {
			marginTop : 10
		},
		safeAreaInsets          : {
			bottom : 5
		},
		showLabel               : false
	};
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon : ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Home') {
						iconName = 'home';
						const icon =
							focused ? <Entypo name={iconName} size={size} color={color} /> :
							<AntDesign name={iconName} size={30} color={color} />;
						return icon;
					}
					else if (route.name == 'Add') {
						// else if (route.name === 'Profile') {
						// 	iconName =
						// 		focused ? 'user-alt' :
						// 		'user';
						// 	return <FontAwesome5 name={iconName} size={30} color={color} />;
						// }
						iconName =
							focused ? 'md-add-circle' :
							'md-add-circle-outline';
						return <Ionicons name={iconName} size={30} color={color} />;
					}

					// You can return any component that you like here!
					// return <Ionicons name={iconName} size={size} color={color} />;
				}
			})}
			tabBarOptions={{
				...tabBarOptions
			}}
		>
			<Tab.Screen name="Home" component={ScreamListScreen} options={{}} />
			<Tab.Screen name="Add" component={AddScreamScreen} options={{}} />
			{/* <Tab.Screen name="Profile" component={ProfileScreen} options={{}} /> */}
		</Tab.Navigator>
	);
};

export default TabNavigator;
