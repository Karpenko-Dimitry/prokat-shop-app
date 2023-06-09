import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { scale } from "../services/HelperService";
import VerticalContainer from "../components/VerticalContainer"
import { companyColor } from "../services/ColorService";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
    const categories = useSelector(state => state.categoriesStore.categories);
    const products = useSelector(state => state.productsStore.products);
    const { colors } = useTheme();
    const styles = getStyles({ colors })

    const getProductsByCategoryId = (categoryId) => {
        return products.filter(product => {
            let ids = product.categories?.map(i => i.id);
            return ids.includes(categoryId);
        })
    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[companyColor]} />}>
                <VerticalContainer items={categories} type={"categories"} title={'Категории товаров'} navigation={navigation} />
                {categories.length > 0 && categories.map((category, key) => key <= 4 && (
                    <VerticalContainer
                        key={key + '_' + category.id}
                        category={category}
                        items={getProductsByCategoryId(category.id)}
                        title={category.name}
                        navigation={navigation}
                    />
                ))}
                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={() => navigation.navigate('Catalog')} style={styles.button}>
                        <Text style={styles.buttonText}>
                            Все категории
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const getStyles = ({ colors = {} }) => {
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
            color: "#fff"
        }
    });
}

export default HomeScreen;