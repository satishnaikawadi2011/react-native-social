import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { Text, Avatar, Title, Paragraph, IconButton, Caption } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../redux/store';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';
import { getUserDetails } from '../../redux/actions/user';
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';

const CustomIcon = (props) => {
	return <IconButton icon={props.name} color={Colors.primary} size={30} />;
};
function ProfileScreen(props) {
	const { credentials, screams, userDetails } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUserDetails());
	}, []);
	return (
		<View style={{ flex: 1 }}>
			<Image style={styles.container} source={{ uri: credentials.userImage }} resizeMode="cover" />
			<Avatar.Image style={styles.avatar} source={{ uri: credentials.userImage }} size={100} />
			<View>
				<View>
					<Title style={styles.title}>Profile</Title>
					<View style={styles.item}>
						<CustomIcon name="email" />
						<Paragraph style={styles.para}>{credentials.email}</Paragraph>
					</View>
					<View style={styles.item}>
						<CustomIcon name="calendar-range" />
						<Paragraph style={styles.para}>{`Joined on ${moment(credentials.createdAt).format(
							'DD MMM YYYY'
						)}`}</Paragraph>
					</View>
					<Title style={styles.title}>User Details</Title>
					<Caption style={{ textAlign: 'center' }}>{'(Editable)'}</Caption>
					{/* <View> */}
					<ScrollView style={styles.scrollview} contentContainerStyle={styles.contentContainer}>
						<View style={styles.item}>
							<CustomIcon name="phone" />
							<Paragraph style={styles.para}>
								{
									userDetails.mobile ? userDetails.mobile :
									'Not mentioned yet !'}
							</Paragraph>
						</View>
						<View style={styles.item}>
							<CustomIcon name="web" />
							<Paragraph style={styles.para}>
								{
									userDetails.website ? userDetails.website :
									'Not mentioned yet !'}
							</Paragraph>
						</View>
						<View style={styles.item}>
							<CustomIcon name="account-box" />
							<Paragraph style={styles.para}>
								{
									userDetails.bio ? userDetails.bio :
									'Not mentioned yet !'}
							</Paragraph>
						</View>
						<View style={styles.item}>
							<CustomIcon name="map-marker" />
							<Paragraph style={styles.para}>
								{
									userDetails.location ? userDetails.location :
									'Not mentioned yet !'}
							</Paragraph>
						</View>
						<View style={styles.item}>
							<FontAwesome
								name="transgender-alt"
								size={30}
								style={{ marginLeft: 15 }}
								color={Colors.primary}
							/>
							<Paragraph style={{ ...styles.para, marginLeft: 10 }}>
								{
									userDetails.gender ? userDetails.gender :
									'Not mentioned yet !'}
							</Paragraph>
						</View>
						{/* </View> */}
					</ScrollView>
				</View>
			</View>
		</View>
	);
}

export default ProfileScreen;

export const screenOptions = (navData) => {
	const { credentials } = store.getState().user;
	return {
		headerTitle : credentials.username,
		headerRight : () => (
			<View style={{ flexDirection: 'row' }}>
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						title="Image"
						iconName={

								Platform.OS === 'android' ? 'md-camera' :
								'ios-camera'
						}
						onPress={() => {
							// navData.navigation.navigate('Notification');
						}}
					/>
				</HeaderButtons>
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						title="Edit"
						iconName={

								Platform.OS === 'android' ? 'md-add' :
								'ios-add'
						}
						onPress={() => {
							// navData.navigation.navigate('Notification');
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

const styles = StyleSheet.create({
	container        : {
		// flex            : 1,
		justifyContent          : 'center',
		alignSelf               : 'center',
		height                  : 200,
		width                   : Dimensions.get('window').width,
		backgroundColor         : Colors.primary,
		borderBottomLeftRadius  : 100,
		borderBottomRightRadius : 100,
		opacity                 : 0.5
	},
	item             : { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' },
	avatar           : {
		position : 'absolute',
		top      : 130,
		left     : Dimensions.get('window').width * 0.38
	},
	contentContainer : {
		justifyContent : 'center',
		alignItems     : 'center',
		paddingBottom  : 50
		// height         : '100%'
	},
	scrollview       : {
		borderColor  : 'black',
		borderRadius : 5,
		borderWidth  : 5,
		width        : Dimensions.get('window').width * 0.8,
		padding      : 20,
		// margin       : 20,
		alignSelf    : 'center',
		height       : Dimensions.get('window').height - 550
	},
	para             : {
		fontFamily : 'ubuntu',
		color      : '#737373'
	},
	title            : { marginTop: 40, fontFamily: 'ubuntu-bold', textAlign: 'center' }
});

// <View>
// <View>
// 	<Title style={styles.title}>Profile</Title>
// </View>
// <View style={styles.row}>
// 	<CustomIcon name="email" />
// 	<Paragraph style={styles.para}>{credentials.email}</Paragraph>
// </View>
// <View style={styles.row}>
// 	<CustomIcon name="calendar-range" />
// 	<Paragraph style={styles.para}>{`Joined on ${moment(credentials.createdAt).format(
// 		'DD MMM YYYY'
// 	)}`}</Paragraph>
// </View>
// <View>
// 	<Title style={styles.title}>User Details</Title>
// 	<Caption style={{ textAlign: 'center' }}>{'(Editable)'}</Caption>
// </View>
// <ScrollView>
// 	<View
// 		style={{
// 			flex        : 1,
// 			height      : Dimensions.get('window').height,
// 			borderWidth : 2,
// 			borderColor : 'black'
// 		}}
// 	>

// </ScrollView>
// </View>
