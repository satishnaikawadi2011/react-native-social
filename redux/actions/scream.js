import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.43.250:5000/api/scream';
import { LOADING_DATA, SET_SCREAMS } from '../types';

export const getScreams = () => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get('/')
		.then((res) => {
			dispatch({ type: SET_SCREAMS, payload: res.data.screams });
		})
		.catch((err) => {
			console.log(err);
			dispatch({ type: SET_SCREAMS, payload: [] });
		});
};
