import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AbasRequest } from './adasActions';

interface AbasState {
    loading: boolean;
    abasData: any;
    error: boolean;
}
const initialState: AbasState = {
    loading: false,
    abasData: false,
    error: false,
};

const AbasReducer = createSlice({
    name: "abas",
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
        builder.addCase(AbasRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            //     state.data = true
        })
            .addCase(AbasRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.abasData = action.payload
                console.log("AbasRequest.fulfilled", action)
            })
            .addCase(AbasRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("AbasRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = AbasReducer.actions;
export const selectUser = (state: any) => state.abas;
export default AbasReducer.reducer;