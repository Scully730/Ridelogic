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
                        height: 35,
                        width: 35,
                        tintColor: COLORS.black
                    }}
                    />
                </TouchableOpacity>



                <TouchableOpacity
                style={{
                    alignItems: 'row',
                    marginTop: SIZES.radius,
                    justifyContent: 'center'
                }}
                onPress={() => console.log("Profile")}
                >
                    <Image 
                    source={require('../assets/profile.png')}
                    style={{
                        height: 50,
                        width: 50,
                        borderRadius: SIZES.radius
                    }}
                    />
                </TouchableOpacity>

            </View>

        </View>
    </DrawerContentScrollView>
}

drawerContent={props => {
    return (
        <CustomDrawerContent
            navigation={props.navigation}
        />
    )
}}

import CustomDrawer from "./navigation/customDrawer";
import { DrawerContent } from "@react-navigation/drawer";

<View
style={{
  alignItems: 'flex-start',
  justifyContent: 'center'
}}
>
<Text
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    paddingTop: 20
  }}
>
  RIDELOGIC
</Text>
</View>

// my code //

import React, { useRef, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native";
import { SIZES, COLORS, FONTS } from "./constants/theme";
import Animated from "react-native";

const App = () => {
  const [currentButton, setCurrentButton] = useState("Rewards");
  // hide the layout
  const [showMenu, setShowMenu] = useState(false);

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FF6C44",
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      }}
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
                    onPress={() => console.log("Close")}
                >
                    <Image 
                        source={require('./assets/cross.png')}
                        style={{
                            height: 35,
                            width: 35,
                            tintColor: COLORS.white
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
                        source={require('./assets/profile.png')}
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
                            style={{ color: COLORS.white, ...FONTS.h3}}
                        >Mpupile Mashifane</Text>
                        <Text
                            style={{ color: COLORS.white, ...FONTS.h4}}
                        >View your profile</Text>
                    </View>
                </TouchableOpacity>

                <View style={{
                  flexGrow: 1,
                  marginTop: 10
                }}>
                  {
                    // tabs //
                  }

                  {Buttons(currentButton, setCurrentButton, "Tickets")}
                  {Buttons(currentButton, setCurrentButton, "Rewards")}
                  {Buttons(currentButton, setCurrentButton, "Settings")}
                  {Buttons(currentButton, setCurrentButton, "Community")}
                </View>

                <View>
                {Buttons(currentButton, setCurrentButton, "Logout")}
                </View>

        </View>

        {
          // overlay view
        }

        <Animated.View
          style={{
            flexGrow: 1,
            backgroundColor: 'white',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 15,
            paddingVertical: 20,
            // tranforming the view //
            transform: [
              { scale: scaleValue },
              { translateX: offsetValue },
            ]
          }}
        >

          <TouchableOpacity
          onPress={() => {
            // actions //
            // scaling the value //
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            }).start()

            Animated.timing(offsetValue, {
              toValue: showMenu ? 1 : 0.88, // Adjust 250 based on drawer width
              duration: 300,
              useNativeDriver: true,
            }).start();

              setShowMenu(!showMenu);
          }}
          >

            <Image
              source={require('./assets/menu.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: 'black',
                marginTop: 40,
              }}
            >
            </Image>

          </TouchableOpacity>
          
        </Animated.View>
    </SafeAreaView>
  )
}

// multiple tabs //

const Buttons = (currentButton, setCurrentButton, title) => {
  return (
    <TouchableOpacity onPress={() => {
      if (title == "Logout") {
        // do the stuff //
      } else {
        setCurrentButton(title)
      }
    }}>
                 <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 8,
                    backgroundColor: currentButton == title ? 'white' : 'transparent',
                    borderRadius: 8,
                    marginTop: 15
                  }}
                  >
                    {
                      // image //
                    }

                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        paddingLeft: 15,
                        color: currentButton == title ? "#FF6C44" : "white"
                      }}
                    >
                      {title}
                    </Text>

                  </View>
                 </TouchableOpacity>
  );
}

export default App

