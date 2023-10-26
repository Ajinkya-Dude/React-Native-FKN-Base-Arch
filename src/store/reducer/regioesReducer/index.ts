import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegioesRequest } from './regioesActions';

interface RegioesState {
    loading: boolean;
    regioesData: any;
    error: boolean;
}
const initialState: RegioesState = {
    loading: false,
    regioesData: false,
    error: false,
};

const RegioesReducer = createSlice({
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
        builder.addCase(RegioesRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("RegioesRequest.pending", action)
            //     state.data = true
        })
            .addCase(RegioesRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.regioesData = action.payload
                console.log("RegioesRequest.fulfilled", action)
            })
            .addCase(RegioesRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("RegioesRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = RegioesReducer.actions;
export const selectUser = (state: any) => state.recados;
export default RegioesReducer.reducer;