import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WellcomeScreen from "../screens/WellcomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slicers/productsSlicer";
import { fetchCategories } from "../store/slicers/categoriesSlicer";
import TabNavigator from "./TabNavigator";
import { borderColor, textColor } from "../services/ColorService";
const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
    const dispatch = useDispatch();
    const productsStore = useSelector((state) => state.productsStore);
    const categoriesStore = useSelector((state) => state.categoriesStore);
    const scheme = useColorScheme();

    const MyDarkTheme = {
        dark: true,
        colors: {
            ...DarkTheme.colors,
            border: '#323232',
        },
    };
    
    const MyDefaultTheme = {
        dark: true,
        colors: {
            ...DefaultTheme.colors,
            border: borderColor,
            text: textColor
        },
    };

    useEffect(() => {
        dispatch(fetchCategories({ page: categoriesStore.next_page }));
    }, [categoriesStore.next_page]);

    useEffect(() => {
        dispatch(fetchProducts({ page: productsStore.next_page }));
    }, [productsStore.next_page]);


    return (
        <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyDefaultTheme}>
            {productsStore.loading || categoriesStore.loading ? (
                <Stack.Navigator>
                    <Stack.Screen
                        name="Wellcome"
                        component={WellcomeScreen}
                        options={({ route }) => ({
                            title: route.params?.name,
                            headerShown: false,
                        })}
                    />
                </Stack.Navigator>
            ) : (
                <TabNavigator />
            )}


        </NavigationContainer>
    )
}

export default MainStackNavigator;