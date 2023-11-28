import React, { memo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView, Text, View, TouchableOpacity, Modal } from 'react-native';
import theme from '../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface DropdownProps {
    items: any[];
    selectedItem: string;
    setSelectedItem: (item: string) => void;
}

const DropdownField: React.FC<DropdownProps> = ({ items, selectedItem, setSelectedItem }) => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const touchableOpacityRef = useRef(null);

    const toggleModal = () => {
        if (touchableOpacityRef.current) {
            touchableOpacityRef.current.measureInWindow((x, y, width, height) => {
                setPosition({ x, y });
                setModalVisible(!isModalVisible);
            });
        }
    };

    const handleItemPress = (item:any ) => {
        setSelectedItem(item.value);
        toggleModal();
    };

    return (
        <View>
            <TouchableOpacity style={styles.constainer} onPress={toggleModal} ref={touchableOpacityRef}>
                <Text style={{ color: theme.COLORS.BLACK }}>{selectedItem || 'Select an item'}</Text>
                <Icon
                        name={!isModalVisible ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                        color={'black'}
                        size={25}
                    />
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="fade"
            >
                <View style={{
                    position: 'absolute',
                    top: position.y + 30, // Adjust the top position as needed
                    //left: position.x,
                    width: '92%',
                    alignSelf: 'center',
                    backgroundColor: theme.COLORS.WHITE,
                    padding:theme.moderateScale(10),
                    maxHeight:150,

                }}>
                    <View>
                        <ScrollView 
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}>
                            {items && items.map((item: any, index) => (
                                <TouchableOpacity style={{paddingVertical:theme.verticalScale(5)}} key={index} onPress={() => handleItemPress(item)}>
                                    <Text style={{ color: theme.COLORS.BLACK }}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    constainer: {
        padding: theme.moderateScale(5),
        paddingHorizontal:theme.horizontalScale(10),
        marginVertical:theme.moderateScale(5),
        zIndex: 1,
        width: '100%',
        alignItems:'center',
        alignSelf: 'center',
        justifyContent:'space-between',
        flexDirection:'row',
        borderRadius:theme.moderateScale(10),
        backgroundColor:theme.COLORS.WHITE,
    }
})

export default memo(DropdownField);