import React, { useState, useEffect } from 'react';
import { Card, Paragraph, IconButton, Avatar } from 'react-native-paper';
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

function Scream(props) {
	const navigation = useNavigation();
	const currentValue = new Animated.Value(1);
	const { scream } = props;
	// console.log(scream.createdAt);
	const LeftContent = (props2) => <Avatar.Image source={{ uri: scream.userImage }} {...props2} />;
	const [
		isLiked,
		setIsLiked
	] = useState(false);
	const [
		isVisible,
		setIsVisible
	] = useState(false);
	const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);
	useEffect(
		() => {
			if (isLiked) {
				Animated.spring(currentValue, {
					toValue         : 2,
					friction        : 2,
					useNativeDriver : false
				}).start(() => {
					Animated.spring(currentValue, {
						toValue         : 1,
						useNativeDriver : false
					}).start(() => {
						setIsVisible(false);
					});
				});
			}
		},
		[
			isLiked
		]
	);
	return (
		<View style={{ flex: 1 }}>
			{isVisible && (
				<AnimatedIcon
					name="heart"
					color={Colors.accent}
					size={40}
					style={{
						...styles.animatedIcon,
						transform : [
							{ scale: currentValue }
						]
					}}
				/>
			)}
			<Card style={styles.card}>
				<TouchableWithoutFeedback
					onPress={() => {
						navigation.navigate('ScreamDetail', { screamId: scream._id });
					}}
				>
					<View>
						<Card.Title
							titleStyle={{
								fontFamily       : 'ubuntu-bold',
								fontSize         : 22,
								color            : Colors.primary,
								marginHorizontal : 20
							}}
							subtitleStyle={{
								marginHorizontal : 20
							}}
							title={`@${scream.username}`}
							subtitle={`${moment(scream.createdAt).fromNow(true)} ago`}
							left={() => <LeftContent size={60} />}
						/>
						<Card.Content>
							<Paragraph style={styles.body}>{scream.body}</Paragraph>
						</Card.Content>
					</View>
				</TouchableWithoutFeedback>
				<Card.Actions style={{ alignItems: 'center', justifyContent: 'space-between' }}>
					<View style={{ flexDirection: 'row' }}>
						<IconButton
							color={Colors.accent}
							icon={

									isLiked ? 'heart' :
									'heart-outline'
							}
							size={40}
							onPress={() => {
								if (!isLiked) {
									setIsVisible(true);
								}
								setIsLiked((prevState) => !prevState);
							}}
						/>
						<Text
							style={{ fontSize: 17, marginTop: 20, fontFamily: 'ubuntu' }}
						>{`${scream.likeCount} likes`}</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<IconButton icon="comment-processing" size={40} color={Colors.accent} />
						<Text
							style={{ fontSize: 17, marginTop: 20, marginRight: 10, fontFamily: 'ubuntu' }}
						>{`${scream.commentCount} comments`}</Text>
					</View>
				</Card.Actions>
			</Card>
		</View>
	);
}

export default Scream;

const styles = StyleSheet.create({
	body         : {
		fontFamily        : 'ubuntu',
		fontSize          : 17,
		paddingHorizontal : 10,
		marginTop         : 10
	},
	card         : {
		marginHorizontal : 15,
		marginVertical   : 10,
		fontFamily       : 'ubuntu',
		padding          : 10
	},
	animatedIcon : {
		position  : 'absolute',
		top       : 70,
		left      : '45%',
		elevation : 4,
		zIndex    : 3
	}
});
