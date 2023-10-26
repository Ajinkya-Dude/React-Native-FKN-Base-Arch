import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SeparacaoRequest } from './separacaoActions';

interface SeparacaoState {
    loading: boolean;
    separacaoData: any;
    error: boolean;
}
const initialState: SeparacaoState = {
    loading: false,
    separacaoData: false,
    error: false,
};

const SeparacaoReducer = createSlice({
    name: "separacao",
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
        builder.addCase(SeparacaoRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("SeparacaoRequest.pending", action)
            //     state.data = true
        })
            .addCase(SeparacaoRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.separacaoData = action.payload
                console.log("SeparacaoRequest.fulfilled", action)
            })
            .addCase(SeparacaoRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("SeparacaoRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = SeparacaoReducer.actions;
export const selectUser = (state: any) => state.separacao;
export default SeparacaoReducer.reducer;