import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AgendaRequest } from './agendaActions';

interface AgendaState {
    loading: boolean;
    agendaData: any;
    error: boolean;
}
const initialState: AgendaState = {
    loading: false,
    agendaData: false,
    error: false,
};

const AgendaReducer = createSlice({
    name: "agenda",
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
        builder.addCase(AgendaRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            //     state.data = true
        })
            .addCase(AgendaRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.agendaData = action.payload
                console.log("AgendaRequest.fulfilled", action)
            })
            .addCase(AgendaRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("AgendaRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = AgendaReducer.actions;
export const selectUser = (state: any) => state.agenda;
export default AgendaReducer.reducer;