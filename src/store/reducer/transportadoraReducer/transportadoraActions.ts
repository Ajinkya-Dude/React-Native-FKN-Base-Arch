import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const TransportadoraRequest = createAsyncThunk('transportadoraRequest', async (payload?: any) => {
    try {
        console.log("Response TransportadoraRequest calling", payload, "urlParamsHelper", `${payload.url}transportadora/listar?${urlParamsHelper(payload.transportadora)}`);
        const response: any = await get(`${payload.url}transportadora/listar?${urlParamsHelper(payload.transportadora)}`);
        console.log("Response TransportadoraRequest", JSON.stringify(response.data));
        return response.data.list[0];
    } catch (error) {
        console.log("Error TransportadoraRequest---", error);
    }
})