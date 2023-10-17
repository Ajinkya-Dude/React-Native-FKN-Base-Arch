import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressRequest } from './addressActions';

interface AddressState {
    loading: boolean;
    addressData: any;
    error: boolean;
}
const initialState: AddressState = {
    loading: false,
    addressData: false,
    error: false,
};

const AddressReducer = createSlice({
    name: "address",
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
        builder.addCase(AddressRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("AddressRequest.pending", action)
            //     state.data = true
        })
            .addCase(AddressRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.addressData = action.payload
                console.log("AddressRequest.fulfilled", action)
            })
            .addCase(AddressRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("AddressRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = AddressReducer.actions;
export const selectUser = (state: any) => state.address;
export default AddressReducer.reducer;