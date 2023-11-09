import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const PortadoreRequest = createAsyncThunk('portadorRequest', async (payload?: any) => {
    try {
        console.log("Response PortadoreRequest calling", payload, "urlParamsHelper", `${payload.url}portador/listar?${urlParamsHelper(payload.portador)}`);
        const response: any = await get(`${payload.url}portador/listar?${urlParamsHelper(payload.portador)}`);
        console.log("Response PortadoreRequest", JSON.stringify(response.data));
        return response.data.list[0];
    } catch (error) {
        console.log("Error PortadoreRequest---", error);
    }
})