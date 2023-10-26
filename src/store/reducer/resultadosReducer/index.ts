import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResultRequest } from './resultActions';

interface ResultState {
    loading: boolean;
    resultData: any;
    error: boolean;
}
const initialState: ResultState = {
    loading: false,
    resultData: false,
    error: false,
};

const ResultReducer = createSlice({
    name: "result",
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
        builder.addCase(ResultRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("ResultRequest.pending", action)
            //     state.data = true
        })
            .addCase(ResultRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.resultData = action.payload
                console.log("ResultRequest.fulfilled", action)
            })
            .addCase(ResultRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("ResultRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = ResultReducer.actions;
export const selectUser = (state: any) => state.result;
export default ResultReducer.reducer;