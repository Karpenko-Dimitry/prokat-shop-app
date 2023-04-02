import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InfoMainScreen from "../screens/InfoMainScreen";
import ContactsScreen from "../screens/ContactsScreen";
import DeliveryScreen from "../screens/DeliveryScreen";
import ConditionsScreen from "../screens/ConditionsScreen";

const Stack = createNativeStackNavigator();

const InfoStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="InfoMenu"
                component={InfoMainScreen}
                options={({ route }) => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="Contacts"
                component={ContactsScreen}
                options={({ route }) => ({
                    title: "Контакты",
                    headerShown: true,
                })}
            />
            <Stack.Screen
                name="Delivery"
                component={DeliveryScreen}
                options={({ route }) => ({
                    title: "Доставка и оплата",
                    headerShown: true,
                })}
            />
            <Stack.Screen
                name="Conditions"
                component={ConditionsScreen}
                options={({ route }) => ({
                    title: "Условия проката",
                    headerShown: true,
                })}
            />
        </Stack.Navigator>
    )
}

export default InfoStackNavigator;