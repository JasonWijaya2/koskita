import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import {
    MaterialIcons,
    Feather,
    FontAwesome5,
    Ionicons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await api.get("/api/user/profile");
                setUser(response.data.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        getUser();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
                {/* Header */}
                <View
                    style={{
                        backgroundColor: "#F6F1E7",
                        paddingBottom: 32,
                        borderBottomLeftRadius: 32,
                        borderBottomRightRadius: 32,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 24,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: "bold",
                                color: "#222",
                            }}
                        >
                            Profile
                        </Text>
                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color="#222"
                        />
                    </View>
                    <View style={{ alignItems: "center", marginTop: 8 }}>
                        <View
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                backgroundColor: "#E0E0E0",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Feather name="user" size={48} color="#BDBDBD" />
                        </View>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                marginTop: 12,
                                color: "#222",
                            }}
                        >
                            {user?.name || "Kevin Via"}
                        </Text>

                        <Text className="text-gray-500 mt-2">
                            {user?.email} | {user?.phonenumber}
                        </Text>
                    </View>
                </View>

                {/* Layanan Lainnya */}
                <View style={{ marginTop: 32, paddingHorizontal: 24 }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 16,
                            marginBottom: 16,
                            color: "#222",
                        }}
                    >
                        Layanan lainnya
                    </Text>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 12,
                        }}
                    >
                        <MaterialIcons
                            name="assignment"
                            size={22}
                            color="#222"
                        />
                        <Text
                            style={{
                                marginLeft: 16,
                                fontSize: 15,
                                color: "#222",
                            }}
                        >
                            Daftarkan properti saya
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 12,
                        }}
                    >
                        <Feather name="gift" size={22} color="#222" />
                        <Text
                            style={{
                                marginLeft: 16,
                                fontSize: 15,
                                color: "#222",
                            }}
                        >
                            Ajak teman, dapat reward!
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Pengaturan */}
                <View style={{ marginTop: 32, paddingHorizontal: 24 }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 16,
                            marginBottom: 16,
                            color: "#222",
                        }}
                    >
                        Pengaturan
                    </Text>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 12,
                        }}
                    >
                        <Feather name="user" size={22} color="#222" />
                        <Text
                            style={{
                                marginLeft: 16,
                                fontSize: 15,
                                color: "#222",
                            }}
                        >
                            Ubah profil
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 12,
                        }}
                    >
                        <Feather name="file-text" size={22} color="#222" />
                        <Text
                            style={{
                                marginLeft: 16,
                                fontSize: 15,
                                color: "#222",
                            }}
                        >
                            Data pribadi
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 12,
                        }}
                    >
                        <Feather name="lock" size={22} color="#222" />
                        <Text
                            style={{
                                marginLeft: 16,
                                fontSize: 15,
                                color: "#222",
                            }}
                        >
                            Ubah kata sandi
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
