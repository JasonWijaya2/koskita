import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "react-native";

export default function TabsLayout() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";
    const backgroundColor = isDark ? "#25292e" : "#fff";
    const headerTintColor = isDark ? "#fff" : "#25292e";
    const tabBarActiveTintColor = isDark ? "#ffd33d" : "#2870BD";

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor,
                },
                headerShadowVisible: false,
                headerTintColor,
                tabBarActiveTintColor,
                tabBarStyle: {
                    backgroundColor,
                    paddingBottom: 0,
                    height: 50,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "home-sharp" : "home-outline"}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    title: "About",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={
                                focused
                                    ? "information-circle"
                                    : "information-circle-outline"
                            }
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
