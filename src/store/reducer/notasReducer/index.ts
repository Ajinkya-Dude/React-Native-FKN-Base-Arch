import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotasRequest } from './notasActions';

interface NotasState {
    loading: boolean;
    notasData: any;
    error: boolean;
}
const initialState: NotasState = {
    loading: false,
    notasData: false,
    error: false,
};

const NotasReducer = createSlice({
    name: "notas",
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
        builder.addCase(NotasRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("NotasRequest.pending", action)
            //     state.data = true
        })
            .addCase(NotasRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.notasData = action.payload
                console.log("NotasRequest.fulfilled", action)
            })
            .addCase(NotasRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("NotasRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = NotasReducer.actions;
export const selectUser = (state: any) => state.notas;
export default NotasReducer.reducer;