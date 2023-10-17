import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModificationRequest } from './modificationActions';

interface ModificationState {
    loading: boolean;
    modificationData: any;
    error: boolean;
}
const initialState: ModificationState = {
    loading: false,
    modificationData: false,
    error: false,
};

const ModificationReducer = createSlice({
    name: "modification",
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
        builder.addCase(ModificationRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("ModificationRequest.pending", action)
            //     state.data = true
        })
            .addCase(ModificationRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.modificationData = action.payload
                console.log("ModificationRequest.fulfilled", action)
            })
            .addCase(ModificationRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("ModificationRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = ModificationReducer.actions;
export const selectUser = (state: any) => state.modification;
export default ModificationReducer.reducer;