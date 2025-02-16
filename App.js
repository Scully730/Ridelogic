import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { COLORS, FONTS, SIZES } from "./constants/theme";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import { FlatList, TextInput } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus } from "@fortawesome/free-solid-svg-icons";

const Drawer = createDrawerNavigator();

// Home Screen
const HomeScreen = ({ navigation }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Open and close drawer handlers
  const openDrawer = () => {
    navigation.openDrawer();
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    navigation.closeDrawer();
    setIsDrawerOpen(false);
  };

  const buses = [
    { id: '1', route: 'Khayelitsha - Cape Town', time: '07:45' },
    { id: '2', route: 'Khayelitsha - Cape Town (Spine Rd)', time: '08:20' },
    { id: '3', route: 'Khayelitsha - Cape Town (Mew Way)', time: '08:45' }
  ]

  return (
    <View style={{
      flex: 1,
      backgroundColor: "#D5C7E8",
      padding: 10
    }}>
      {/* Show menu button only when drawer is closed */}
      {!isDrawerOpen && (
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <Image source={require("./assets/menu.png")} style={styles.menuIcon} />
        </TouchableOpacity>
      )}

      {/* Main Content */}

      <View
        style={{
          marginTop: 93
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 50
          }}
        >Pickup Point</Text>
        <TextInput
          style={{
            backgroundColor: "#FFFF",
            borderRadius: 5,
            marginVertical: 5,
            padding: 10,
            fontSize: 16,
            marginLeft: 50,
            height: 40,
            width: 306,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 10
          }}
          placeholder="Enter Your Stop"
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 50
          }}
        >Destination</Text>
        <TextInput
          style={{
            backgroundColor: "#FFFF",
            borderRadius: 5,
            marginVertical: 5,
            padding: 10,
            fontSize: 16,
            marginLeft: 50,
            height: 40,
            width: 306,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 10
          }}
          placeholder="Enter Your Destination"
        />

      </View>

      <View
        style={{
          flex: 1,
          marginVertical: 10,
          position: "relative",
        }}
      >
        <Text
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            fontWeight: "bold",
            backgroundColor: "#FFFF",
            padding: 5,
            borderRadius: 5,
            zIndex: 1
          }}
        >
          Latest Bus
        </Text>

        <MapView
          style={{
            flex: 1,
            borderRadius: 10,
            marginTop: "auto"
          }}
          initialRegion={{
            latitude: -34.0388,
            longitude: 18.6814,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          }}
        >
          <Marker
            coordinate={{ latitude: -34.0388, longitude: 18.6813 }}
            title="Bus Location"
            description="Currently here"
          />
        </MapView>

        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: "#A8C67B",
            borderRadius: 5,
            padding: 15,
            alignItems: "center",
            zIndex: 1
          }}
        >
          <Text
            style={{
              color: "#FFFF",
              fontSize: 16
            }}
          >Track Your Bus</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={buses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#FFFF",
              borderRadius: 5,
              padding: 10,
              marginVertical: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#000"
              }}
            >
              {item.route}
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "#FF4D4D"
              }}
            >
              {item.time}
            </Text>
          </View>
        )}
      />

    </View>

    
  );
};

// Profile Screen
const ProfileScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Profile Section</Text>
  </View>
);

