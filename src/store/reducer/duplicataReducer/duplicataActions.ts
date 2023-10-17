import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const DuplicataRequest = createAsyncThunk('duplicataRequest', async (payload?: any) => {
    try {
        console.log("Response DuplicataRequest calling", payload,"urlParamsHelper", urlParamsHelper(payload.duplicata));
        const response: any = await get(`${payload.url}duplicata/listar?${urlParamsHelper(payload.duplicata)}`);
        console.log("Response DepartmentRequestato", JSON.stringify(response.data));

    } catch (error) {
        console.log("Error DuplicataRequest---", error);

    }
})