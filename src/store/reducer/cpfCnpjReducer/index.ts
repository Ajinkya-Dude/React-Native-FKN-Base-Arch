import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CpfCnpjSearchRequest } from './cpfCnpjActions';

interface CpfCnpjState {
    loading: boolean;
    data: any;
    error: boolean;
}
const initialState: CpfCnpjState = {
    loading: false,
    data: false,
    error: false,
};

const CpfCnpjReducer = createSlice({
    name: "cpfCnpj",
    initialState,
    reducers: {
        setChaveCredentials: (state, action: PayloadAction<any>) => {
            // state.chaveCreds = action.payload;
        },
        clearCpfCnpjData: (state) => {
            state.data = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CpfCnpjSearchRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            //     state.data = true
        })
            .addCase(CpfCnpjSearchRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.data = action.payload
                console.log("CpfCnpjSearchRequest.fulfilled", action)
            })
            .addCase(CpfCnpjSearchRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("CpfCnpjSearchRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearCpfCnpjData } = CpfCnpjReducer.actions;
export const selectUser = (state: any) => state.cpfCnpj;
export default CpfCnpjReducer.reducer;