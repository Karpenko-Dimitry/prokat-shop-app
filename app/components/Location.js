import React from "react";
import { Linking, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { companyColor } from "../services/ColorService";
import { useTheme } from "@react-navigation/native";
import { scale } from "../services/HelperService";

const Location = ({ size = 100, position = 'absolute', phoneNumber = null }) => {
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const styles = getStyles(colors, width, size, position);
    const link = () => {
        Linking.openURL(`https://goo.gl/maps/9wgw85mE1fELSsxz5`)
    }

    return (
        <TouchableOpacity style={styles.phone} onPress={link}>
            <Ionicons style={styles.phoneIcon} name='navigate' />
        </TouchableOpacity>
    )

}

const getStyles = (colors, width, size = 100, position = 'absolute') => {
    size = size / 100;

    position = position == 'absolute' ? {
        position: 'absolute',
        bottom: scale(30),
        right: scale(50),
    } : {}

    return StyleSheet.create({
        phone: Object.assign({
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: width / 16 + size,
            width: width / 8 * size,
            height: width / 8 * size,
            backgroundColor: companyColor
        }, position),
        phoneIcon: {
            color: 'white',
            fontSize: scale(25 * size)
        }
    })
}

export default Location;