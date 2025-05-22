import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import api from "../../lib/api";

export default function Booking() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const property = params.property ? JSON.parse(params.property) : {};
    const [step, setStep] = useState(1);
    const [duration, setDuration] = useState(1);
    const [paymentType, setPaymentType] = useState("");
    const [bookingResult, setBookingResult] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleRent = async () => {
        try {
            const body = {
                kosanId: property.id,
                duration: duration,
                startDate: selectedDate.toISOString(),
            };
            const response = await api.post(`/api/rent`, body);
            setBookingResult(response.data.data);
            setStep(3);
        } catch (error) {
            console.log("Error booking:", error?.response?.data || error.message);
            setBookingResult(null);
        }
    };

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 bg-[#F9F6F1] border-b border-gray-200">
                <View className="flex-row items-center my-4 gap-4">
                    <TouchableOpacity onPress={() => router.back()} className="mr-2">
                        <Ionicons name="arrow-back" size={22} color="#222" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold">Pesan Kamar</Text>
                </View>
            </View>

            {/* Stepper */}
            <View className="flex-row items-center px-4 py-2 bg-[#F9F6F1]">
                <View className="flex-row items-center">
                    <Text className={`font-bold mr-1 ${step === 1 ? "text-black" : "text-gray-400"}`}>1</Text>
                    <Text className={`mr-4 ${step === 1 ? "text-black font-semibold" : "text-gray-400"}`}>Review data</Text>
                </View>
                <Text className="text-gray-400 mr-4">-</Text>
                <View className="flex-row items-center">
                    <Text className={`font-bold mr-1 ${step === 2 ? "text-black" : "text-gray-400"}`}>2</Text>
                    <Text className={`mr-4 ${step === 2 ? "text-black font-semibold" : "text-gray-400"}`}>Pembayaran</Text>
                </View>
                <Text className="text-gray-400 mr-4">-</Text>
                <View className="flex-row items-center">
                    <Text className={`font-bold mr-1 ${step === 3 ? "text-black" : "text-gray-400"}`}>3</Text>
                    <Text className={`${step === 3 ? "text-black font-semibold" : "text-gray-400"}`}>Selesai</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {step === 1 && (
                    <>
                        {/* Pesanan */}
                        <Text className="font-bold text-base mb-2">Pesanan</Text>
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="calendar-outline" size={18} color="#222" />
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display="default"
                                onChange={(event, date) => {
                                    if (date) setSelectedDate(date);
                                }}
                                minimumDate={new Date()}
                            />
                        </View>
                        <View className="bg-white rounded-xl border border-gray-200 mb-4 overflow-hidden">
                            <Image
                                source={{ uri: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" }}
                                style={{ width: "100%", height: 100 }}
                                resizeMode="cover"
                            />
                            <View className="p-3">
                                <Text className="font-bold mb-1">{property.name}</Text>
                                <Text className="text-xs text-gray-500 mb-2">
                                    No. kamar sebenarnya akan diinformasikan setelah booking
                                </Text>
                                <Text className="text-xs text-gray-500">
                                    1 Orang
                                </Text>
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
                            </View>
                        </View>
                        <TouchableOpacity
                            className="bg-black py-3 rounded-xl items-center mt-4"
                            onPress={() => setStep(2)}
                        >
                            <Text className="text-white font-semibold">Lanjut ke Pembayaran</Text>
                        </TouchableOpacity>
                    </>
                )}

                {step === 2 && (
                    <>
                        {/* Pilih Metode Pembayaran */}
                        <Text className="font-bold text-base mb-2 mt-2">Pilih metode pembayaran</Text>
                        <TouchableOpacity
                            className="flex-row items-center mb-3"
                            onPress={() => setPaymentType("bank")}
                        >
                            <View
                                className={`w-5 h-5 rounded-full border-2 mr-3 ${paymentType === "bank"
                                    ? "border-green-600 bg-green-600"
                                    : "border-gray-400 bg-white"
                                    }`}
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {paymentType === "bank" && (
                                    <View className="w-2.5 h-2.5 rounded-full bg-white" />
                                )}
                            </View>
                            <Text className="text-sm font-semibold">Transfer Bank</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-row items-center mb-3"
                            onPress={() => setPaymentType("ewallet")}
                        >
                            <View
                                className={`w-5 h-5 rounded-full border-2 mr-3 ${paymentType === "ewallet"
                                    ? "border-green-600 bg-green-600"
                                    : "border-gray-400 bg-white"
                                    }`}
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {paymentType === "ewallet" && (
                                    <View className="w-2.5 h-2.5 rounded-full bg-white" />
                                )}
                            </View>
                            <Text className="text-sm font-semibold">E-Wallet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-row items-center mb-3"
                            onPress={() => setPaymentType("lainnya")}
                        >
                            <View
                                className={`w-5 h-5 rounded-full border-2 mr-3 ${paymentType === "lainnya"
                                    ? "border-green-600 bg-green-600"
                                    : "border-gray-400 bg-white"
                                    }`}
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {paymentType === "lainnya" && (
                                    <View className="w-2.5 h-2.5 rounded-full bg-white" />
                                )}
                            </View>
                            <Text className="text-sm font-semibold">Lainnya</Text>
                        </TouchableOpacity>

                        {/* Pilih Durasi Sewa */}
                        <Text className="font-bold text-base mb-2 mt-4">Pilih Durasi Sewa (bulan)</Text>
                        <View className="flex-row items-center mb-4 gap-2">
                            <TouchableOpacity
                                className="px-3 py-1 bg-gray-200 rounded-l"
                                disabled={duration <= 1}
                                onPress={() => setDuration(duration - 1)}
                            >
                                <Text className="text-lg font-bold">-</Text>
                            </TouchableOpacity>
                            <View className="px-4 py-1">
                                <Text className="text-lg">{duration}</Text>
                            </View>
                            <TouchableOpacity
                                className="px-3 py-1 bg-gray-200 rounded-r"
                                onPress={() => setDuration(duration + 1)}
                            >
                                <Text className="text-lg font-bold">+</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Rincian Pembayaran */}
                        <Text className="font-bold text-base mb-2">Rincian Pembayaran</Text>
                        <View className="bg-gray-100 rounded-lg p-3 mb-4">
                            <Text className="text-xs text-gray-700 mb-1">
                                ✓ Termasuk fasilitas yang disediakan
                            </Text>
                            <Text className="text-xs text-gray-700">
                                ✓ {duration} bulan sewa + deposit
                            </Text>
                            <Text className="text-xs text-gray-700 mt-2 font-bold">
                                Total: Rp{property.price ? (property.price * duration).toLocaleString("id-ID") : "0"}
                            </Text>
                        </View>
                        {!paymentType && (
                            <Text style={{ color: "red", marginBottom: 8 }}>
                                Silakan pilih metode pembayaran terlebih dahulu.
                            </Text>
                        )}
                        <TouchableOpacity
                            className="bg-black py-3 rounded-xl items-center mt-2"
                            onPress={async () => {
                                if (paymentType) {
                                    await handleRent();
                                    console.log("Bayar Sekarang");
                                    console.log(bookingResult);

                                }
                            }}
                        >
                            <Text className="text-white font-semibold">Bayar Sekarang</Text>
                        </TouchableOpacity>
                    </>
                )}

                {step === 3 && bookingResult && (
                    <View className="items-center justify-center mt-10">
                        <Ionicons name="checkmark-circle" size={64} color="#22c55e" />
                        <Text className="text-2xl font-bold text-green-700 mt-4 mb-2">Pembayaran Berhasil!</Text>
                        <Text className="text-base text-gray-700 mb-6 text-center">
                            Booking Anda telah berhasil. Berikut detail pesanan:
                        </Text>
                        <View className="w-full bg-gray-100 rounded-xl p-4 mb-4">
                            <Text className="font-bold text-lg mb-2">{bookingResult.kosan.name}</Text>
                            <Text className="text-sm text-gray-700 mb-1">Alamat: {bookingResult.kosan.address}</Text>
                            <Text className="text-sm text-gray-700 mb-1">No. Kamar: {bookingResult.noKamar}</Text>
                            <Text className="text-sm text-gray-700 mb-1">Status: {bookingResult.status}</Text>
                            <Text className="text-sm text-gray-700 mb-1">Durasi: {bookingResult.duration} bulan</Text>
                            <Text className="text-sm text-gray-700 mb-1">
                                Tanggal Masuk: {new Date(bookingResult.startDate).toLocaleDateString()}
                            </Text>
                            <Text className="text-sm text-gray-700 mb-1">
                                Tanggal Keluar: {new Date(bookingResult.endDate).toLocaleDateString()}
                            </Text>
                            <Text className="text-sm text-gray-700 mb-1">
                                Harga: Rp{bookingResult.kosan.price.toLocaleString("id-ID")}
                            </Text>
                            <Text className="text-sm text-gray-700 mb-1">
                                Total: Rp{(bookingResult.kosan.price * bookingResult.duration).toLocaleString("id-ID")}
                            </Text>
                        </View>
                        <View className="w-full bg-white rounded-xl p-4 border border-gray-200">
                            <Text className="font-bold mb-1">Data Pemesan</Text>
                            <Text className="text-sm text-gray-700">Nama: {bookingResult.user.name}</Text>
                            <Text className="text-sm text-gray-700">Email: {bookingResult.user.email}</Text>
                        </View>
                        <TouchableOpacity
                            className="bg-green-600 py-3 px-8 rounded-xl items-center mt-8"
                            onPress={() => router.replace("/")}
                        >
                            <Text className="text-white font-semibold">Kembali ke Beranda</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}