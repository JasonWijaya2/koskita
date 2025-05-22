import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useColorScheme } from "react-native";

export default function TabsLayout() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    const theme = {
        light: {
            backgroundColor: "#fff",
            headerTintColor: "#25292e",
            tabBarActiveTintColor: "#009C95",
        },
        dark: {
            backgroundColor: "#25292e",
            headerTintColor: "#fff",
            tabBarActiveTintColor: "#E7E1D1",
        },
    };

    const currentTheme = isDark ? theme.dark : theme.light;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: currentTheme.backgroundColor,
                },
                headerShadowVisible: false,
                headerTintColor: currentTheme.headerTintColor,
                tabBarActiveTintColor: currentTheme.tabBarActiveTintColor,
                tabBarStyle: {
                    backgroundColor: currentTheme.backgroundColor,
                    paddingBottom: 0,
                    height: 50,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Explore",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "search-circle" : "search-outline"}
                            color={color}
                            size={focused ? 24 : 20}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="mykos"
                options={{
                    title: "My Kos",
                    tabBarIcon: ({ color, focused }) => (
                        <AntDesign
                            name={focused ? "home" : "home"}
                            color={color}
                            size={20}
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
                            size={20}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
