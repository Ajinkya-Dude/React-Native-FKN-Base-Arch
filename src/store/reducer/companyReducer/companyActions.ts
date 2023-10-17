import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const CompanyRequest = createAsyncThunk('companyRequest', async (payload?: any) => {
    try {
        console.log("Response CompanyRequest calling", payload, "urlParamsHelper", urlParamsHelper(payload.company));
        const response: any = await get(`${payload.url}empresa/listar?${urlParamsHelper(payload.company)}`);
        console.log("Response DepartmentRequestato", JSON.stringify(response.data));
        return response.data
    } catch (error) {
        console.log("Error CompanyRequest---", error);

    }
})