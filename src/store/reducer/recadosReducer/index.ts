import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecadosRequest } from './recadosActions';

interface RecadosState {
    loading: boolean;
    recadoData: any;
    error: boolean;
}
const initialState: RecadosState = {
    loading: false,
    recadoData: false,
    error: false,
};

const RecadosReducer = createSlice({
    name: "recados",
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
        builder.addCase(RecadosRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("RecadosRequest.pending", action)
            //     state.data = true
        })
            .addCase(RecadosRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.recadoData = action.payload
                console.log("RecadosRequest.fulfilled", action)
            })
            .addCase(RecadosRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("RecadosRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = RecadosReducer.actions;
export const selectUser = (state: any) => state.recados;
export default RecadosReducer.reducer;