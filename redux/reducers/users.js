import {
	SET_USER,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	LOADING_USER,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
	MARK_NOTIFICATIONS_READ
} from '../types';

const initialState = {
	authenticated : false,
	credentials   : {},
	likes         : [],
	loading       : false,
	notifications : []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_UNAUTHENTICATED:
			return initialState;
		case SET_AUTHENTICATED:
			return { ...state, authenticated: true };
		case SET_USER:
			return { ...state, ...action.payload, loading: false };
		case LOADING_USER:
			return { ...state, loading: true };
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
		default:
			return state;
	}
}
