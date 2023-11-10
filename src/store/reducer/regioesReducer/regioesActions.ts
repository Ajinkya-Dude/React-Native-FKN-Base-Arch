import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const RegioesRequest = createAsyncThunk('regioesRequest', async (payload?: any) => {
    try {
        console.log("Response RegioesRequest calling", payload, "urlParamsHelper", `${payload.url}regiao/listar?${urlParamsHelper(payload.regiao)}`);
        const response: any = await get(`${payload.url}regiao/listar?${urlParamsHelper(payload.regiao)}`);
        console.log("Response RegioesRequest", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("Error RegioesRequest---", error);
    }
})