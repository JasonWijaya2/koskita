import { router, useLocalSearchParams } from "expo-router";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Linking from "expo-linking";
import { useEffect, useState, useRef } from "react";
import api from "../../lib/api";
import Icon from "../../../assets/icon.png"

export default function Detail() {
    const { id } = useLocalSearchParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState("");
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await api.get(`/api/kos/${id}`);
                setProperty(response.data.data);
            } catch (error) {
                setProperty(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    useEffect(() => {
        const fetchCity = async () => {
            if (
                property &&
                property.latitude &&
                property.longitude
            ) {
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${property.latitude}&lon=${property.longitude}&zoom=10&addressdetails=1`
                    );
                    const data = await res.json();
                    setCity(
                        data.address?.city ||
                        data.address?.town ||
                        data.address?.village ||
                        data.address?.county ||
                        ""
                    );
                } catch (e) {
                    setCity("");
                }
            }
        };
        fetchCity();
    }, [property]);

    const handleWhatsapp = () => {
        const message = `Halo Koskita!\n\nSaya ingin bertanya terkait kamar kos ${property.name}. Apakah boleh dibantu?\n\nTerima kasih`;
        const url = `https://wa.me/6282338303655?text=${encodeURIComponent(message)}`;

        Linking.openURL(url);
    };

    const handleBooking = () => {
        router.push({
            pathname: "/detail/booking",
            params: { property: JSON.stringify(property) }
        });
    };

    if (loading) {
        return (
            <View className="flex-1 bg-white dark:bg-[#25292e]">
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 90 }}
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Skeleton Gambar utama */}
                    <View className="relative">
                        <View
                            style={{ width: "100%", height: 180, backgroundColor: "#e5e7eb" }}
                            className="rounded"
                        />
                        <View className="absolute top-3 left-3 flex-row space-x-2">
                            <View className="bg-white/80 p-2 rounded-full w-8 h-8" />
                        </View>
                        <View className="absolute top-3 right-3 flex-row space-x-2 gap-2">
                            <View className="bg-white/80 p-2 rounded-full w-8 h-8" />
                            <View className="bg-white/80 p-2 rounded-full w-8 h-8" />
                            <View className="bg-white/80 p-2 rounded-full w-8 h-8" />
                        </View>
                        <View className="absolute bottom-3 left-3 bg-red-300 px-6 py-2 rounded" />
                    </View>

                    {/* Skeleton Gallery */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="flex-row px-3 py-2 space-x-2"
                    >
                        {[...Array(4)].map((_, idx) => (
                            <View
                                key={idx}
                                style={{ width: 80, height: 60, backgroundColor: "#e5e7eb" }}
                                className="rounded mr-2"
                            />
                        ))}
                    </ScrollView>

                    {/* Skeleton Konten */}
                    <View className="px-4 pb-4">
                        <View style={{ height: 24, backgroundColor: "#e5e7eb", borderRadius: 6, marginTop: 8, marginBottom: 8 }} />
                        <View style={{ height: 16, backgroundColor: "#e5e7eb", borderRadius: 6, marginBottom: 8, width: 180 }} />
                        <View style={{ height: 20, backgroundColor: "#e5e7eb", borderRadius: 6, marginBottom: 8, width: 120 }} />
                        <View style={{ height: 32, backgroundColor: "#e5e7eb", borderRadius: 6, marginBottom: 8, width: 200 }} />
                        <View style={{ height: 12, backgroundColor: "#e5e7eb", borderRadius: 6, marginBottom: 8, width: 140 }} />

                        {/* Skeleton Map */}
                        <View className="mt-4">
                            <View
                                style={{ height: 140, backgroundColor: "#e5e7eb", borderRadius: 12, marginBottom: 8 }}
                            />
                            <View style={{ height: 12, backgroundColor: "#e5e7eb", borderRadius: 6, width: 180 }} />
                        </View>

                        {/* Skeleton Tata Tertib */}
                        <View className="mt-4 space-y-2">
                            {[...Array(4)].map((_, idx) => (
                                <View
                                    key={idx}
                                    style={{ height: 14, backgroundColor: "#e5e7eb", borderRadius: 6, marginBottom: 6, width: "90%" }}
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>
                {/* Skeleton Tombol aksi sticky */}
                <View
                    className="flex-row space-x-2 px-4 py-3 bg-white dark:bg-[#25292e] border-t border-gray-200 dark:border-gray-700"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                >
                    <View className="flex-1 bg-gray-200 py-3 rounded-xl" />
                    <View className="flex-1 bg-gray-200 py-3 rounded-xl ml-2" />
                </View>
            </View>
        );
    }

    if (!property) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-xl font-bold text-red-500">Error Not Found</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white dark:bg-[#25292e]">
            {/* Icon atas sticky */}
            <View
                className="absolute top-0 left-0 right-0 z-50"
                pointerEvents="box-none"
                style={{ paddingTop: 32, paddingHorizontal: 16 }} // paddingTop: 32 untuk status bar
            >
                <View
                    className={`flex-row justify-between items-center transition-all duration-300 shadow rounded-b-2xl`}
                    style={{
                        padding: 8,
                        marginHorizontal: -16,
                        marginTop: -32,
                        minHeight: 56,
                    }}
                >
                    <View className="flex-row space-x-2">
                        <TouchableOpacity
                            className="p-2 rounded-full"
                            style={{
                                backgroundColor: "#f3f4f6",
                            }}
                            onPress={router.back}
                        >
                            <Ionicons name="arrow-back" size={20} color="#222" />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row space-x-2 gap-2">
                        <TouchableOpacity
                            className="p-2 rounded-full"
                            style={{
                                backgroundColor: "#f3f4f6",
                            }}
                        >
                            <Ionicons name="heart-outline" size={20} color="#222" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="p-2 rounded-full"
                            style={{
                                backgroundColor: "#f3f4f6",
                            }}
                        >
                            <Ionicons name="share-social-outline" size={20} color="#222" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="p-2 rounded-full"
                            style={{
                                backgroundColor: "#f3f4f6",
                            }}
                        >
                            <MaterialIcons name="menu" size={20} color="#222" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView
                ref={scrollRef}
                contentContainerStyle={{ paddingBottom: 90 }}
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                {/* Gambar utama */}
                <View className="relative">
                    <Image
                        source={{ uri: property.image?.trim() ? property.image : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" }}
                        style={{ width: "100%", height: 180 }}
                        resizeMode="cover"
                    />
                    {/* Badge */}
                    <View className="absolute bottom-3 left-3 bg-white/80 px-2 py-1 rounded">
                        <View className="flex-row justify-center items-center gap-1">
                            <Image
                                source={Icon}
                                style={{ width: 10, height: 10, borderRadius: 20 }}
                            />
                            <Text className="text-xs font-bold text-gray-700">Koskita</Text>
                        </View>
                    </View>
                </View>

                {/* Gallery */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="flex-row px-3 py-2 space-x-2"
                >
                    {property.gallery?.map((img, idx) => (
                        <Image
                            key={idx}
                            source={{ uri: img }}
                            style={{ width: 80, height: 60, borderRadius: 8 }}
                            resizeMode="cover"
                            className="mr-2"
                        />
                    ))}
                </ScrollView>

                {/* Konten */}
                <View className="px-4 pb-4">
                    {/* Section Harga */}
                    <View>
                        <Text className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                            {property.name}
                        </Text>
                        <Text className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            {city}
                        </Text>
                    </View>

                    {/* Section Fasilitas Bersama */}
                    <View className="mt-4">
                        <Text className="font-bold text-xl mb-2">
                            Fasilitas
                        </Text>
                        <View className="flex-row flex-wrap">
                            {property.facilities && property.facilities.length > 0 ? (
                                property.facilities.map((item) => (
                                    <View
                                        key={item.id}
                                        className="flex-row items-center mr-6 mb-3"
                                        style={{ minWidth: 120 }}
                                    >
                                        {/* Ganti icon sesuai nama fasilitas */}
                                        {item.name === "Wifi" && (
                                            <Ionicons name="wifi-outline" size={20} color="#444" style={{ marginRight: 6 }} />
                                        )}
                                        {item.name === "Parkir Motor" && (
                                            <MaterialIcons name="local-parking" size={20} color="#444" style={{ marginRight: 6 }} />
                                        )}
                                        {item.name === "Ruang Tamu" && (
                                            <FontAwesome name="bed" size={20} color="#444" style={{ marginRight: 6 }} />
                                        )}
                                        {item.name === "Cleaning" && (
                                            <MaterialIcons name="cleaning-services" size={20} color="#444" style={{ marginRight: 6 }} />
                                        )}
                                        {item.name === "Laundry" && (
                                            <MaterialIcons name="local-laundry-service" size={20} color="#444" style={{ marginRight: 6 }} />
                                        )}
                                        {item.name === "CCTV" && (
                                            <MaterialIcons name="videocam" size={20} color="#444" style={{ marginRight: 6 }} />
                                        )}
                                        {item.name === "AC" && (
                                            <Ionicons name="snow-outline" size={20} color="#444" style={{ marginRight: 6 }} />
                                        )}
                                        {item.name === "Kasur" && (
                                            <FontAwesome name="bed" size={20} color="#444" style={{ marginRight: 6 }} />
                                        )}
                                        {/* Default icon jika tidak ada yang cocok */}
                                        {![
                                            "Wifi",
                                            "Parkir Motor",
                                            "Ruang Tamu",
                                            "Cleaning",
                                            "Laundry",
                                            "CCTV",
                                            "AC",
                                            "Kasur"
                                        ].includes(item.name) && (
                                                <Ionicons name="home-outline" size={20} color="#444" style={{ marginRight: 6 }} />
                                            )}
                                        <Text className="text-gray-700 dark:text-gray-300">{item.name}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text className="text-gray-500">Tidak ada fasilitas</Text>
                            )}
                        </View>
                    </View>

                    {/* Section Lokasi */}
                    <View className="mt-4">
                        <Text className="font-bold text-xl mb-2">
                            Lokasi
                        </Text>
                        <View
                            className="bg-gray-100 rounded-xl overflow-hidden mb-2"
                            style={{ height: 200 }}
                        >
                            <MapView
                                style={{ flex: 1 }}
                                initialRegion={{
                                    latitude: property.latitude,
                                    longitude: property.longitude,
                                    latitudeDelta: 0.005,
                                    longitudeDelta: 0.005,
                                }}
                                scrollEnabled={false}
                                zoomEnabled={false}
                                pitchEnabled={false}
                                rotateEnabled={false}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: property.latitude,
                                        longitude: property.longitude,
                                    }}
                                />
                            </MapView>

                            <Text className="text-md font-semibold text-gray-700 px-2 pb-2">
                                {property.address}
                            </Text>
                        </View>
                    </View>

                    {/* Section Tata Tertib */}
                    <View className="mt-4">
                        <Text className="font-bold text-xl mb-2">
                            Tata Tertib
                        </Text>
                        <View className="space-y-2">
                            <View className="flex-row items-start">
                                <Text className="text-gray-700 dark:text-gray-300">
                                    •{" "}
                                </Text>
                                <Text className="text-gray-700 dark:text-gray-300 flex-1">
                                    Tidak boleh merokok di dalam kamar.
                                </Text>
                            </View>
                            <View className="flex-row items-start">
                                <Text className="text-gray-700 dark:text-gray-300">
                                    •{" "}
                                </Text>
                                <Text className="text-gray-700 dark:text-gray-300 flex-1">
                                    Akses 24 jam.
                                </Text>
                            </View>
                            <View className="flex-row items-start">
                                <Text className="text-gray-700 dark:text-gray-300">
                                    •{" "}
                                </Text>
                                <Text className="text-gray-700 dark:text-gray-300 flex-1">
                                    Aturan menginap: maksimal 1 hari. Setelah
                                    itu dikenakan charge Rp50.000/malam. Hanya
                                    boleh teman sesama jenis atau keluarga
                                    kandung.
                                </Text>
                            </View>
                            <View className="flex-row items-start">
                                <Text className="text-gray-700 dark:text-gray-300">
                                    •{" "}
                                </Text>
                                <Text className="text-gray-700 dark:text-gray-300 flex-1">
                                    Aturan bertamu: maksimal sampai jam 10
                                    malam. Tamu lawan jenis dilarang masuk
                                    kamar.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Tombol aksi sticky */}
            <View
                className="flex-col gap-2 space-x-2 px-4 py-3 bg-white dark:bg-[#25292e] border-t border-gray-200 dark:border-gray-700"
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
            >
                {/* Harga promo */}
                <View className="flex-row items-center mb-1">
                    <Text className="text-2xl font-bold text-red-600 mb-1">
                        Rp
                        {property.price?.toLocaleString("id-ID") ||
                            "0.000.000"}{" "}
                        <Text className="text-base text-gray-700">
                            /bulan
                        </Text>
                    </Text>
                </View>
                <View className="flex-row gap-2">
                    <TouchableOpacity
                        onPress={handleWhatsapp}
                        className="flex-1 bg-green-100 py-3 rounded-xl items-center flex-row justify-center"
                    >
                        <FontAwesome name="whatsapp" size={18} color="#22c55e" />
                        <Text className="text-green-700 font-semibold ml-2">
                            Chat Koskita
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleBooking}
                        className="flex-1 bg-[#F4B948] py-3 rounded-xl items-center flex-row justify-center"
                    >
                        <Text className="text-black font-semibold ml-2">
                            Pesan Kamar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
