import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";

export const getAccessToken = async () => {
    try {
        return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
        console.error("Error getting access token:", error);
        return null;
    }
};

export const setAccessToken = async (token) => {
    try {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
        console.error("Error setting access token:", error);
    }
};

export const removeAccessToken = async () => {
    try {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
        console.error("Error removing access token:", error);
    }
};
