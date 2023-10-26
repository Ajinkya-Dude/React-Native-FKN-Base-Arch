import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const TabelaRequest = createAsyncThunk('tabelaRequest', async (payload?: any) => {
    try {
        console.log("Response TabelaRequest calling", payload, "urlParamsHelper", `${payload.url}tabela/listar?${urlParamsHelper(payload.tabela)}`);
        const response: any = await get(`${payload.url}tabela/listar?${urlParamsHelper(payload.tabela)}`);
        console.log("Response TabelaRequest", JSON.stringify(response.data));
        //return response.data;
    } catch (error) {
        console.log("Error TabelaRequest---", error);
    }
})