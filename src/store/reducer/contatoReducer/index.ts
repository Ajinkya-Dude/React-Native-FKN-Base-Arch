import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContatoRequest } from './contatoActions';

interface AbasState {
    loading: boolean;
    contatoData: any;
    error: boolean;
}
const initialState: AbasState = {
    loading: false,
    contatoData: false,
    error: false,
};

const ContatoReducer = createSlice({
    name: "contato",
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
        builder.addCase(ContatoRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            //     state.data = true
        })
            .addCase(ContatoRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.contatoData = action.payload
                console.log("ContatoRequest.fulfilled", action)
            })
            .addCase(ContatoRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("ContatoRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = ContatoReducer.actions;
export const selectUser = (state: any) => state.contato;
export default ContatoReducer.reducer;