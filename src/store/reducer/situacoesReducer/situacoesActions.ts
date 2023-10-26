import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const SituacoesRequest = createAsyncThunk('situacoesRequest', async (payload?: any) => {
    try {
        console.log("Response SituacoesRequest calling", payload, "urlParamsHelper", `${payload.url}situacao/listar?${urlParamsHelper(payload.situacao)}`);
        const response: any = await get(`${payload.url}situacao/listar?${urlParamsHelper(payload.situacao)}`);
        console.log("Response SituacoesRequest", JSON.stringify(response.data));
        //return response.data;
    } catch (error) {
        console.log("Error SituacoesRequest---", error);
    }
})