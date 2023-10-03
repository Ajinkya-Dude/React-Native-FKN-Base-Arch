import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";
import * as NavigationService from '../../../navigation/NavigationService';
import { Alert } from "react-native";

export const RegisterRequest = createAsyncThunk('registerRequest', async (payload?: any) => {
    try {
        console.log("calling api",payload);
        const response = await api.get(`admin/api_android_autenticacao.php?&chave=${payload.chave}`);
        console.log("Response", JSON.stringify(response.data));
        if (response && response.data && response.data.FKN ) {
            // NavigationService.navigate('login');
            NavigationService.resetNavigation({ index: 0, routeName: 'login' });
        }
        return response.data
    } catch (error) {
        console.log("Error", error);
        if (error)
            Alert.alert('Error', error[0], [
                {
                    text: 'Ok',
                    onPress: () => console.log('Ok Pressed'),
                    style: 'cancel',
                },
            ]);
        //return error
    }
}); 