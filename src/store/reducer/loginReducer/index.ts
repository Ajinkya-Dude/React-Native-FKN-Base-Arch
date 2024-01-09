import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginRequest, VerifyRequest } from './loginActions';

interface LoginState {
  loading: boolean;
  data: any;
  error: boolean;
  verifyData: any;
  deviceName: string;
  isLoggedIn:boolean;
  userCreds:any;
  firstSync: boolean;
}
// const defaultProps = {
//   loading: false,
//   data: {},
//   error: false
// };
const initialState: LoginState = {
  loading: false,
  data: false,
  error: false,
  verifyData: false,
  deviceName: '',
  isLoggedIn:false,
  userCreds:false,
  firstSync: false,
};

const LoginReducer = createSlice({
  name: "login",
  initialState,
  reducers: {

  },
  extraReducers(builder) {
  },
});

export const {} = LoginReducer.actions;
export const selectUser = (state: any) => state.login;
export default LoginReducer.reducer;