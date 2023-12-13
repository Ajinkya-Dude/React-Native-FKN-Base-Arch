import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClassificacaoClienteRequest } from './clienteClassificacaoActions';

interface ClassificationClienteState {
    loading: boolean;
    classificationClienteData: any;
    error: boolean;
}
const initialState: ClassificationClienteState = {
    loading: false,
    classificationClienteData: false,
    error: false,
};

const classificationClienteReducer = createSlice({
    name: "classificationCliente",
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
        builder.addCase(ClassificacaoClienteRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            //     state.data = true
        })
            .addCase(ClassificacaoClienteRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.classificationClienteData = action.payload
                console.log("ClassificacaoClienteRequest.fulfilled", action)
            })
            .addCase(ClassificacaoClienteRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("ClassificationClienteRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = classificationClienteReducer.actions;
export const selectUser = (state: any) => state.classification;
export default classificationClienteReducer.reducer;