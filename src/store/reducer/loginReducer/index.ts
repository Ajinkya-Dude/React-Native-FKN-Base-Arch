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
    setDeviceNameEnter: (state, action: PayloadAction<any>) => {
      state.deviceName = action.payload;
    },
    clearDeviceName: (state) => {
      state.deviceName = '';
    },
    setUserCredentials: (state, action: PayloadAction<any>) => {
      state.userCreds = action.payload;
    },
    clearUserCredentials: (state) => {
      state.userCreds = false;
    },
    clearLoginData:(state) =>{
      state.data=false;
    },
    clearVerifyData:(state)=>{
      state.verifyData=false;
    },
    setUserIsLoggedIn: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true;
    },
    setUserIsLoggedOut: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = false;
    },
    setUserFirstSync:(state,action: PayloadAction<any>) =>{
      state.firstSync = action.payload
  }
  },
  extraReducers(builder) {
    builder.addCase(LoginRequest.pending, (state, action: PayloadAction<any>) => {
      state.loading = true
      state.firstSync = false;
    })
      .addCase(LoginRequest.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false,
          state.data = action.payload,
          state.firstSync = true
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

export const { setDeviceNameEnter,clearDeviceName,clearLoginData,clearVerifyData,setUserIsLoggedIn,setUserIsLoggedOut,setUserCredentials,clearUserCredentials,setUserFirstSync} = LoginReducer.actions;
export const selectUser = (state: any) => state.login;
export default LoginReducer.reducer;