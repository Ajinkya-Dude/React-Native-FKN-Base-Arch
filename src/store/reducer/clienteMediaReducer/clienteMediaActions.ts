import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const ClienteMediaRequest = createAsyncThunk('clienteMediaRequest', async (payload?: any) => {
    try {
        console.log("Response ClienteMediaRequest calling", payload,"urlParamsHelper", urlParamsHelper(payload.clienteMedia));
        const response: any = await get(`${payload.url}cnpjVendedor/listar?${urlParamsHelper(payload.clienteMedia)}`);
        console.log("Response ClienteMediaRequest", JSON.stringify(response.data));

    } catch (error) {
        console.log("Error ClienteMediaRequest", error);

    }
})