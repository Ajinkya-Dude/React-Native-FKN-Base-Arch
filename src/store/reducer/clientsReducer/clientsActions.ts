import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const ClientsRequest = createAsyncThunk('clientsRequest', async (payload?: any) => {
    try {
        console.log("Response clients calling", payload,"urlParamsHelper", urlParamsHelper(payload.clients));
        const response: any = await get(`${payload.url}cliente/listar?${urlParamsHelper(payload.clients)}`);
        console.log("Response clients", JSON.stringify(response.data));

    } catch (error) {
        console.log("Error clients", error);

    }
})