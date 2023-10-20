import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterRequest } from './registerActions';
//import { LoginRequest } from './loginActions';

interface RegisterState {
    loading: boolean;
    data: any;
    error: boolean;
    chaveCreds: string,
    firstSync: boolean
}

const initialState: RegisterState = {
    //...defaultProps,
    loading: false,
    data: false,
    error: false,
    chaveCreds: '',
    firstSync: false,
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
        },
        setUserFirstSync:(state,action: PayloadAction<any>) =>{
            state.firstSync = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(RegisterRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.firstSync = false;
            //     state.data = true
        })
            .addCase(RegisterRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                    state.data = action.payload,
                    state.firstSync = true;
                console.log("RegisterRequest.fulfilled", action)
            })
            .addCase(RegisterRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("RegisterRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials,setUserFirstSync } = RegisterReucer.actions;
export const selectUser = (state: any) => state.register;
export default RegisterReucer.reducer;