import React from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import {
    createDrawerNavigator,
    DrawerContentScrollView
} from "@react-navigation/drawer";
import ProfileScreen from "./ProfileScreen";
import Home from "./Home";
import { SIZES, COLORS, FONTS } from "../constants/theme";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomDrawerContent = ({navigation}) => {
    <DrawerContentScrollView
    scrollEnabled={true}
    contentContainerStyle={{ flex: 1 }}
    >
        <View
            style={{
                flex: 1,
                paddingHorizontal: SIZES.radius
            }}
        >
            <View
                style={{
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                }}
            >
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.closeDrawer()}
                >
                    <Image 
                        source={require('../assets/cross.png')}
                        style={{
                            height: 100,
                            width: 100,
                            tintColor: COLORS.black
                        }}
                    />
                </TouchableOpacity>

            </View>

            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    marginTop: SIZES.radius,
                    alignItems: 'center'
                }}
                onPress={() => console.log("Profile")}
                >
                    <Image 
                        source={require('../assets/profile.png')}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: SIZES.radius
                        }}
                    />

                    <View
                        style={{
                            marginLeft: SIZES.radius
                        }}
                    >
                        <Text
                            style={{ color: COLORS.gray, ...FONTS.h3}}
                        >Mpupile Mashifane</Text>
                        <Text
                            style={{ color: COLORS.gray, ...FONTS.h4}}
                        >View your profile</Text>
                    </View>
                </TouchableOpacity>

        </View>
    </DrawerContentScrollView>
}


const CustomDrawer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="CustomDrawer">
                    {()=>(
                        <Drawer.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                        drawerContent={props => {
                            return (
                                <CustomDrawerContent
                                    navigation={props.navigation}
                                />
                            )
                        }}
                        >
                                <Drawer.Screen name="Home" component={Home}>
                                </Drawer.Screen>
                        </Drawer.Navigator>
                    )
                    
                    }
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>


    )
}

export default CustomDrawer;