import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const ResultRequest = createAsyncThunk('resultRequest', async (payload?: any) => {
    try {
        console.log("Response ResultRequest calling", payload, "urlParamsHelper", `${payload.url}resultado/listar?${urlParamsHelper(payload.resultado)}`);
        const response: any = await get(`${payload.url}resultado/listar?${urlParamsHelper(payload.resultado)}`);
        console.log("Response ResultRequest", JSON.stringify(response.data));
        //return response.data;
    } catch (error) {
        console.log("Error ResultRequest---", error);
    }
})