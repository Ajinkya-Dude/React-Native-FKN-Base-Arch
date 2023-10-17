import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const CnpjVendedorRequest = createAsyncThunk('cnpjVendedorRequest', async (payload?: any) => {
    try {
        console.log("Response CnpjVendedorRequest calling", payload,"urlParamsHelper", urlParamsHelper(payload.cnpjVendedor));
        const response: any = await get(`${payload.url}cnpjVendedor/listar?${urlParamsHelper(payload.cnpjVendedor)}`);
        console.log("Response CnpjVendedorRequest", JSON.stringify(response.data));

    } catch (error) {
        console.log("Error CnpjVendedorRequest", error);

    }
})