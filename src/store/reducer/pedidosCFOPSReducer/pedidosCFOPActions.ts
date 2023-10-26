import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const PedidosCFOPRequest = createAsyncThunk('pedidosCFOPRequest', async (payload?: any) => {
    try {
        console.log("Response PedidosCFOPRequest calling", payload, "urlParamsHelper", `${payload.url}pedidoCFOP/listar?${urlParamsHelper(payload.pedidoCFOP)}`);
        const response: any = await get(`${payload.url}pedidoCFOP/listar?${urlParamsHelper(payload.pedidoCFOP)}`);
        console.log("Response PedidosCFOPRequest", JSON.stringify(response.data));
    } catch (error) {
        console.log("Error PedidosCFOPRequest---", error);
    }
})