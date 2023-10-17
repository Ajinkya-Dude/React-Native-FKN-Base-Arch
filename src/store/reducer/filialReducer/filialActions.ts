import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const FilialRequest = createAsyncThunk('filialRequest', async (payload?: any) => {
    try {
        console.log("Response FilialRequest calling", payload,"urlParamsHelper",`${payload.url}filial/listar?${urlParamsHelper(payload.department)}`);
        const response: any = await get(`${payload.url}filial/listar?${urlParamsHelper(payload.department)}`);
        console.log("Response FilialRequest", JSON.stringify(response.data));

    } catch (error) {
        console.log("Error FilialRequest---", error);

    }
})