import * as React from 'react';
import { ParamListBase, StackActions } from '@react-navigation/native';
import { NavigationContainerRef } from '@react-navigation/native';

// NavigationConatiner is refered here - Check NavigationStack
export const navigationRef = React.createRef<NavigationContainerRef<ParamListBase>>();

export const navigate = (name: string, params?: object) => {
  navigationRef.current?.navigate(name, params);
};

export const goBack = () => {
  navigationRef.current?.goBack();
};

export const popToStack = () => {
  navigationRef.current?.dispatch(StackActions.popToTop());
};