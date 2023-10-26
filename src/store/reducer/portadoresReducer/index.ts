import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PortadoreRequest } from './portadoreActions';

interface PortadorState {
    loading: boolean;
    portadoreData: any;
    error: boolean;
}
const initialState: PortadorState = {
    loading: false,
    portadoreData: false,
    error: false,
};

const PortadorReducer = createSlice({
    name: "portador",
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
        builder.addCase(PortadoreRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("PortadoreRequest.pending", action)
            //     state.data = true
        })
            .addCase(PortadoreRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.portadoreData = action.payload
                console.log("PortadoreRequest.fulfilled", action)
            })
            .addCase(PortadoreRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("PortadoreRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = PortadorReducer.actions;
export const selectUser = (state: any) => state.pedidoCFOP;
export default PortadorReducer.reducer;