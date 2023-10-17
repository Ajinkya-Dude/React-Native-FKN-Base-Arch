import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const AddressRequest = createAsyncThunk('duplicataRequest', async (payload?: any) => {
    try {
        console.log("Response AddressRequest calling", payload,"urlParamsHelper", urlParamsHelper(payload.company));
        const response: any = await get(`${payload.url}endereco/listar?${urlParamsHelper(payload.company)}`);
        console.log("Response AddressRequest", JSON.stringify(response.data));

    } catch (error) {
        console.log("Error AddressRequest---", error);

    }
})