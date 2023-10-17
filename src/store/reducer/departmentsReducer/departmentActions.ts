import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";

export const DepartmentRequest = createAsyncThunk('departmentRequest', async (payload?: any) => {
    console.log("before try catch Response DepartmentRequest calling", payload,"urlParamsHelper", urlParamsHelper(payload.department));
    try {
        console.log("Response DepartmentRequest calling", payload,"urlParamsHelper", urlParamsHelper(payload.department));
        const response: any = await get(`${payload.url}departamento/listar?${urlParamsHelper(payload.department)}`);
        console.log("Response DepartmentRequestato", JSON.stringify(response.data));

    } catch (error) {
        console.log("Error DepartmentRequest---", error);

    }
})