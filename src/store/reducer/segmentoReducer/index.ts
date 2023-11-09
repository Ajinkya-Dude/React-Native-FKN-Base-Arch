import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SegmentoRequest } from './segmentoActions';

interface SegmentoState {
    loading: boolean;
    segmentoData: any;
    error: boolean;
}
const initialState: SegmentoState = {
    loading: false,
    segmentoData: false,
    error: false,
};

const SegmentoReducer = createSlice({
    name: "segmento",
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
        builder.addCase(SegmentoRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("SegmentoRequest.pending", action)
            //     state.data = true
        })
            .addCase(SegmentoRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                //state.segmentoData = action.payload
                console.log("SegmentoRequest.fulfilled", action)
            })
            .addCase(SegmentoRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("SegmentoRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = SegmentoReducer.actions;
export const selectUser = (state: any) => state.segmento;
export default SegmentoReducer.reducer;