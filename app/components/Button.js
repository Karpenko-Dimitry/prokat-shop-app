import React from "react";
import { TouchableOpacity, Text, useColorScheme, StyleSheet } from "react-native";
import { colors, companyColor } from "../services/ColorService";
import { scale } from "../services/HelperService";

const Button = ({ text = '', onPress = () => {}}) => {
    const isDarkMode = useColorScheme() === 'dark';
    const styles = getStyles({ isDarkMode })

    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const getStyles = () => {
    return StyleSheet.create({
        container: {
            flex: 1
        },
        buttonRow: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            padding: scale(10),
            marginTop: scale(10)
        },
        button: {
            padding: scale(10),
            backgroundColor: companyColor,
            elevation: 20,
            borderWidth: 1,
            borderColor: companyColor,
            borderRadius: 7,
            shadowOffset: {
                width: 5,
                height: 5
            },
            shadowColor: '#000',
            shadowOpacity: 0.5,
            shadowRadius: 5,
        },
        buttonText: {
            textAlign: 'center',
            color: "#fff"
        }
    });
}

export default Button;
