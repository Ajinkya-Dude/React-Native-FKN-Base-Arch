import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DuplicataRequest } from './duplicataActions';

interface AbasState {
    loading: boolean;
    duplicataData: any;
    error: boolean;
}
const initialState: AbasState = {
    loading: false,
    duplicataData: false,
    error: false,
};

const DuplicataReducer = createSlice({
    name: "duplicata",
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
        builder.addCase(DuplicataRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("DuplicataRequest.pending", action)
            //     state.data = true
        })
            .addCase(DuplicataRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.duplicataData = action.payload
                console.log("DuplicataRequest.fulfilled", action)
            })
            .addCase(DuplicataRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("DuplicataRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = DuplicataReducer.actions;
export const selectUser = (state: any) => state.duplicata;
export default DuplicataReducer.reducer;