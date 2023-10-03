import { createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../../../api";
import { Alert } from "react-native";
import * as NavigationService from '../../../navigation/NavigationService';

export const LoginRequest = createAsyncThunk('loginRequest', async (payload?: any) => {
    try {
        console.log("Calling login api", payload);
        const response = await post(`${payload.url}auth`, payload.loginPayload);
        console.log("Response login", JSON.stringify(response));
        if (response && response.data && response.data.usuario_api) {
            // NavigationService.navigate('login');
            NavigationService.resetNavigation({ index: 0, routeName: 'verify' });
        }
        return response.data
    } catch (error) {
        console.log("Error", error);
        if (error)
            Alert.alert('Error', 'Nome de usuário e senha inválidos', [
                {
                    text: 'Ok',
                    onPress: () => console.log('Ok Pressed'),
                    style: 'cancel',
                },
            ]);
        return error
    }
}); 