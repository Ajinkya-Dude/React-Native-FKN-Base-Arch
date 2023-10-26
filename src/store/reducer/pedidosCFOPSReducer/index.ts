import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PedidosCFOPRequest } from './pedidosCFOPActions';

interface PedidoCFOPState {
    loading: boolean;
    pedidoCFOPData: any;
    error: boolean;
}
const initialState: PedidoCFOPState = {
    loading: false,
    pedidoCFOPData: false,
    error: false,
};

const PedidoCFOPReducer = createSlice({
    name: "pedidoCFOP",
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
        builder.addCase(PedidosCFOPRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("PedidosCFOPRequest.pending", action)
            //     state.data = true
        })
            .addCase(PedidosCFOPRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.pedidoCFOPData = action.payload
                console.log("PedidosCFOPRequest.fulfilled", action)
            })
            .addCase(PedidosCFOPRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("PedidosCFOPRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = PedidoCFOPReducer.actions;
export const selectUser = (state: any) => state.pedidoCFOP;
export default PedidoCFOPReducer.reducer;