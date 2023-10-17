import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const ModificationRequest = createAsyncThunk('modificationRequest', async (payload?: any) => {
    try {
        console.log("Response ModificationActions calling", payload,"urlParamsHelper",`${payload.url}modificacao/listar?${urlParamsHelper(payload.department)}`);
        const response: any = await get(`${payload.url}modificacao/listar?${urlParamsHelper(payload.department)}`);
        console.log("Response ModificationActions", JSON.stringify(response.data));

    } catch (error) {
        console.log("Error ModificationActions---", error);

    }
})