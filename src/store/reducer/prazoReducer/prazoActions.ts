import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const PrazoRequest = createAsyncThunk('prazoRequest', async (payload?: any) => {
    try {
        console.log("Response PrazoRequest calling", payload, "urlParamsHelper", `${payload.url}prazo/listar?${urlParamsHelper(payload.prazo)}`);
        const response: any = await get(`${payload.url}prazo/listar?${urlParamsHelper(payload.prazo)}`);
        console.log("Response PrazoRequest", JSON.stringify(response.data));
        return response.data.list[0];
    } catch (error) {
        console.log("Error PrazoRequest---", error);
    }
})