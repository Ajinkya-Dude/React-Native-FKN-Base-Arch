import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const AbasRequest = createAsyncThunk('abasRequest', async (payload?: any) => {
    try {
        console.log("Response abas calling", payload,"urlParamsHelper", urlParamsHelper(payload.abas));
        const response: any = await get(`${payload.url}aba/listar?${urlParamsHelper(payload.abas)}`);
        console.log("Response abas", JSON.stringify(response.data));

    } catch (error) {
        console.log("Error abas", error);
    }
})