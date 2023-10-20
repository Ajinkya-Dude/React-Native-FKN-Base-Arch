import { memo, useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import style from "../../styles";
import theme from "../../theme";
import { FKNconstants } from "../constants";

interface OrderByInterface {
    visible: boolean;
    data?: any[];
    onModalClose: () => void;
    onModalOk:any;
    selected?: string
}
const OrderByModal = ({
    visible,
    data,
    onModalClose,
    onModalOk,
    selected = ""
}: OrderByInterface) => {
    const [selectItem, setSelectItem] = useState<string>(selected);
    const onApplyChanges = () => {
        onModalOk(selectItem)
    }
    return (
        <Modal
            animationType={'fade'}
            visible={visible}
            transparent={true}
        >
            <View style={style.modalConatainer}>
                <View
                    style={style.modalSubConatiner}
                >
                    <View style={style.modalTitleContainer}>
                        <Text style={style.modalTitle}>
                            {FKNconstants.orderModalTitle}
                        </Text>
                    </View>
                    <View style={style.modalContentContainer}>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity onPress={() => setSelectItem(item.value)} style={styles.customRadioButtonContainer}>
                                        <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: 'green', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                                            {selectItem === item.value && <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: 'green' }} />}
                                        </View>
                                        <Text style={{ color: 'black' }}>{item.label}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                    <View style={style.modalButtonContainer}>
                        <TouchableOpacity style={style.modalCloseButton} onPress={onModalClose}><Text style={style.modalCloseButtonText}>{FKNconstants.orderCancel}</Text></TouchableOpacity>
                        <TouchableOpacity style={style.modalOkButton} onPress={onApplyChanges}><Text style={style.modalOkButtonText}>{FKNconstants.orderOk}</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    customRadioButtonContainer: {
        flexDirection: 'row',
        paddingVertical: theme.moderateScale(10)
    }
})

export default memo(OrderByModal);