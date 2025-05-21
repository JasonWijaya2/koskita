import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { getAccessToken } from "../lib/auth";

export default function Index() {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getToken = async () => {
            const token = await getAccessToken();
            setToken(token);
            setLoading(false);
        };

        getToken();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return <Redirect href={token ? "/(tabs)" : "/auth/login"} />;
}
