import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import theme from '../../theme';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';
import { FKNconstants } from '../constants';

const BottomSheetCustom = ({ bottomSheetRef, closeBottomSheet, data, onSelect, dataType }: any) => {
    // ref
    //const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ['90%'], []);
    const [searchValue, setSearchValue] = useState<string>('');
    const [renderArr, setRenderArr] = useState(data);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    const onSearchItem = (searchText: any) => {
        if (data.length && searchText) {
            searchText = String(searchText).trim().toLowerCase();
                const filterdata: any = data.filter((item: any) => item.descricao.toLowerCase().includes(searchText)) || [];
                setRenderArr(filterdata);
        }
    }
    const onClearSearchValue = () => {
        setSearchValue('');
        setRenderArr(data);
    }

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
                <View style={{ width: '100%', backgroundColor: theme.COLORS.WHITE, borderRadius: theme.moderateScale(10), flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput
                        value={searchValue}
                        onChangeText={(value) => setSearchValue(value)}
                        style={{ color: theme.COLORS.BLACK, paddingHorizontal: theme.horizontalScale(10), padding: theme.moderateScale(10), width: searchValue ? '70%' : '85%' }}
                        placeholder={FKNconstants.searchPlaceholderSheet}
                        placeholderTextColor={theme.COLORS.DARK_GRAY}
                    />
                    {searchValue && <TouchableOpacity onPress={onClearSearchValue} style={styles.iconContainer}>
                        <Icons
                            name={'clear'}
                            color={'black'}
                            size={25}
                        />
                    </TouchableOpacity>}
                    <TouchableOpacity onPress={() => onSearchItem(searchValue)} style={styles.iconContainer}>
                        <Icon
                            name={'magnify'}
                            color={'black'}
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', alignItems: 'flex-start', marginTop: theme.verticalScale(20) }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={renderArr}
                        keyExtractor={item => item.descricao}
                        style={{ width: '100%' }}
                        contentContainerStyle={{ paddingBottom: theme.verticalScale(100) }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity id={`${index}`} onPress={() => onSelect(item)} style={{ backgroundColor: theme.COLORS.WHITE, width: '100%', borderRadius: theme.moderateScale(10), marginVertical: theme.moderateScale(5), padding: 10 }}>
                                    <Text style={{ color: theme.COLORS.BLACK }}>{item.descricao}</Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
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
        backgroundColor: theme.COLORS.GRAY,
        padding: theme.moderateScale(10)
    },
    handleStyle: {
        paddingVertical: theme.verticalScale(15),
        backgroundColor: theme.COLORS.GREEN_DARK,
        borderTopLeftRadius: theme.moderateScale(15),
        borderTopRightRadius: theme.moderateScale(15)
    },
    iconContainer: {
        paddingHorizontal: 5,
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default BottomSheetCustom;