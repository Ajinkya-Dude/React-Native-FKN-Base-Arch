import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const AgendaRequest = createAsyncThunk('agendaRequest', async (payload?: any) => {
    try {
        console.log("Response agenda calling", payload,"urlParamsHelper",urlParamsHelper(payload.agenda));
        const response: any = await get(`${payload.url}agenda/listarNovos?${urlParamsHelper(payload.agenda)}`);
        console.log("Response agenda", JSON.stringify(response.data));

    } catch (error) {
        console.log("Error agenda", error);

    }
})