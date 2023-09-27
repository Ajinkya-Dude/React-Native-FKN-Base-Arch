import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterRequest } from './registerActions';
//import { LoginRequest } from './loginActions';

interface RegisterState {
    loading: boolean;
    data: any;
    error: boolean;
    chaveCreds: string
}
// const defaultProps = {
//   loading: false,
//   data: {},
//   error: false
// };
const initialState: RegisterState = {
    //...defaultProps,
    loading: false,
    data: false,
    error: false,
    chaveCreds: ''
};

const RegisterReucer = createSlice({
    name: "register",
    initialState,
    reducers: {
        setChaveCredentials: (state, action: PayloadAction<any>) => {
            state.chaveCreds = action.payload;
        },
        clearChaveCredentials: (state) => {
            state.chaveCreds = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(RegisterRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            //     state.data = true
        })
            .addCase(RegisterRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                    state.data = action.payload
                console.log("RegisterRequest.fulfilled", action)
            })
            .addCase(RegisterRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("RegisterRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = RegisterReucer.actions;
export const selectUser = (state: any) => state.register;
export default RegisterReucer.reducer;