import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProdutoRequest } from './produtoActions';

interface ProdutoState {
    loading: boolean;
    produtoData: any;
    error: boolean;
}
const initialState: ProdutoState = {
    loading: false,
    produtoData: false,
    error: false,
};

const ProdutoReducer = createSlice({
    name: "produto",
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
        builder.addCase(ProdutoRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("ProdutoRequest.pending", action)
        })
            .addCase(ProdutoRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                //state.produtoData = action.payload
                console.log("ProdutoRequest.fulfilled", action)
            })
            .addCase(ProdutoRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("ProdutoRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = ProdutoReducer.actions;
export const selectUser = (state: any) => state.produto;
export default ProdutoReducer.reducer;