import { SET_USER  , SET_CLIENT , GET_CLIENT} from '../contants/action-types';
  
  const initialState = [

  ]
  
  export default function user(state = initialState, action) {
    switch (action.type) {
      case SET_USER:
        return { ...state, user: action.payload };
      case SET_CLIENT:
        return { ...state, client: action.payload };
      case GET_CLIENT:
        return { ...state, client: action.payload };
      default:
        return state
    }
  };
  