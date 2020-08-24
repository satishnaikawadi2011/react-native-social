import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Alert, ScrollView } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { Formik } from 'formik';
import RoundedButton from '../../components/UI/RoundedButton';
import { LinearGradient } from 'expo-linear-gradient';
import * as Yup from 'yup';
import { loginUser } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ERRORS } from '../../redux/types';

function LoginScreen(props) {
	const navigation = props.navigation;
	const dispatch = useDispatch();
	const { loading, errors } = useSelector((state) => state.UI);
	// const user = useSelector((state) => state.user);
	const initialValues = {
		email    : '',
		password : ''
	};
	const authSchema = Yup.object({
		email    : Yup.string().required().email(),
		password : Yup.string().required().min(6)
	});
	const submitHandler = async (values, actions) => {
		try {
			await dispatch(loginUser(values));
		} catch (err) {
			console.log(errors);
			console.log(err);
		}
		actions.resetForm();
	};
	if (errors) {
		Alert.alert('An Error Occured', errors.error);
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
									title="sign in"
									onPress={

											!loading ? props.handleSubmit :
											() => {}
									}
								/>
								<RoundedButton
									width={Dimensions.get('window').width * 0.9}
									style={styles.btn}
									title="Register here"
									onPress={() => {

											!loading ? navigation.navigate('Signup') :
											null;
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

export default LoginScreen;

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
