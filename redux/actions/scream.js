import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.43.250:5000/api';
import { LOADING_DATA, SET_SCREAMS } from '../types';
import { getUserData } from './user';

export const getScreams = () => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	dispatch(getUserData());
	axios
		.get('/scream')
		.then((res) => {
			dispatch({ type: SET_SCREAMS, payload: res.data.screams });
		})
		.catch((err) => {
			console.log('action => ', err.response);
			dispatch({ type: SET_SCREAMS, payload: [] });
		});
};
