import axios from 'axios';
import { AsyncStorage } from 'react-native';
import JwtDecode from 'jwt-decode';
export const AUTHENTICATE = 'AUTHENTICATE';

let timer;

import {
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	STOP_LOADING_UI,
	LOADING_USER,
	SET_USER,
	TOGGLE_THEME,
	SET_USER_SCREAMS,
	SET_USER_DETAILS,
	LOGIN,
	SIGNUP,
	LOGOUT,
	SET_DID_TRY_AL
} from '../types';
axios.defaults.baseURL = 'http://192.168.43.250:5000/api';

export const toggleTheme = () => (dispatch) => {
	dispatch({ type: TOGGLE_THEME });
};

export const getUserDetails = () => async (dispatch) => {
	try {
		dispatch({ type: LOADING_UI });
		const res = await axios.get('/user/details');
		dispatch({ type: SET_USER_SCREAMS, payload: res.data.userData.screams });
		dispatch({ type: SET_USER_DETAILS, payload: res.data.userData.user.userDetails });
		dispatch({ type: STOP_LOADING_UI });
	} catch (err) {
		console.log(err);
	}
};

export const authenticate = (token, expiryTime) => {
	return (dispatch) => {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		dispatch(setLogoutTimer(expiryTime));
		dispatch({ type: getUserData() });
		dispatch({ type: AUTHENTICATE, payload: token });
	};
};

export const signupUser = (newUserData) => {
	return async (dispatch) => {
		try {
			dispatch({ type: CLEAR_ERRORS });
			dispatch({ type: LOADING_UI });
			const res = await axios.post('/user/signup', newUserData);
			const token = res.data.token;
			dispatch({ type: SIGNUP, payload: token });
			const decodedToken = JwtDecode(token);
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			dispatch({ type: AUTHENTICATE });
			dispatch(getUserData());
			dispatch(authenticate(token, parseInt(decodedToken.exp) * 1000));
			const expirationDate = new Date(new Date().getTime() + parseInt(decodedToken.exp) * 1000);
			saveDataToStorage(token, expirationDate);
			dispatch({ type: CLEAR_ERRORS });
		} catch (err) {
			dispatch({
				type    : SET_ERRORS,
				payload : err.response.data.errors
			});
		}
	};
};

export const loginUser = (userData) => {
	return async (dispatch) => {
		try {
			dispatch({ type: CLEAR_ERRORS });
			dispatch({ type: LOADING_UI });
			const res = await axios.post('/user/login', userData);
			dispatch({ type: STOP_LOADING_UI });
			const token = res.data.token;
			const decodedToken = JwtDecode(token);
			dispatch({ type: LOGIN, payload: token });
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			dispatch({ type: AUTHENTICATE });
			dispatch(getUserData());
			dispatch(authenticate(token, parseInt(decodedToken.exp) * 1000));
			const expirationDate = new Date(parseInt(decodedToken.exp) * 1000 + decodedToken.addTime * 1000);
			// console.log(new Date.now());
			// console.log(new Date());
			// console.log('expiry ', expirationDate);
			saveDataToStorage(token, expirationDate);
			dispatch({ type: CLEAR_ERRORS });
		} catch (err) {
			dispatch({
				type    : SET_ERRORS,
				payload : { error: err.response.data.message } || { error: 'An unknown error occured !' }
			});
		}
	};
};

export const getUserData = () => async (dispatch) => {
	try {
		dispatch({ type: LOADING_USER });
		const res = await axios.get('/user/data');
		dispatch({ type: SET_USER, payload: res.data.userData });
	} catch (err) {
		console.log(err);
		// console.log('====================================');
		// console.log('No');
		// console.log('====================================');
	}
};

export const setDidTryAL = () => {
	return { type: SET_DID_TRY_AL };
};

export const logoutUser = () => {
	clearLogoutTimer();
	AsyncStorage.removeItem('userData');
	return { type: LOGOUT };
};

const clearLogoutTimer = () => {
	if (timer) {
		clearTimeout(timer);
	}
};

const setLogoutTimer = (expirationTime) => {
	return (dispatch) => {
		timer = setTimeout(() => {
			dispatch(logout());
		}, expirationTime);
	};
};

const saveDataToStorage = (token, expirationDate) => {
	AsyncStorage.setItem(
		'userData',
		JSON.stringify({
			token      : token,
			expiryDate : expirationDate.toISOString()
		})
	);
};
