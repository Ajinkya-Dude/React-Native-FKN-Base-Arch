import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientsRequest } from './clientsActions';
import { ClienteCadastroRequest } from './clienteCadastroActions';
import { accessibilityProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';

interface ClientsState {
    loading: boolean;
    clientsData: any;
    error: boolean;
    clienteCadastro:any;
}
const initialState: ClientsState = {
    loading: false,
    clientsData: false,
    clienteCadastro:false,
    error: false,
};

const ClientsReducer = createSlice({
    name: "clients",
    initialState,
    reducers: {
        setChaveCredentials: (state, action: PayloadAction<any>) => {
            // state.chaveCreds = action.payload;
        },
        setLodingOn: (state) => {
            state.loading = true;
        },
        setLodingOff: (state) => {
            state.loading =false;
        },
        clearClienteCadastro: (state) => {
            state.clienteCadastro = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(ClientsRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            //     state.data = true
        })
            .addCase(ClientsRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                //state.clientsData = action.payload
                console.log("clientsRequest.fulfilled", action)
            })
            .addCase(ClientsRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("clientsRequest.rejected", action)
            })
            .addCase(ClienteCadastroRequest.pending,(state,action:PayloadAction<any>)=>{
                state.loading = true;
                state.clienteCadastro =false;
            }).addCase(ClienteCadastroRequest.fulfilled,(state, action: PayloadAction<any>) => {
                state.loading = false;
                state.clienteCadastro = action.payload;
                console.log("clienteCadastro.fulfilled", action.payload)
            })
            .addCase(ClienteCadastroRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("clienteCadastro.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearClienteCadastro,setLodingOn,setLodingOff } = ClientsReducer.actions;
export const selectUser = (state: any) => state.clients;
export default ClientsReducer.reducer;