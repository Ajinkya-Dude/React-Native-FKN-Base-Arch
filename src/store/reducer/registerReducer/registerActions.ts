import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";
import * as NavigationService from '../../../navigation/NavigationService';
import { Alert } from "react-native";

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
        console.log("Error", error.message);
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