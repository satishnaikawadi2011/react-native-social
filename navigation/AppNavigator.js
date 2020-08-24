import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

// import ProductOverviewScreen, { screenOptions } from '../screens/shop/ProductOverviewScreen';
import Colors from '../constants/Colors';
import { Platform, SafeAreaView, View, Button, Text } from 'react-native';
import { Ionicons, FontAwesome5, Entypo, AntDesign } from '@expo/vector-icons';
import ScreamListScreen, { screenOptions } from '../screens/MainApp/ScreamListScreen';
// TODO: particular screen options

// export const screenOptions = (navData) => {
// 	return {
// 		headerTitle : 'All Products',
// 		headerRight : () => (
// 			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
// 				<Item
// 					title="Cart"
// 					iconName={

// 							Platform.OS === 'android' ? 'md-cart' :
// 							'ios-cart'
// 					}
// 					onPress={() => {
// 						navData.navigation.navigate('Cart');
// 					}}
// 				/>
// 			</HeaderButtons>
// 		),

// 		headerLeft  : () => (
// 			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
// 				<Item
// 					title="Menu"
// 					iconName={

// 							Platform.OS === 'android' ? 'md-menu' :
// 							'ios-menu'
// 					}
// 					onPress={() => {
// 						navData.navigation.toggleDrawer();
// 					}}
// 				/>
// 			</HeaderButtons>
// 		)
// 	};
// };

// TODO: particular screen options

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
import NotificationScreen, { screenOptions as NotificationScreenOptions } from '../screens/MainApp/NotificationScreen';
import ScreamDetailScreen, { screenOptions as DetailScreenOptions } from '../screens/MainApp/ScreamDetailScreen';
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

// const ShopDrawerNavigator = createDrawerNavigator();

// export const ShopNavigator = () => {
// 	const dispatch = useDispatch();
// 	return (
// 		<ShopDrawerNavigator.Navigator
// 			drawerContent={(props) => {
// 				return (
// 					<View style={{ flex: 1, paddingTop: 30 }}>
// 						<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
// 							<DrawerItemList {...props} />
// 							{/* <View > */}
// 							<TouchableWithoutFeedback
// 								style={{ alignItems: 'center', flexDirection: 'row', marginTop: 10 }}
// 								onPress={() => {
// 									dispatch(logout());
// 									// props.navigation.navigate('Auth');
// 								}}
// 							>
// 								<AntDesign name="logout" size={24} color="black" style={{ marginLeft: 15 }} />
// 								<Text style={{ fontFamily: 'ubuntu-bold', marginLeft: 28 }}>Logout</Text>
// 							</TouchableWithoutFeedback>
// 						</SafeAreaView>
// 					</View>
// 				);
// 			}}
// 			drawerContentOptions={{
// 				activeTintColor : Colors.primary
// 			}}
// 		>
// 			<ShopDrawerNavigator.Screen
// 				name="Products"
// 				component={ProductsNavigator}
// 				options={{
// 					drawerIcon : (props) => (
// 						<Ionicons
// 							name={

// 									Platform.OS === 'android' ? 'md-cart' :
// 									'ios-cart'
// 							}
// 							color={props.color}
// 							size={23}
// 						/>
// 					)
// 				}}
// 			/>
// 			<ShopDrawerNavigator.Screen
// 				name="Orders"
// 				component={OrdersNavigator}
// 				options={{
// 					drawerIcon : (props) => (
// 						<Ionicons
// 							name={

// 									Platform.OS === 'android' ? 'md-list' :
// 									'ios-list'
// 							}
// 							color={props.color}
// 							size={23}
// 						/>
// 					)
// 				}}
// 			/>
// 			<ShopDrawerNavigator.Screen
// 				name="Admin"
// 				component={AdminNavigator}
// 				options={{
// 					drawerIcon : (props) => (
// 						<Ionicons
// 							name={

// 									Platform.OS === 'android' ? 'md-create' :
// 									'ios-create'
// 							}
// 							color={props.color}
// 							size={23}
// 						/>
// 					)
// 				}}
// 			/>
// 		</ShopDrawerNavigator.Navigator>
// 	);
// };

const AuthStackNavigator = createStackNavigator();
import LoginScreen from '../screens/Users/LoginScreen';
import SignupScreen from '../screens/Users/SignupScreen';

export const AuthNavigator = () => {
	return (
		<AuthStackNavigator.Navigator screenOptions={defaltNavOptions}>
			<AuthStackNavigator.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
			<AuthStackNavigator.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
		</AuthStackNavigator.Navigator>
	);
};

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/Users/ProfileScreen';
import AddScreamScreen from '../screens/Users/AddScreamScreen';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
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
					else if (route.name === 'Profile') {
						iconName =
							focused ? 'user-alt' :
							'user';
						return <FontAwesome5 name={iconName} size={30} color={color} />;
					}
					else if (route.name == 'Add') {
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
			<Tab.Screen name="Add" component={AddScreamScreen} options={{ headerShown: false }} />
			<Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
		</Tab.Navigator>
	);
};

const tabBarOptions = {
	activeTintColor         : Colors.primary,
	inactiveTintColor       : 'gray',
	activeBackgroundColor   : Colors.background,
	inactiveBackgroundColor : 'white',
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
