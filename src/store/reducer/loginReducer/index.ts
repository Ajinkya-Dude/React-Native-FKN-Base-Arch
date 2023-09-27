import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginRequest } from './loginActions';

interface LoginState {
  loading: boolean;
  data: any;
  error: boolean;
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
};

const LoginReducer = createSlice({
  name: "login",
  initialState,
  reducers: {
    // setUser: (state, action: PayloadAction<any>) => {
    //   state.login = action.payload;
    // },
    // clearUser: (state) => {
    //   state.login = {data:0};
    // }
  },
  extraReducers(builder) {
    builder.addCase(LoginRequest.pending, (state, action: PayloadAction<any>) => {
      state.loading = true
    })
      .addCase(LoginRequest.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
      })
      .addCase(LoginRequest.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
      })
  },
});

export const { } = LoginReducer.actions;
export const selectUser = (state: any) => state.login;
export default LoginReducer.reducer;