import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const RamosRequest = createAsyncThunk('ramosRequest', async (payload?: any) => {
    try {
        console.log("Response RamosRequest calling", payload, "urlParamsHelper", `${payload.url}ramo/listar?${urlParamsHelper(payload.ramos)}`);
        const response: any = await get(`${payload.url}ramo/listar?${urlParamsHelper(payload.ramos)}`);
        console.log("Response RamosRequest", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("Error RamosRequest---", error);
    }
})