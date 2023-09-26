import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const LoginRequest = createAsyncThunk('loginRequest', async (payload?: any) => {
    try {
        const response = await api.get('');
        return response.data
    } catch (error) {
        return error
    }
}); 