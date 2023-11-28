import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const ProdutoRequest = createAsyncThunk('produtoRequest', async (payload?: any) => {
    try {
        console.log("Response ProdutoRequest calling", payload, "urlParamsHelper", `${payload.url}produto/listar?${urlParamsHelper(payload.produto)}`);
        const response: any = await get(`${payload.url}produto/listar?${urlParamsHelper(payload.produto)}`);
        console.log("Response ProdutoRequest", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("Error ProdutoRequest---", error);
        throw new Error(error);
    }
})