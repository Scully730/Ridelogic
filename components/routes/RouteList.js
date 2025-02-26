import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { fetchRoutes } from "../../server/services/routeService.js";

const RouteList = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoutes()
      .then(setRoutes)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#7B1FA2" />
        <Text style={styles.loadingText}>Loading Routes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error loading routes. Please try again.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <Text>Available routes</Text>
      <FlatList
        data={routes}
        keyExtractor={(item) => item.pdf}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.routeText}>
              <Text style={styles.bold}>From:</Text> {item.from}
            </Text>
            <Text style={styles.routeText}>
              <Text style={styles.bold}>To:</Text> {item.to}
            </Text>
            <Text style={styles.routeText}>
              <Text style={styles.bold}>Effective Date:</Text> {item.effective_date}
            </Text>
            <Text style={styles.routeText}>
              <Text style={styles.bold}>Timetable No:</Text> {item.time_table_no}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3E5F5", // Light purple background
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#7B1FA2", // Deep purple
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 16,
    color: "#D32F2F", // Red error color
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#7B1FA2", // Dark purple
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 4, // Shadow effect for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  routeText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default RouteList;
