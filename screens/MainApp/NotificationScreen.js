import React from 'react';
import { View, FlatList } from 'react-native';
import Notification from '../../components/MainApp/Notification';
import { useSelector } from 'react-redux';

function NotificationScreen(props) {
	const { notifications } = useSelector((state) => state.user);
	const notification = {
		read        : false,
		createdAt   : new Date('2020-08-22T15:34:44.297Z'),
		type        : 'comment',
		sender      : 'mahi',
		senderImage : 'http://res.cloudinary.com/dg2zkumuc/image/upload/v1598113928/a4j3jmllyzccfxbbfj0w.jpg'
	};
	return (
		<FlatList
			data={notifications}
			keyExtractor={(item) => item._id}
			renderItem={({ item }) => {
				return <Notification notification={item} />;
			}}
		/>
	);
}
export default NotificationScreen;

export const screenOptions = (navData) => {
	return {
		headerTitle : 'Notifications'
	};
};
// "_id" : ObjectId("5f413b670cf62c0dc80d70fd"),
// "read" : false,
// "createdAt" : ISODate("2020-08-22T15:34:44.297Z"),
// "type" : "comment",
// "screamId" : ObjectId("5f41368c3b9d8449507b86e4"),
// "sender" : "mahi",
// "recipient" : "saty",
// "senderImage" : "http://res.cloudinary.com/dg2zkumuc/image/upload/v1598113928/a4j3jmllyzccfxbbfj0w.jpg"
