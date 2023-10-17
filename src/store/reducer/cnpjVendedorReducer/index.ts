import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CnpjVendedorRequest } from './cnpjVendedorActions';

interface CnpjVendedorState {
    loading: boolean;
    cnpjVendedorData: any;
    error: boolean;
}
const initialState: CnpjVendedorState = {
    loading: false,
    cnpjVendedorData: false,
    error: false,
};

const cnpjVendedorReducer = createSlice({
    name: "cnpjVendedor",
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
        builder.addCase(CnpjVendedorRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            //     state.data = true
        })
            .addCase(CnpjVendedorRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.cnpjVendedorData = action.payload
                console.log("CnpjVendedorRequest.fulfilled", action)
            })
            .addCase(CnpjVendedorRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("ClassificationRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = cnpjVendedorReducer.actions;
export const selectUser = (state: any) => state.cnpjVendedor;
export default cnpjVendedorReducer.reducer;