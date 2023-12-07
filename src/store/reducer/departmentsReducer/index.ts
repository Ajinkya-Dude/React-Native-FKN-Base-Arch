import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DepartmentRequest } from './departmentActions';

interface DepartmentState {
    loading: boolean;
    departmentData: any;
    error: boolean;
}
const initialState: DepartmentState = {
    loading: false,
    departmentData: false,
    error: false,
};

const DepartmentReducer = createSlice({
    name: "department",
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
        builder.addCase(DepartmentRequest.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
            console.log("DepartmentRequest.pending", action)
            //     state.data = true
        })
            .addCase(DepartmentRequest.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.departmentData = action.payload
                console.log("DepartmentRequest.fulfilled", action)
            })
            .addCase(DepartmentRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                console.log("DepartmentRequest.rejected", action)
            })
    },
});

export const { setChaveCredentials, clearChaveCredentials } = DepartmentReducer.actions;
export const selectUser = (state: any) => state.department;
export default DepartmentReducer.reducer;