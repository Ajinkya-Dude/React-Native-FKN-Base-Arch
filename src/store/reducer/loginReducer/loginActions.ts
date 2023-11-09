import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';
import { setUserIsLoggedIn } from ".";

export const LoginRequest = createAsyncThunk('loginRequest', async (payload?: any) => {
    try {
        console.log("Calling login api", payload);
        const response: any = await post(`${payload.url}auth`, payload.loginPayload);
        console.log("Response login", JSON.stringify(response.data));
        if (response && response.data && response.data.usuario_api && response.data.usuario_api.token) {
            // NavigationService.navigate('login');
            //NavigationService.resetNavigation({ index: 0, routeName: 'verify' });
        }
        return response.data
    } catch (error: any) {
        console.log("Error", error.status, error.message);
        if (error && error.message && error.message.includes('401')) {
            Alert.alert('Mensagem', 'Nome de usuário e senha inválidos', [
                {
                    text: 'Ok',
                    onPress: () => console.log('Ok Pressed'),
                    style: 'cancel',
                },
            ]);
        } else {
            Alert.alert('Error', error.message, [
                {
                    text: 'Ok',
                    onPress: () => console.log('Ok Pressed'),
                    style: 'cancel',
                },
            ]);
        }
        //return error
    }
});
export const VerifyRequest = createAsyncThunk('verifyRequest', async (payload: any, { dispatch }) => {
    try {
        console.log("Calling Verify api", payload);
        const response: any = await get(`${payload.url}`);
        console.log("Response Verify", JSON.stringify(response.data));
        if (response && response.data && response.data.list && response.data.list.length && response.data.list[0].FKN && response.data.list[0].FKN.vendedores && response.data.list[0].FKN.vendedores[0].vendedor && response.data.list[0].FKN.vendedores[0].vendedor.dispositivos && response.data.list[0].FKN.vendedores[0].vendedor.dispositivos.length > 0) {
            dispatch(setUserIsLoggedIn(true));
            return response.data.list[0]
        }
        else if (response && response.data && response.data.FKN && response.data.FKN.Processamento && response.data.FKN.Processamento.mensagemRetorno && !payload.fromLogin) {
            Alert.alert('Mensagem', response.data.FKN.Processamento.mensagemRetorno, [
                {
                    text: 'Ok',
                     onPress: () => {},
                    //onPress: () => dispatch(setUserIsLoggedIn(true)),
                    style: 'cancel',
                },
            ]);
        } else {
            // if (!payload.fromLogin) {
            //     dispatch(setUserIsLoggedIn(true));
            // } else {
                NavigationService.resetNavigation({ index: 0, routeName: 'verify' });
            //}
        }
        return response.data
    } catch (error: any) {
        console.log("Error", error);
        if (error)
            Alert.alert('Error', error.message, [
                {
                    text: 'Ok',
                    onPress: () => console.log('Ok Pressed'),
                    style: 'cancel',
                },
            ]);
        return error
    }
}); 