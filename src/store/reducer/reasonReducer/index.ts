import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReasonRequest } from './ReasonActions';

interface ReasonState {
    loading: boolean;
    reasonData: any;
    error: boolean;
}
const initialState: ReasonState = {
    loading: false,
    reasonData: false,
    error: false,
};

const ReasonReducer = createSlice({
    name: "reason",
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
        builder.addCase(ReasonRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("ReasonRequest.pending", action)
            //     state.data = true
        })
            .addCase(ReasonRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.reasonData = action.payload
                console.log("ReasonRequest.fulfilled", action)
            })
            .addCase(ReasonRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("ReasonRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = ReasonReducer.actions;
export const selectUser = (state: any) => state.reason;
export default ReasonReducer.reducer;