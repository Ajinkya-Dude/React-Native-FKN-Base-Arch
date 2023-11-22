import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import urlParamsHelper from "../../../components/common/UrlParamsHelper";
import { FKNconstants } from "../../../components/constants";

export const ClienteCadastroRequest = createAsyncThunk('clienteCadastroRequest', async (payload?: any) => {
    try {
        console.log("Response clients cadastro calling", payload,"urlParamsHelper", urlParamsHelper(payload.cliente),"\nURL",`${payload.url}cliente/inserir?${urlParamsHelper(payload.cliente)}&formato=JSON`);
        const response: any = await get(`${payload.url}cliente/inserir?${urlParamsHelper(payload.cliente)}&formato=JSON`);
        console.log("Response clients cadastro", response.data);
        return response.data
    } catch (error:any) {
        console.log("Error clients cadastro", error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('Response data:', error.response.data);
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
            if(error.response.status === 404){
                Alert.alert(FKNconstants.message,error.response.data.error,
                    [
                        {
                            text: 'Ok',
                            onPress: () => console.log('Ok Pressed'),
                            style: 'cancel',
                        },
                    ])
            }
          } else if (error.request) {
            // The request was made but no response was received
            console.log('Request made but no response received:', error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error:', error.message);
          }
    }
})