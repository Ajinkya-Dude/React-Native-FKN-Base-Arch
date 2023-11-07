import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RamosRequest } from './ramosActions';

interface RamosState {
    loading: boolean;
    ramosData: any;
    error: boolean;
}
const initialState: RamosState = {
    loading: false,
    ramosData: false,
    error: false,
};

const RamosReducer = createSlice({
    name: "ramos",
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
        builder.addCase(RamosRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("RamosRequest.pending", action)
            //     state.data = true
        })
            .addCase(RamosRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                //state.ramosData = action.payload
                console.log("RamosRequest.fulfilled", action)
            })
            .addCase(RamosRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("RamosRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = RamosReducer.actions;
export const selectUser = (state: any) => state.ramos;
export default RamosReducer.reducer;