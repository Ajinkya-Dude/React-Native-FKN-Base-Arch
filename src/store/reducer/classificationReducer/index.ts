import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClassificationRequest } from './classificationActions';

interface ClassificationState {
    loading: boolean;
    classificationData: any;
    error: boolean;
}
const initialState: ClassificationState = {
    loading: false,
    classificationData: false,
    error: false,
};

const classificationReducer = createSlice({
    name: "classification",
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
        builder.addCase(ClassificationRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            //     state.data = true
        })
            .addCase(ClassificationRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.classificationData = action.payload
                console.log("ClassificationRequest.fulfilled", action)
            })
            .addCase(ClassificationRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("ClassificationRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = classificationReducer.actions;
export const selectUser = (state: any) => state.classification;
export default classificationReducer.reducer;