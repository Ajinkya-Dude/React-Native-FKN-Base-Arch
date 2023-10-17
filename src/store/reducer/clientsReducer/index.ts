import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientsRequest } from './clientsActions';

interface ClientsState {
    loading: boolean;
    clientsData: any;
    error: boolean;
}
const initialState: ClientsState = {
    loading: false,
    clientsData: false,
    error: false,
};

const ClientsReducer = createSlice({
    name: "clients",
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
        builder.addCase(ClientsRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            //     state.data = true
        })
            .addCase(ClientsRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.clientsData = action.payload
                console.log("clientsRequest.fulfilled", action)
            })
            .addCase(ClientsRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("clientsRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = ClientsReducer.actions;
export const selectUser = (state: any) => state.clients;
export default ClientsReducer.reducer;