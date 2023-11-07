import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import theme from '../../theme';

const BottomSheetCustom = ({bottomSheetRef,closeBottomSheet}:any) => {
    // ref
    //const bottomSheetRef = useRef<BottomSheet>(null);
    
    // variables
    const snapPoints = useMemo(() => ['80%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    // renders
    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose
            handleStyle={styles.handleStyle}
            onClose={closeBottomSheet}
        >
            <View style={styles.contentContainer}>
                
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.COLORS.GRAY
    },
    handleStyle:{
        paddingVertical: theme.verticalScale(15),
        backgroundColor:theme.COLORS.GREEN_DARK,
        borderTopLeftRadius:theme.moderateScale(15),
        borderTopRightRadius:theme.moderateScale(15)
    }
});

export default BottomSheetCustom;