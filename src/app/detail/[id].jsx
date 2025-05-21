import { router, useLocalSearchParams } from "expo-router";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import properties from "../../db/kosan.json";
import * as Linking from "expo-linking";

export default function Detail() {
    const { id } = useLocalSearchParams();
    const property = properties.find((item) => item.id === id);

    const handleWhatsapp = () => {
        Linking.openURL(
            `https://wa.me/6282338303655?text=Halo%20Koskita,%20saya%20tertarik%20dengan%20kos%20ini.`
        );
    };

    if (!property) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Kos tidak ditemukan</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white dark:bg-[#25292e]">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 90 }}
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                {/* Gambar utama */}
                <View className="relative">
                    <Image
                        source={{ uri: property.image }}
                        style={{ width: "100%", height: 180 }}
                        resizeMode="cover"
                    />
                    {/* Icon atas */}
                    <View className="absolute top-3 left-3 flex-row space-x-2">
                        <TouchableOpacity
                            className="bg-white/80 p-2 rounded-full"
                            onPress={router.back}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={20}
                                color="#222"
                            />
                        </TouchableOpacity>
                    </View>
                    <View className="absolute top-3 right-3 flex-row space-x-2 gap-2">
                        <TouchableOpacity className="bg-white/80 p-2 rounded-full">
                            <Ionicons
                                name="heart-outline"
                                size={20}
                                color="#222"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-white/80 p-2 rounded-full">
                            <Ionicons
                                name="share-social-outline"
                                size={20}
                                color="#222"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-white/80 p-2 rounded-full">
                            <MaterialIcons name="menu" size={20} color="#222" />
                        </TouchableOpacity>
                    </View>
                    {/* Badge flash sale */}
                    <View className="absolute bottom-3 left-3 bg-red-600 px-2 py-1 rounded">
                        <Text className="text-xs text-white font-bold">
                            FLASH SALE
                        </Text>
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
                            {property.address}
                        </Text>

                        {/* Harga promo */}
                        <View className="flex-row items-center mb-1">
                            <View className="bg-red-100 px-1 rounded mr-1">
                                <Text className="text-xs text-red-600 font-bold">
                                    -7%
                                </Text>
                            </View>
                            <Text className="text-base text-gray-400 line-through mr-2">
                                Rp
                                {property.price_before?.toLocaleString(
                                    "id-ID"
                                ) || "2.600.000"}
                            </Text>
                        </View>
                        <Text className="text-2xl font-bold text-red-600 mb-1">
                            Rp
                            {property.price?.toLocaleString("id-ID") ||
                                "2.350.000"}{" "}
                            <Text className="text-base text-gray-700">
                                /bulan
                            </Text>
                        </Text>
                        <Text className="text-xs text-green-700 mb-2">
                            Hemat Rp250k/bln untuk 12 bulan pertama, Rp100k/bln
                            berikutnya
                        </Text>
                    </View>

                    {/* Section Lokasi */}
                    <View className="mt-4">
                        <Text className="font-bold text-base text-xl mb-2">
                            Lokasi
                        </Text>
                        <View
                            className="bg-gray-100 rounded-xl overflow-hidden mb-2"
                            style={{ height: 140 }}
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
                        </View>
                        <Text className="text-xs text-gray-700 px-2 pb-2">
                            {property.address}
                        </Text>
                    </View>

                    {/* Section Tata Tertib */}
                    <View className="mt-4">
                        <Text className="font-bold text-base text-xl mb-2">
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
                className="flex-row space-x-2 px-4 py-3 bg-white dark:bg-[#25292e] border-t border-gray-200 dark:border-gray-700"
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
            >
                <TouchableOpacity
                    onPress={handleWhatsapp}
                    className="flex-1 bg-green-100 py-3 rounded-xl items-center flex-row justify-center"
                >
                    <FontAwesome name="whatsapp" size={18} color="#22c55e" />
                    <Text className="text-green-700 font-semibold ml-2">
                        Chat Koskita
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-black py-3 rounded-xl items-center ml-2">
                    <Text className="text-white font-semibold">
                        Lihat Tipe Kamar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
