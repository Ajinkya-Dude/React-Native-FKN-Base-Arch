import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TabelaRequest } from './tabelaActions';

interface TabelaState {
    loading: boolean;
    tabelaData: any;
    error: boolean;
}
const initialState: TabelaState = {
    loading: false,
    tabelaData: false,
    error: false,
};

const TabelaReducer = createSlice({
    name: "tabela",
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
        builder.addCase(TabelaRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("TabelaRequest.pending", action)
            //     state.data = true
        })
            .addCase(TabelaRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                //state.tabelaData = action.payload
                console.log("TabelaRequest.fulfilled", action)
            })
            .addCase(TabelaRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("TabelaRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = TabelaReducer.actions;
export const selectUser = (state: any) => state.tabela;
export default TabelaReducer.reducer;