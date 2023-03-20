import React from "react";
import { View, Text, StyleSheet, Image, useColorScheme, TouchableOpacity } from "react-native";
import { colors } from "../services/ColorService";
import { scale } from "../services/HelperService";

const Category = ({ category, styles = {}, width, navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    styles = getStyles({ styles, isDarkMode, width });

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation ? navigation.navigate('Category', {name: category.name}) : () => {}}>
            {category.image?.src && (<Image style={styles.image} source={{ uri: category.image.src }} />)}
            <View style={styles.textContainer}>
                <Text numberOfLines={3} style={styles.text}>{category.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const getStyles = ({isDarkMode = false, styles = {}, width = 120}) => {
    const modeColors = isDarkMode ? colors.darkModeColors : colors.whiteModeColors;

    return StyleSheet.create({
        container: {
            padding: scale(10),
            borderWidth: 1,
            borderColor: modeColors.borderColor,
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
            color: modeColors.textColor,
            fontSize: 12,
            textAlign: 'center'
        }
    });
}


export default Category;