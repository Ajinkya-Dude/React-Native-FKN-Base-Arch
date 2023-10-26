import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SituacoesRequest } from './situacoesActions';

interface SituacoesState {
    loading: boolean;
    situacoesData: any;
    error: boolean;
}
const initialState: SituacoesState = {
    loading: false,
    situacoesData: false,
    error: false,
};

const SituacoesReducer = createSlice({
    name: "situacoes",
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
        builder.addCase(SituacoesRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("SituacoesRequest.pending", action)
            //     state.data = true
        })
            .addCase(SituacoesRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.situacoesData = action.payload
                console.log("SituacoesRequest.fulfilled", action)
            })
            .addCase(SituacoesRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("SituacoesRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = SituacoesReducer.actions;
export const selectUser = (state: any) => state.situacoes;
export default SituacoesReducer.reducer;