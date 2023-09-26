import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginRequest } from './loginActions';

// interface LoginState {
//   loginData: any;
//   loading: boolean;
//   data: any;
//   error: boolean;
// }
// const defaultProps = {
//   loading: false,
//   data: {},
//   error: false
// };
// const initialState: LoginState = {
//   ...defaultProps,
//   // loading: false,
//   // data: false,
//   // error: false,
//   loginData: { ...defaultProps }
// };

const LoginReducer = createSlice({
  name: "login",
  initialState:{
    login:{
      data:1
    }
  },
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.login = action.payload;
    },
    clearUser: (state) => {
      state.login = {data:0};
    }
  },
  // extraReducers(builder) {
  //   builder.addCase(LoginRequest.pending, (state, action: PayloadAction<any>) => {
  //     state.loading = true,
  //       state.loginData = true
  //   })
  //     .addCase(LoginRequest.fulfilled, (state, action: PayloadAction<any>) => { })
  //     .addCase(LoginRequest.rejected, (state, action: PayloadAction<any>) => { })
  // },
});

export const { } = LoginReducer.actions;
export const selectUser = (state: any) => state.login;
export default LoginReducer.reducer;