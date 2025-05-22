import {
    View,
    TextInput,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import * as Linking from "expo-linking";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import PropertyCard from "../../../components/PropertyCard";
import Icon from "../../../assets/icon.png";
import { getAccessToken } from "../../lib/auth";
import api from "../../lib/api";

export default function Index() {
    const [search, setSearch] = useState("");
    const [listKos, setListKos] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const filteredProperties = listKos.filter(
        (item) =>
            item.name && item.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const getKos = async () => {
            try {
                const response = await api.get("/api/kos");
                setListKos(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getKos();
    }, []);

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                const response = await api.get("/api/user/profile");
                setUser(response.data.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
            setLoading(false);
        };

        getUser();
    }, []);

    useEffect(() => {
        const getToken = async () => {
            const token = await getAccessToken();
            console.log("Token:", token);
        };

        getToken();
    }, []);

    // Membagi data menjadi baris (2 kolom per baris)
    const rows = [];
    for (let i = 0; i < filteredProperties.length; i += 2) {
        rows.push(filteredProperties.slice(i, i + 2));
    }

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 16 }}
                className="flex-1 bg-white dark:bg-[#25292e]"
            >
                <View className="flex-1 bg-white dark:bg-[#25292e]">
                    {/* Header */}
                    <View className="bg-[#F6F1E7] rounded-bl-[64px] relative">
                        <Image
                            source={{
                                uri: "https://images.rukita.co/web/static/img/home-v2/300425/homepage-app.jpg?tr=c-at_max%2Cw-1440%2Cq-50",
                            }}
                            style={{
                                width: "100%",
                                height: 356,
                                borderBottomLeftRadius: 42,
                            }}
                        />
                        <View className="absolute top-6 left-9">
                            <Image
                                source={Icon}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                }}
                            />
                        </View>

                        {/* Search Bar */}
                        <View className="absolute bottom-2 left-7 right-5">
                            <View className="flex-row items-center justify-between bg-gray-100 dark:bg-[#1e293b] rounded-full p-2 mb-4">
                                <View className="items-center justify-center">
                                    <TextInput
                                        className="ml-3 items-center justify-center text-base text-gray-800 dark:text-white h-10"
                                        placeholder="Cari kos favoritmu..."
                                        placeholderTextColor="#94a3b8"
                                        value={search}
                                        onChangeText={setSearch}
                                    />
                                </View>
                                <View className="bg-[#009C95] rounded-full w-12 h-12 items-center justify-center">
                                    <Ionicons
                                        name="search"
                                        size={24}
                                        color="#fff"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className="flex px-3 pt-4">
                        <View className="flex gap-1 justify-start items-top px-3 py-5">
                            <Text className="text-4xl font-bold text-gray-900 dark:text-white">
                                {loading ? (
                                    <View className="w-32 h-10 rounded bg-gray-200" />
                                ) : (
                                    <Text className="text-4xl font-bold text-[#222]">
                                        Halo, {user?.name || "Kevin Via"}!
                                    </Text>
                                )}
                            </Text>

                            {loading ? (
                                <View className="w-48 h-4 rounded bg-gray-200 mt-2" />
                            ) : (
                                <Text className="text-lg text-gray-600 dark:text-gray-300">
                                    Temukan kos idamanmu di sini
                                </Text>
                            )}
                        </View>

                        <View className="flex flex-row gap-2 items-center px-3 pt-5 pb-3">
                            <Ionicons name="home" color="#009C95" size={16} />
                            <Text className="font-bold text-sm text-[#009C95]">
                                Coliving
                            </Text>
                        </View>

                        {rows.map((row, idx) => (
                            <View key={idx} className="flex-row gap-2 mb-2">
                                {row.map((item) => (
                                    <View key={item.id} className="flex-1">
                                        <PropertyCard
                                            property={item}
                                            onPress={() =>
                                                router.push(
                                                    `/detail/${item.id}`
                                                )
                                            }
                                        />
                                    </View>
                                ))}
                                {row.length < 2 && <View className="flex-1" />}
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                className="absolute bottom-4 right-4"
                onPress={() => {
                    Linking.openURL(`https://wa.me/6282338303655`);
                }}
            >
                <View className="w-16 h-16 bg-[#22c55e] rounded-full items-center justify-center">
                    <FontAwesome name="whatsapp" size={30} color="#fff" />
                </View>
            </TouchableOpacity>
        </>
    );
}
