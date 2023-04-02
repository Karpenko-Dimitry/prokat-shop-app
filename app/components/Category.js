import React from "react";
import { View, Text, StyleSheet, Image, useColorScheme, TouchableOpacity } from "react-native";
import { colors } from "../services/ColorService";
import { scale } from "../services/HelperService";
import { useTheme } from "@react-navigation/native";
const Category = ({ category, styles = {}, width, navigation }) => {
    const { colors } = useTheme();
    styles = getStyles({ styles, colors, width });

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation ? navigation.navigate('Category', {item: category, name: category.name }) : () => {}}>
            {category.image?.src && (<Image style={styles.image} source={{ uri: category.image.src }} />)}
            <View style={styles.textContainer}>
                <Text numberOfLines={3} style={styles.text}>{category.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const getStyles = ({isDarkMode = false, styles = {}, colors = {}, width = 120}) => {
    const modeColors = isDarkMode ? colors.darkModeColors : colors.whiteModeColors;

    return StyleSheet.create({
        container: {
            padding: scale(10),
            borderWidth: 1,
            borderColor: colors.border,
            marginTop: scale(10),
            ...(styles.container || {})
        },
        image: {
            borderColor: 'red',
            borderRadius: scale(7),
            width: scale(width),
            height: scale(width),
            ...(styles.container || {})
        },
        textContainer: {
            width: scale(width),
        },
        text: {
            color: colors.text,
            fontSize: 12,
            textAlign: 'center'
        }
    });
}


export default Category;