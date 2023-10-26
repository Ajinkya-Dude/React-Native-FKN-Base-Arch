import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const RecadosRequest = createAsyncThunk('recadosRequest', async (payload?: any) => {
    try {
        console.log("Response RecadosRequest calling", payload, "urlParamsHelper", `${payload.url}recado/listar?${urlParamsHelper(payload.recado)}`);
        const response: any = await get(`${payload.url}recado/listar?${urlParamsHelper(payload.recado)}`);
        console.log("Response RecadosRequest", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("Error RecadosRequest---", error);
    }
})