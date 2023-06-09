import React from "react";
import { View, StyleSheet, FlatList, useColorScheme, Text, TouchableOpacity } from "react-native";
import Product from "./Product";
import Category from "./Category";
import { scale } from "../services/HelperService";
import { colors, companyColor } from "../services/ColorService";
import { useTheme } from "@react-navigation/native";

const VerticalContainer = ({ items = [], category = null, type = 'products', title = "", navigation }) => {
    let { colors } = useTheme();
    let styles = getStyles({ colors });

    const navigationAll = () => {
        if (navigation) {
            if (type === 'categories') {
                navigation.navigate('Catalog')
            }
            
            if (type === 'products' && category) {
                navigation.navigate('Category', {name: category.name, item: category})
            }
        }
         
    }

    return (
        <>
            {items.length > 0 && (
                <View style={styles.container}>
                    <View style={styles.row}>
                        <View style={styles.titleContainer}>
                            <View>
                                <Text style={styles.title}>{title}</Text>
                            </View>
                            <TouchableOpacity onPress={navigationAll}>
                                <Text style={styles.titleLink}>Все</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <FlatList
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={items}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => type === 'categories' ? (<Category navigation={navigation} category={item} />) : (<Product navigation={navigation} product={item} />)}
                        />
                    </View>
                </View>
            )}
        </>


    )
}

const getStyles = ({ colors = {} }) => {
    return StyleSheet.create({
        container: {
            marginTop: scale(20),
        },
        titleContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: scale(10),
        },
        title: {
            textAlign: 'right',
            fontWeight: '600',
            color: colors.text
        },
        titleLink: {
            textAlign: 'right',
            fontWeight: '600',
            color: companyColor 
        },
        row: {
            flexDirection: 'row',
        },
    });
}

export default VerticalContainer;