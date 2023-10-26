import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const ParameterRequest = createAsyncThunk('parameterRequest', async (payload?: any) => {
    try {
        console.log("Response ParameterRequest calling", payload, "urlParamsHelper", `${payload.url}parametro/listar?${urlParamsHelper(payload.parametro)}`);
        const response: any = await get(`${payload.url}parametro/listar?${urlParamsHelper(payload.parametro)}`);
        console.log("Response ParameterRequest", JSON.stringify(response.data));
    } catch (error) {
        console.log("Error ParameterRequest---", error);
    }
})