import React from "react";
import { Linking, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { companyColor } from "../services/ColorService";
import { useTheme } from "@react-navigation/native";
import { scale } from "../services/HelperService";

const Location = ({ width = 42, position = 'absolute', phoneNumber = null }) => {
    const { colors } = useTheme();
    const styles = getStyles(colors, width, position);
    const link = () => {
        Linking.openURL(`https://goo.gl/maps/9wgw85mE1fELSsxz5`)
    }

    return (
        <TouchableOpacity style={styles.phone} onPress={link}>
            <Ionicons style={styles.phoneIcon} name='navigate' />
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

export default Location;