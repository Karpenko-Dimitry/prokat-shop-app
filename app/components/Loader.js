import { useTheme } from "@react-navigation/native";
import React from "react";
import { Modal, ActivityIndicator, StyleSheet, Dimensions, View, } from 'react-native'
import { scale } from "../services/HelperService";
import { companyColor } from "../services/ColorService";
const Loader = ({visible = false}) => {
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');

    const styles = StyleSheet.create({
        overlay: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.6,
            backgroundColor: colors.background,
        }
    })
    return (
        <Modal transparent={true} visible={visible}>
            <View style={styles.overlay}>
                <ActivityIndicator style={styles.spinner} size={scale(100)} color={companyColor} />
            </View>

        </Modal>
    )
}

export default Loader;