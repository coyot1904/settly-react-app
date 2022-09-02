import { SET_USER  , SET_CLIENT} from '../contants/action-types';
  
  const initialState = [

  ]
  
  export default function user(state = initialState, action) {
    switch (action.type) {
      case SET_USER:
        return { ...state, user: action.payload };
      case SET_CLIENT:
        return { ...state, client: action.payload };
      default:
        return state
    }
  };
  