import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParameterRequest } from './parameterActions';

interface ParameterState {
    loading: boolean;
    parametroData: any;
    error: boolean;
}
const initialState: ParameterState = {
    loading: false,
    parametroData: false,
    error: false,
};

const ParameterReducer = createSlice({
    name: "parametro",
    initialState,
    reducers: {
        setChaveCredentials: (state, action: PayloadAction<any>) => {
            // state.chaveCreds = action.payload;
        },
        clearChaveCredentials: (state) => {
            // state.chaveCreds = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(ParameterRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("ParameterRequest.pending", action)
            //     state.data = true
        })
            .addCase(ParameterRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.parametroData = action.payload
                console.log("ParameterRequest.fulfilled", action)
            })
            .addCase(ParameterRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("ParameterRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = ParameterReducer.actions;
export const selectUser = (state: any) => state.parametro;
export default ParameterReducer.reducer;