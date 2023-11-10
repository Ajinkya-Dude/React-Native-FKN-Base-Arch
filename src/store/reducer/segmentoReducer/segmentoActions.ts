import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const SegmentoRequest = createAsyncThunk('segmentoRequest', async (payload?: any) => {
    try {
        console.log("Response SegmentoRequest calling", payload, "urlParamsHelper", `${payload.url}segmento/listar?${urlParamsHelper(payload.segmento)}`);
        const response: any = await get(`${payload.url}segmento/listar?${urlParamsHelper(payload.segmento)}`);
        console.log("Response SegmentoRequest", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("Error SegmentoRequest---", error);
    }
})