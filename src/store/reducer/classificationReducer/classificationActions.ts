import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const ClassificationRequest = createAsyncThunk('classificationRequest', async (payload?: any) => {
    try {
        console.log("Response classification calling", payload,"urlParamsHelper", urlParamsHelper(payload.classification));
        const response: any = await get(`${payload.url}classificacao/listar?${urlParamsHelper(payload.classification)}`);
        console.log("Response classification", JSON.stringify(response.data));

    } catch (error) {
        console.log("Error classification", error);

    }
})