import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilialRequest } from './filialActions';

interface FilialState {
    loading: boolean;
    filialData: any;
    error: boolean;
}
const initialState: FilialState = {
    loading: false,
    filialData: false,
    error: false,
};

const FilialReducer = createSlice({
    name: "filial",
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
        builder.addCase(FilialRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("FilialRequest.pending", action)
            //     state.data = true
        })
            .addCase(FilialRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.filialData = action.payload
                console.log("FilialRequest.fulfilled", action)
            })
            .addCase(FilialRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("FilialRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = FilialReducer.actions;
export const selectUser = (state: any) => state.filial;
export default FilialReducer.reducer;