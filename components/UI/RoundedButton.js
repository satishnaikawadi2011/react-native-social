import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';

function RoundedButton(props) {
	const navigation = useNavigation;
	return (
		<TouchableWithoutFeedback
			onPress={props.onPress}
			style={{ width: props.width, justifyContent: 'center', alignItems: 'center', ...props.style }}
		>
			<View style={styles.button}>
				{
					props.loading ? <ActivityIndicator style={styles.btnText} size="small" color={Colors.accent} /> :
					<Text style={styles.btnText}>{props.title}</Text>}
			</View>
		</TouchableWithoutFeedback>
	);
}

export default RoundedButton;

const styles = StyleSheet.create({
	button  : {
		height            : 60,
		width             : '90%',
		borderRadius      : 40,
		backgroundColor   : Colors.primary,
		paddingHorizontal : 10,
		paddingVertical   : 10
	},
	btnText : {
		color         : 'white',
		fontFamily    : 'ubuntu-bold',
		fontSize      : 16,
		textTransform : 'uppercase',
		textAlign     : 'center',
		marginTop     : 7
	}
});
