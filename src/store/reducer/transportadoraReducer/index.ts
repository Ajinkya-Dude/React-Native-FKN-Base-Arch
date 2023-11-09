import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransportadoraRequest } from './transportadoraActions';

interface TransportState {
    loading: boolean;
    transportData: any;
    error: boolean;
}
const initialState: TransportState = {
    loading: false,
    transportData: false,
    error: false,
};

const TrannsportReducer = createSlice({
    name: "transport",
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
        builder.addCase(TransportadoraRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("TransportadoraRequest.pending", action)
            //     state.data = true
        })
            .addCase(TransportadoraRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                //state.transportData = action.payload
                console.log("TransportadoraRequest.fulfilled", action)
            })
            .addCase(TransportadoraRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("TransportadoraRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = TrannsportReducer.actions;
export const selectUser = (state: any) => state.transport;
export default TrannsportReducer.reducer;