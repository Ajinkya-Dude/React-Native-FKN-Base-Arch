import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";
import * as NavigationService from '../../../navigation/NavigationService';
import { Alert } from "react-native";
import { FKNconstants } from "../../../components/constants";

export const RegisterRequest = createAsyncThunk('registerRequest', async (payload?: any) => {
    try {
        console.log("calling api", payload);
        const response = await api.get(`admin/api_android_autenticacao.php?&chave=${payload.chave}`);
        console.log("Register API Response", response.status, JSON.stringify(response.data));
        if (response && response.data && response.data.FKN && response.data.FKN.contrato) {
            // NavigationService.navigate('login');
            NavigationService.resetNavigation({ index: 0, routeName: 'login' });
            return response.data
        } else if (response && response.data && response.data.FKN && response.data.FKN.Processamento && response.data.FKN.Processamento.mensagemRetorno) {
            Alert.alert('Mensagem', response.data.FKN.Processamento.mensagemRetorno, [
                {
                    text: 'Ok',
                    onPress: () => console.log('Ok Pressed'),
                    style: 'cancel',
                },
            ]);
        }
    } catch (error:any) {
        console.log("Error Registration",error);
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
            // Alert.alert(FKNconstants.message,FKNconstants.onErrorCpfCnpj,
            //     [
            //         {
            //             text: 'Ok',
            //             onPress: () => console.log('Ok Pressed'),
            //             style: 'cancel',
            //         },
            //     ])
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error:', error.message);
          }
        if (error)
            Alert.alert('Error', error.message, [
                {
                    text: 'Ok',
                    onPress: () => console.log('Ok Pressed'),
                    style: 'cancel',
                },
            ]);
        //return error
    }
}); 