// Custom Drawer Content
const CustomDrawerContent = ({ navigation, setIsDrawerOpen }) => (
  <View style={styles.drawerContainer}>
    {/* Profile Section */}
    <View style={styles.profileContainer}>
      <TouchableOpacity
        style={styles.profileSection}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          source={require('./assets/profile.png')}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>Mpupile Mashifane</Text>
          <Text style={styles.profileSubtitle}>View your profile</Text>
        </View>
      </TouchableOpacity>

      {/* Close Button */}
      <TouchableOpacity
        onPress={() => {
          navigation.closeDrawer();
          setIsDrawerOpen(false); // Ensure menu button shows on Home
        }}
        style={styles.closeButton}
      >
        <Image
          source={require("./assets/cross.png")}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
    </View>

    {/* Drawer Menu Items */}
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Home");
        setIsDrawerOpen(false); // Ensure menu button shows on Home
      }}
      style={styles.menuItem}
    >

      <Image
        source={require('./assets/home.png')} 
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.black
        }}
      />

      <Text style={styles.menuText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate("Tickets")}
      style={styles.menuItem}
    >

      <Image
        source={require('./assets/boarding-pass.png')} 
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.black
        }}
      />

      <Text style={styles.menuText}>Tickets</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate("Rewards")}
      style={styles.menuItem}
    >

      <Image
        source={require('./assets/trophy.png')} 
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.black
        }}
      />

      <Text style={styles.menuText}>Rewards</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate("Settings")}
      style={styles.menuItem}
    >

      <Image
        source={require('./assets/settings.png')}
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.black
        }}
      />

      <Text style={styles.menuText}>Settings</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate("Community")}
      style={styles.menuItem}
    >

      <Image
        source={require('./assets/community.png')} 
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.black
        }}
      />

      <Text style={styles.menuText}>Community</Text>
    </TouchableOpacity>

    {/* Logout */}
    <TouchableOpacity onPress={() => alert("Logged out!")} style={styles.logout}>

      <Image
        source={require('./assets/logout.png')} 
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.black,
          marginBottom: 15
        }}
      />

      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  </View>
);

// Other Screens
const TicketsScreen = () => (
  <View style={styles.container}>
            <Text
                style={styles.header}
            >Tickets</Text>

            {/* Subtitle Section */}

            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitleText}>You have 23 journeys left</Text>
              <Text style={styles.monthlyText}>Monthly Ticket</Text>
            </View>

            {/* Ticket Image */}

            <Image 
              source={require('./assets/ticket.png')}
              style={{
                width: '100%',
                height: 300,
                marginTop: 2,
                borderRadius: 10,
              }}
              resizeMode="contain"
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 15
              }}
            >

              <Text
              style={{
                fontSize: 20,
                color: "#000",
                fontWeight: 'bold'
              }}
            >Payments</Text>

              <TouchableOpacity
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10
                }}
              >
                <Text
                style={{
                  fontSize: 14,
                  color: '#808080'
                }}
              >
                See all
              </Text>
              </TouchableOpacity>
              
            </View>


            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                padding: 15,
                borderRadius: 10,
                marginBottom: 15,
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4
              }}
            >

              <Image 
                source={require('./assets/wallet.png')}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: SIZES.radius,
                  tintColor: COLORS.black
                }}
              />

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#000',
                  marginLeft: SIZES.radius
                }}
              >
                Credit Card
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  color: '#777',
                  marginBottom: 1
                }}
              >
                (Visa)
              </Text>

              
            </TouchableOpacity>

  </View>
);
const RewardsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Rewards</Text>
  </View>
);
const SettingsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Settings</Text>
  </View>
);
const CommunityScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Community</Text>
  </View>
);

// Main App
export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <CustomDrawerContent {...props} setIsDrawerOpen={setIsDrawerOpen} />
        )}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen name="Home">
          {(props) => <HomeScreen {...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Tickets" component={TicketsScreen} />
        <Drawer.Screen name="Rewards" component={RewardsScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Community" component={CommunityScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5C7E8",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    alignItems: 'center',
  },
  menuButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: "#D5C7E8",
    padding: 20,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  profileSubtitle: {
    color: "#FFF",
    fontSize: 14,
  },
  closeButton: {
    padding: 10,
  },
  closeIcon: {
    width: 20,
    height: 20,
    marginTop: 40
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuText: {
    fontSize: 18,
    color: "#FFF",
    marginLeft: 5
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: "auto",
  },
  logoutText: {
    fontSize: 18,
    color: "#FFF",
    marginBottom: 18
  },
  header: {
    alignItems: 'center',
    marginVertical: 40,
    textAlign: 'center',
    color: '#000',
    fontSize: 24,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: '#000',
  },
  monthlyText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600'
  }
});