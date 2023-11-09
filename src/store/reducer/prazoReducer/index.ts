import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PrazoRequest } from './prazoActions';

interface PrazoState {
    loading: boolean;
    prazoData: any;
    error: boolean;
}
const initialState: PrazoState = {
    loading: false,
    prazoData: false,
    error: false,
};

const PrazoReducer = createSlice({
    name: "prazo",
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
        builder.addCase(PrazoRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("PrazoRequest.pending", action)
            //     state.data = true
        })
            .addCase(PrazoRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                //state.prazoData = action.payload
                console.log("PrazoRequest.fulfilled", action)
            })
            .addCase(PrazoRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("PrazoRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = PrazoReducer.actions;
export const selectUser = (state: any) => state.prazo;
export default PrazoReducer.reducer;