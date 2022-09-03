import { SET_USER , SET_CLIENT } from '../contants/action-types';
import axios from "axios";
import Cookies from "js-cookie";

export const setUser = (user) => {
    return {
        type : SET_USER,
        payload : user
    };
};

export const setClient = (client) => {
    return {
        type : SET_CLIENT,
        payload : client
    };
};

export const getClient = (offset) => {
    return async (dispatch) => {
        await axios
          .get(process.env.REACT_APP_BASE_URL+"clinet/list?page="+offset, {
            headers: { 
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
            }   
          })
          .then((response) => {
            dispatch({
                type: SET_CLIENT,
                payload: response.data
            });
          });
      };
};


