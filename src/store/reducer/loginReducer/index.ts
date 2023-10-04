import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginRequest, VerifyRequest } from './loginActions';

interface LoginState {
  loading: boolean;
  data: any;
  error: boolean;
  verifyData: any;
  deviceName: string;
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
  deviceName: ''
};

const LoginReducer = createSlice({
  name: "login",
  initialState,
  reducers: {
    setDeviceNameEnter: (state, action: PayloadAction<any>) => {
      state.deviceName = action.payload;
    },
    clearDeviceName: (state) => {
      state.deviceName = '';
    }
  },
  extraReducers(builder) {
    builder.addCase(LoginRequest.pending, (state, action: PayloadAction<any>) => {
      state.loading = true
    })
      .addCase(LoginRequest.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false,
          state.data = action.payload
      })
      .addCase(LoginRequest.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
      })
      .addCase(VerifyRequest.pending, (state, action: PayloadAction<any>) => {
        state.loading = true
      })
      .addCase(VerifyRequest.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false,
          state.verifyData = action.payload
      })
      .addCase(VerifyRequest.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
      })
  },
});

export const { setDeviceNameEnter,clearDeviceName} = LoginReducer.actions;
export const selectUser = (state: any) => state.login;
export default LoginReducer.reducer;