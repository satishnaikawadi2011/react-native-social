import {
	SET_USER,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	LOADING_USER,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
	MARK_NOTIFICATIONS_READ,
	TOGGLE_THEME,
	SET_USER_DETAILS,
	SET_USER_SCREAMS,
	LOGIN,
	SIGNUP,
	LOGOUT,
	SET_DID_TRY_AL
} from '../types';
import { AUTHENTICATE } from '../actions/user';

const initialState = {
	credentials     : {},
	likes           : [],
	loading         : false,
	notifications   : [],
	isDarkTheme     : false,
	screams         : [],
	userDetails     : {},
	token           : null,
	didTryAutoLogin : false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case AUTHENTICATE:
			return { ...state, token: action.payload };
		case LOGIN:
			return {
				...state,
				token           : action.payload,
				didTryAutoLogin : true
			};
		case SIGNUP:
			return {
				...state,
				token : action.payload
			};
		case LOGOUT:
			return {
				...initialState,
				didTryAutoLogin : true
			};
		case SET_DID_TRY_AL:
			return {
				...state,
				didTryAutoLogin : true
			};
		case SET_USER:
			return { ...state, ...action.payload, loading: false };
		case LOADING_USER:
			return { ...state, loading: true };
		case SET_USER_DETAILS:
			return {
				...state,
				userDetails : action.payload
			};

		case SET_USER_SCREAMS:
			return {
				...state,
				screams : action.payload
			};
		case LIKE_SCREAM:
			return {
				...state,
				likes : [
					...state.likes,
					{
						userHandle : state.credentials.user,
						screamId   : action.payload.screamId
					}
				]
			};
		case UNLIKE_SCREAM:
			return {
				...state,
				likes : state.likes.filter((like) => like.screamId !== action.payload.screamId)
			};
		case MARK_NOTIFICATIONS_READ:
			state.notifications.forEach((not) => (not.read = true));
			return {
				...state
			};
		case TOGGLE_THEME:
			return {
				...state,
				isDarkTheme : !state.isDarkTheme
			};
		default:
			return state;
	}
}
