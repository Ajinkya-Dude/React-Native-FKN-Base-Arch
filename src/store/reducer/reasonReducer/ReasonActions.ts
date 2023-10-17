import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const ReasonRequest = createAsyncThunk('reasonRequest', async (payload?: any) => {
    try {
        console.log("Response ReasonRequest calling", payload, "urlParamsHelper", `${payload.url}motivo/listar?${urlParamsHelper(payload.department)}`);
        const response: any = await get(`${payload.url}modificacao/listar?${urlParamsHelper(payload.department)}`);
        console.log("Response ReasonRequest", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("Error ReasonRequest---", error);

    }
})