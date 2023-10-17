import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClienteMediaRequest } from './clienteMediaActions';

interface ClassificationState {
    loading: boolean;
    clienteMediaData: any;
    error: boolean;
}
const initialState: ClassificationState = {
    loading: false,
    clienteMediaData: false,
    error: false,
};

const clienteMediaReducer = createSlice({
    name: "clienteMedia",
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
        builder.addCase(ClienteMediaRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            //     state.data = true
        })
            .addCase(ClienteMediaRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.clienteMediaData = action.payload
                console.log("ClienteMediaRequest.fulfilled", action)
            })
            .addCase(ClienteMediaRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("ClassificationRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = clienteMediaReducer.actions;
export const selectUser = (state: any) => state.clienteMedia;
export default clienteMediaReducer.reducer;