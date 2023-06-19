import React from "react";
import { Linking, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { companyColor } from "../services/ColorService";
import { useTheme } from "@react-navigation/native";
import { scale } from "../services/HelperService";
import { PHONE_NUMBER_MTS } from "../../env";

const Phone = ({ position = 'absolute', phoneNumber = null, width = 42 }) => {
    const { colors } = useTheme();
    const styles = getStyles(colors, width, position);
    const phone = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`)
    }

    return (
        <TouchableOpacity style={styles.phone} onPress={() => phoneNumber ? phone(phoneNumber) :  phone(PHONE_NUMBER_MTS)}>
            <Ionicons style={styles.phoneIcon} name='call' />
        </TouchableOpacity>
    )

}

const getStyles = (colors, width, position = 'absolute') => {
    position = position == 'absolute' ? {
        position: 'absolute',
        bottom: scale(30),
        right: scale(50),
    } : {}

    return StyleSheet.create({
        phone: Object.assign({
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: width / 2,
            width: width,
            height: width,
            backgroundColor: companyColor
        }, position),
        phoneIcon: {
            color: 'white',
            fontSize: scale(width / 2)
        }
    })
}

export default Phone;