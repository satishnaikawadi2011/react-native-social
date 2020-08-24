import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Avatar, Paragraph, Divider } from 'react-native-paper';
import moment from 'moment';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

function Notification(props) {
	const navigation = useNavigation();
	const { sender, createdAt, screamId, senderImage, read, type } = props.notification;
	// console.log(createdAt, 'l');
	const description =

			type === 'like' ? `${sender} has liked your scream .` :
			`${sender} has commented on your scream.`;
	const time = `${moment(createdAt).fromNow(true)} ago`;
	return (
		<View>
			<List.Item
				onPress={() => {
					navigation.navigate('ScreamDetail', { screamId });
				}}
				titleStyle={{ fontFamily: 'ubuntu-bold' }}
				title={

						type == 'like' ? 'Like' :
						'Comment'
				}
				description={(props) => <Description desc={description} time={time} />}
				left={(props) => <Avatar.Image style={styles.left} {...props} source={{ uri: senderImage }} />}
				right={(props) => (
					<List.Icon
						icon={

								type == 'like' ? 'heart' :
								'comment-processing'
						}
						{...props}
						color={Colors.primary}
					/>
				)}
			/>
			<Divider />
		</View>
	);
}

export default Notification;

const styles = StyleSheet.create({
	left : {
		paddingTop : 15
	}
});

const Description = (props) => {
	return (
		<View>
			<Paragraph style={{ fontFamily: 'ubuntu' }}>{props.desc}</Paragraph>
			<Paragraph style={{ fontFamily: 'ubuntu', color: 'grey' }}>{props.time}</Paragraph>
		</View>
	);
};
