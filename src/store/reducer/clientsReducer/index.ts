import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientsRequest } from './clientsActions';
import { ClienteCadastroRequest } from './clienteCadastroActions';
import { accessibilityProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';
import { SearchCEPRequest } from './SearchCEPActions';

interface ClientsState {
    loading: boolean;
    clientsData: any;
    error: boolean;
    clienteCadastro:any;
    cepData:any,
    enderecoCodigo:any,
    fknVendasidCliente:any,
    fknVendasIdContato:any
}
const initialState: ClientsState = {
    loading: false,
    clientsData: false,
    clienteCadastro:false,
    cepData:false,
    error: false,
    enderecoCodigo:100000000000,
    fknVendasidCliente:90000000,
    fknVendasIdContato:10000000000,
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
        },
        clearCEPsearchData: (state) => {
            state.cepData = false;
        },
        enderecoCodigoNumber:(state)=>{
            state.enderecoCodigo = state.enderecoCodigo + 1
        },
        fknVendasidClienteNumber:(state)=>{
            state.fknVendasidCliente = state.fknVendasidCliente + 1
        },
        fknVendasidContatoNumber:(state)=>{
            console.log("fknVendasidContatoNumber",state.fknVendasIdContato);
            state.fknVendasIdContato = state.fknVendasIdContato + 1
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
            .addCase(SearchCEPRequest.pending,(state,action:PayloadAction<any>)=>{
                state.loading = true;
            })
            .addCase(SearchCEPRequest.fulfilled,(state, action: PayloadAction<any>)=>{
                state.loading = false;
                state.cepData = action.payload;
            })
            .addCase(SearchCEPRequest.rejected,(state, action: PayloadAction<any>)=>{
                state.loading = false
                console.log("SearchCEPRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearClienteCadastro,setLodingOn,setLodingOff,clearCEPsearchData,enderecoCodigoNumber,fknVendasidClienteNumber,fknVendasidContatoNumber} = ClientsReducer.actions;
export const selectUser = (state: any) => state.clients;
export default ClientsReducer.reducer;