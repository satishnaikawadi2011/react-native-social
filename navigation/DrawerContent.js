import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { useTheme, Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import { toggleTheme, logoutUser } from '../redux/actions/user';

const DrawerContent = (props) => {
	const paperTheme = useTheme();
	const dispatch = useDispatch();
	const { credentials, isDarkTheme } = useSelector((state) => state.user);
	const { screams } = useSelector((state) => state.user);
	let totalLikes = 0;
	screams.forEach((sc) => {
		totalLikes += sc.likeCount;
	});
	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					<View style={styles.userInfoSection}>
						<Avatar.Image
							source={{
								uri : credentials.userImage
							}}
							size={50}
						/>
						<Title style={styles.title}>{`@${credentials.username}`}</Title>
						{/* <Caption style={styles.caption}>{credentials.username}</Caption> */}
						<View style={styles.row}>
							<View style={styles.section}>
								<Paragraph
									style={[
										styles.paragraph,
										styles.caption
									]}
								>
									{screams.length}
								</Paragraph>
								<Caption style={styles.caption}>Screams</Caption>
							</View>
							<View style={styles.section}>
								<Paragraph
									style={[
										styles.paragraph,
										styles.caption
									]}
								>
									{totalLikes}
								</Paragraph>
								<Caption style={styles.caption}>Total Likes</Caption>
							</View>
						</View>
					</View>
					<Drawer.Section style={styles.drawerSection}>
						<DrawerItem
							labelStyle={{ fontFamily: 'ubuntu' }}
							icon={({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />}
							label="Home"
							onPress={() => {
								props.navigation.navigate('HomeDrawer');
							}}
						/>
						<DrawerItem
							labelStyle={{ fontFamily: 'ubuntu' }}
							icon={({ color, size }) => (
								<MaterialCommunityIcons name="account-outline" color={color} size={size} />
							)}
							label="Profile"
							onPress={() => {
								props.navigation.navigate('ProfileDrawer');
							}}
						/>
						<DrawerItem
							labelStyle={{ fontFamily: 'ubuntu' }}
							icon={({ color, size }) => (
								<MaterialCommunityIcons name="content-save-edit-outline" color={color} size={size} />
							)}
							label="Your Screams"
							onPress={() => {}}
						/>
					</Drawer.Section>
					<Drawer.Section title="Preferences">
						<TouchableRipple
							onPress={() => {
								dispatch(toggleTheme());
								props.setIsDarkTheme((prevState) => !prevState);
							}}
						>
							<View style={styles.preference}>
								<Text>Dark Theme</Text>
								<View pointerEvents="none">
									<Switch value={paperTheme.dark} />
								</View>
							</View>
						</TouchableRipple>
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomDrawerSection}>
				<DrawerItem
					icon={({ color, size }) => <MaterialCommunityIcons name="exit-to-app" size={24} color={color} />}
					label="Sign Out"
					onPress={() => {
						props.navigation.toggleDrawer();
						dispatch(logoutUser());
					}}
				/>
			</Drawer.Section>
		</View>
	);
};

const styles = StyleSheet.create({
	bottomDrawerSection : {
		marginBottom   : 15,
		borderTopColor : '#f4f4f4',
		borderTopWidth : 1
	},
	drawerContent       : {
		flex : 1
	},
	userInfoSection     : {
		paddingLeft : 20
	},
	title               : {
		marginTop  : 20,
		fontFamily : 'ubuntu-bold',
		color      : Colors.primary,
		fontSize   : 25
	},
	caption             : {
		fontSize   : 14,
		lineHeight : 14,
		fontFamily : 'ubuntu'
	},
	row                 : {
		marginTop     : 20,
		flexDirection : 'row',
		alignItems    : 'center'
	},
	section             : {
		flexDirection : 'row',
		alignItems    : 'center',
		marginRight   : 15
	},
	paragraph           : {
		fontWeight  : 'bold',
		marginRight : 3,
		fontFamily  : 'ubuntu'
	},
	drawerSection       : {
		marginTop : 15
	},
	preference          : {
		flexDirection     : 'row',
		justifyContent    : 'space-between',
		paddingVertical   : 12,
		paddingHorizontal : 16
	}
});

export default DrawerContent;
// import React from 'react'
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
