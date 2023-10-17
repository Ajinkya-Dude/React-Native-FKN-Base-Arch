import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const NotasRequest = createAsyncThunk('filialRequest', async (payload?: any) => {
    try {
        console.log("Response NotasRequest calling", payload, "urlParamsHelper", `${payload.url}notas/listar?${urlParamsHelper(payload.notas)}`);
        const response: any = await get(`${payload.url}notas/listar?${urlParamsHelper(payload.notas)}`);
        console.log("Response NotasRequest", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("Error NotasRequest---", error);

    }
})