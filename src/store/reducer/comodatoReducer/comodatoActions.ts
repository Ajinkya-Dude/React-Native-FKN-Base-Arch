import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const ComodatoRequest = createAsyncThunk('comodatoRequest', async (payload?: any) => {
    try {
        console.log("Response ComodatoRequest calling", payload,"urlParamsHelper", urlParamsHelper(payload.comodato));
        const response: any = await get(`${payload.url}cnpjVendedor/listar?${urlParamsHelper(payload.comodato)}`);
        console.log("Response ComodatoRequest", JSON.stringify(response.data));

    } catch (error) {
        console.log("Error ComodatoRequest", error);

    }
})