import { fromJS } from 'immutable';
import { Dispatch } from 'redux';

// action types
export const types = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
};

const initialState = {
  user: { username: 'xiaolong' },
};

// reducers
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return fromJS(state)
        .setIn(['user', 'username'], action.payload)
        .toJS();
    default:
      return state;
  }
};

export default reducer;

// action creators
export const actions = {
  login: (user: string, pass: string) => async (dispatch: Dispatch) => {
    try {
      // const { data } = await request.post('/login', { user, pass });
      dispatch({ type: types.LOGIN_SUCCESS, user });
    } catch (error) {
      dispatch({ type: types.LOGIN_ERROR, error });
    }
  },
  loadUserData: (uid: string) => async (dispatch: Dispatch) => {
    // try {
    //   dispatch({ type: USERDATA_REQUEST });
    //   const { data } = await request.get(`/users/${uid}`);
    //   dispatch({ type: USERDATA_SUCCESS, data });
    // } catch (error) {
    //   dispatch({ type: USERDATA_ERROR, error });
    // }
  },
};
