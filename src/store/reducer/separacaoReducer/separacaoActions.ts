import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const SeparacaoRequest = createAsyncThunk('separacaoRequest', async (payload?: any) => {
    try {
        console.log("Response SeparacaoRequest calling", payload, "urlParamsHelper", `${payload.url}separacao/listar?${urlParamsHelper(payload.separacao)}`);
        const response: any = await get(`${payload.url}separacao/listar?${urlParamsHelper(payload.separacao)}`);
        console.log("Response SeparacaoRequest", JSON.stringify(response.data));
        //return response.data;
    } catch (error) {
        console.log("Error SeparacaoRequest---", error);
    }
})