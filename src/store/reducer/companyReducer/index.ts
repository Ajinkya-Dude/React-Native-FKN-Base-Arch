import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompanyRequest } from './companyActions';

interface CompanyState {
    loading: boolean;
    companyData: any;
    error: boolean;
}
const initialState: CompanyState = {
    loading: false,
    companyData: false,
    error: false,
};

const CompanyReducer = createSlice({
    name: "company",
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
        builder.addCase(CompanyRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("CompanyRequest.pending", action)
            //     state.data = true
        })
            .addCase(CompanyRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.companyData = action.payload
                console.log("CompanyRequest.fulfilled", action)
            })
            .addCase(CompanyRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("CompanyRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = CompanyReducer.actions;
export const selectUser = (state: any) => state.company;
export default CompanyReducer.reducer;