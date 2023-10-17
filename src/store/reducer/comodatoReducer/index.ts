import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComodatoRequest } from './comodatoActions';

interface ClassificationState {
    loading: boolean;
    comodatoData: any;
    error: boolean;
}
const initialState: ClassificationState = {
    loading: false,
    comodatoData: false,
    error: false,
};

const comodatoReducer = createSlice({
    name: "comodato",
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
        builder.addCase(ComodatoRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            //     state.data = true
        })
            .addCase(ComodatoRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.comodatoData = action.payload
                console.log("ComodatoRequest.fulfilled", action)
            })
            .addCase(ComodatoRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("ComodatoRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = comodatoReducer.actions;
export const selectUser = (state: any) => state.comodato;
export default comodatoReducer.reducer;