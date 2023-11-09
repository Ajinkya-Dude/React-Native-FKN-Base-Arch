import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const CpfCnpjSearchRequest = createAsyncThunk('cpfCnpjRequest', async (payload?: any) => {
    try {
        console.log("Response cpfCnpj calling", payload,"urlParamsHelper", urlParamsHelper(payload));
        const response: any = await get(`https://suporte.fkn.com.br/fkn-ws-cnpj/index.php?${urlParamsHelper(payload)}`);
        console.log("Response cpfCnpj", JSON.stringify(response.data));
        return response.data
    } catch (error) {
        console.log("Error cpfCnpj", error);
    }
})