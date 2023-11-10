import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const ContatoRequest = createAsyncThunk('contatoRequest', async (payload?: any) => {
    try {
        console.log("Response contato calling", payload,"urlParamsHelper", urlParamsHelper(payload.contato));
        const response: any = await get(`${payload.url}contato/listar?${urlParamsHelper(payload.contato)}`);
        console.log("Response contato", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("Error contato", error);

    }
})