import React, { useState, useCallback, useEffect } from 'react';
import { Platform, Image, View, Button, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Scream from '../../models/Scream';
import ScreamComponent from '../../components/MainApp/Scream';
import { useSelector, useDispatch } from 'react-redux';
import { getScreams } from '../../redux/actions/scream';
import Colors from '../../constants/Colors';
import ScreamSkeleton from '../../components/Skeletons/ScreamSkeleton';
import Axios from 'axios';
import { Text } from 'react-native-paper';
import store from '../../redux/store';
import CustomBadge from '../../components/UI/CustomBadge';

function ScreamListScreen(props) {
	const { screams, loading } = useSelector((state) => state.scream);
	// useEffect(
	// 	() => {
	// 		props.navigation.setParams({ noOfNotifications: notifications.length });
	// 	},
	// 	[
	// 		notifications
	// 	]
	// );
	const dispatch = useDispatch();
	const [
		error,
		setError
	] = useState(null);
	const [
		isRefreshing,
		setIsRefreshing
	] = useState(false);
	const loadScreams = useCallback(
		async () => {
			setError(null);
			setIsRefreshing(true);
			try {
				await dispatch(getScreams());
				setIsRefreshing(false);
			} catch (err) {
				setError(err.message);
				setIsRefreshing(false);
			}
		},
		[
			dispatch,
			setError
		]
	);
	useEffect(
		() => {
			const unsubscribe = props.navigation.addListener('focus', loadScreams);
			return () => {
				unsubscribe();
			};
		},
		[
			loadScreams
		]
	);
	useEffect(
		() => {
			loadScreams();
		},
		[
			dispatch,
			loadScreams
		]
	);
	if (error) {
		return (
			<View style={styles.centered}>
				<Text style={{ marginBottom: 7 }}>An error occured !</Text>
				<Button title="Try Again" color={Colors.primary} onPress={loadScreams} />
			</View>
		);
	}
	if (loading) {
		return (
			<View>
				<ScreamSkeleton loading={loading} />
				<ScreamSkeleton loading={loading} />
				<ScreamSkeleton loading={loading} />
			</View>
		);
	}
	if (!isRefreshing && screams.length === 0) {
		return (
			<View style={styles.centered}>
				<Text style={{ fontFamily: 'ubuntu' }}>No screams found , Maybe start adding some !! </Text>
			</View>
		);
	}
	return (
		<FlatList
			onRefresh={loadScreams}
			refreshing={isRefreshing}
			keyExtractor={(item) => item._id}
			data={screams}
			renderItem={({ item }) => {
				return <ScreamComponent scream={item} />;
			}}
		/>
	);
}

export default ScreamListScreen;

const styles = StyleSheet.create({
	centered : {
		flex           : 1,
		justifyContent : 'center',
		alignItems     : 'center'
	}
});

export const screenOptions = (navData) => {
	const state = store.getState();
	// console.log('params', navData.route);
	return {
		headerTitle : 'My Social Media',
		headerRight : () => (
			<View>
				<CustomBadge style={{ position: 'absolute', top: -10 }} />
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						title="Notifications"
						iconName={

								Platform.OS === 'android' ? 'md-notifications' :
								'ios-notifications'
						}
						onPress={() => {
							navData.navigation.navigate('Notification');
						}}
					/>
				</HeaderButtons>
			</View>
		),

		headerLeft  : () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Menu"
					iconName={

							Platform.OS === 'android' ? 'md-menu' :
							'ios-menu'
					}
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		)
	};
};
