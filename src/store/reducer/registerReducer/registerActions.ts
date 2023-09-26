import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const RegisterRequest = createAsyncThunk('registerRequest', async (payload?: any) => {
    try {
        console.log("calling api",payload);
        const response = await api.get(`admin/api_android_autenticacao.php?${payload}`);
        console.log("Response", response);
        return response.data
    } catch (error) {
        console.log("Error", error);
        return error
    }
}); 