import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert, AsyncStorage, SafeAreaView, ScrollView } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { Formik } from 'formik';
import RoundedButton from '../../components/UI/RoundedButton';
import { LinearGradient } from 'expo-linear-gradient';
import * as Yup from 'yup';
import { loginUser, signupUser } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ERRORS } from '../../redux/types';

function SignupScreen(props) {
	const navigation = props.navigation;
	const dispatch = useDispatch();
	const { loading, errors } = useSelector((state) => state.UI);

	// const user = useSelector((state) => state.user);
	const initialValues = {
		email    : '',
		password : '',
		username : ''
	};
	const authSchema = Yup.object({
		email    : Yup.string().required().email(),
		username : Yup.string().required(),
		password : Yup.string().required().min(6)
	});
	const submitHandler = async (values, actions) => {
		try {
			await dispatch(signupUser(values));
			// const userData = await AsyncStorage.getItem('token');
			// console.log(JSON.parse(userData).token);
		} catch (err) {
			// console.log(errors);
			console.log(err);
		}
		actions.resetForm();
	};
	if (errors) {
		// console.log(errors);
		Alert.alert(
			'An Error Occured',

				errors[Object.keys(errors)[2]] ? errors[Object.keys(errors)[2]] :
				errors[Object.keys(errors)[0]]
		);
		dispatch({ type: CLEAR_ERRORS });
	}
	return (
		<View style={styles.container}>
			<LinearGradient
				style={styles.gradient}
				colors={[
					'hsla(197, 100%, 64%, 1)',
					'hsla(339, 100%, 55%, 1)'
				]}
				start={[
					0,
					0
				]}
			>
				<Formik validationSchema={authSchema} initialValues={initialValues} onSubmit={submitHandler}>
					{(props) => (
						<View style={styles.form}>
							<ScrollView>
								{/* {console.log(props.errors)} */}
								<TextInput
									style={styles.input}
									label="Email"
									left={<TextInput.Icon name="email" />}
									value={props.values.email}
									keyboardType="email-address"
									onChangeText={props.handleChange('email')}
									placeholder="Enter your email ..."
									onBlur={props.handleBlur('email')}
									underlineColor={Colors.primary}
									selectionColor={Colors.primary}
									error={

											props.touched.email && props.errors.email ? true :
											false
									}
								/>
								{props.errors.email &&
								props.touched.email && (
									<HelperText
										style={{ textAlign: 'center' }}
										type="error"
										visible={

												props.touched.email && props.errors.email ? true :
												false
										}
									>
										{props.errors.email}
									</HelperText>
								)}
								<TextInput
									style={styles.input}
									label="Username"
									value={props.values.username}
									left={<TextInput.Icon name="account" />}
									onChangeText={props.handleChange('username')}
									placeholder="Enter your username ..."
									onBlur={props.handleBlur('username')}
									underlineColor={Colors.primary}
									selectionColor={Colors.primary}
									error={

											props.touched.username && props.errors.username ? true :
											false
									}
								/>
								{props.errors.username &&
								props.touched.username && (
									<HelperText
										style={{ textAlign: 'center' }}
										type="error"
										visible={

												props.touched.username && props.errors.username ? true :
												false
										}
									>
										{props.errors.username}
									</HelperText>
								)}
								<TextInput
									style={styles.input}
									label="Password"
									value={props.values.password}
									secureTextEntry
									left={<TextInput.Icon name="key-variant" />}
									onChangeText={props.handleChange('password')}
									placeholder="Enter your password ..."
									onBlur={props.handleBlur('password')}
									underlineColor={Colors.primary}
									selectionColor={Colors.primary}
									error={

											props.touched.password && props.errors.password ? true :
											false
									}
								/>
								{props.errors.password &&
								props.touched.password && (
									<HelperText
										style={{ textAlign: 'center' }}
										type="info"
										visible={

												props.touched.password && props.errors.password ? true :
												false
										}
									>
										{props.errors.password}
									</HelperText>
								)}
								<RoundedButton
									width={Dimensions.get('window').width * 0.9}
									style={styles.btn}
									loading={loading}
									title="sign up"
									onPress={

											!loading ? props.handleSubmit :
											() => {}
									}
								/>
								<RoundedButton
									width={Dimensions.get('window').width * 0.9}
									style={styles.btn}
									title="tap here to log in"
									onPress={() => {
										navigation.navigate('Login');
									}}
								/>
							</ScrollView>
						</View>
					)}
				</Formik>
			</LinearGradient>
		</View>
	);
}

export default SignupScreen;

const styles = StyleSheet.create({
	container : {
		flex : 1
	},
	gradient  : {
		flex           : 1,
		justifyContent : 'center',
		alignItems     : 'center'
	},
	input     : {
		width          : '90%',
		height         : 60,
		marginVertical : 10,
		marginLeft     : 20
	},
	form      : {
		width     : '90%',
		maxHeight : 500,
		maxWidth  : 400
	},
	btn       : {
		marginTop : 20
	}
});
