import axios from 'axios';
import { AsyncStorage } from 'react-native';
import {
	SET_ERRORS,
	CLEAR_ERRORS,
	SET_AUTHENTICATED,
	LOADING_UI,
	STOP_LOADING_UI,
	LOADING_USER,
	SET_USER,
	SET_UNAUTHENTICATED
} from '../types';
// http://192.168.43.250:5000/api
axios.defaults.baseURL = 'http://192.168.43.250:5000/api';
export const loginUser = (userData) => async (dispatch) => {
	try {
		dispatch({ type: CLEAR_ERRORS });
		dispatch({ type: LOADING_UI });
		const res = await axios.post('/user/login', userData);
		dispatch({ type: STOP_LOADING_UI });
		const token = `Bearer ${res.data.token}`;
		AsyncStorage.setItem('token', JSON.stringify({ token }));
		axios.defaults.headers.common['Authorization'] = token;
		dispatch({ type: SET_AUTHENTICATED });
		dispatch(getUserData());
		dispatch({ type: CLEAR_ERRORS });
	} catch (err) {
		dispatch({
			type    : SET_ERRORS,
			payload : { error: err.response.data.message } || { error: 'An unknown error occured !' }
		});
	}
};

export const getUserData = () => async (dispatch) => {
	const data = await AsyncStorage.getItem('token');
	const transformedToken = JSON.parse(data).token;
	axios.defaults.headers.common['Authorization'] = transformedToken;
	try {
		dispatch({ type: LOADING_USER });
		const res = await axios.get('/user/data');
		dispatch({ type: SET_USER, payload: res.data.userData });
	} catch (err) {
		console.log(err);
	}
};

export const signupUser = (newUserData) => async (dispatch) => {
	try {
		dispatch({ type: CLEAR_ERRORS });
		dispatch({ type: LOADING_UI });
		const res = await axios.post('/user/signup', newUserData);
		const token = `Bearer ${res.data.token}`;
		AsyncStorage.setItem('token', JSON.stringify({ token }));
		axios.defaults.headers.common['Authorization'] = token;
		dispatch({ type: SET_AUTHENTICATED });
		dispatch(getUserData());
		dispatch({ type: CLEAR_ERRORS });
		// history.push('/');
	} catch (err) {
		dispatch({
			type    : SET_ERRORS,
			payload : err.response.data.errors
		});
	}
};

export const logoutUser = () => (dispatch) => {
	AsyncStorage.removeItem('token');
	delete axios.defaults.headers.common['Authorization'];
	dispatch({ type: SET_UNAUTHENTICATED });
};
