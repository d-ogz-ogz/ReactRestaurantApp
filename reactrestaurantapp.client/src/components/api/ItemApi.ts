import { Item } from "../models/ItemModel";

export const GetItems = async (): Promise<Item[]> => {
    const Items: Item[] = [];

    try {
        const response = await fetch("/Item/GetItems", {
            headers: {
                "Authorization": "token",
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data as Item[];
        } else {
            console.error("Failed to fetch items. Status:", response.status);
            return Items; // Boþ bir liste döner
        }
    } catch (error) {
        console.error("An error occurred while fetching items:", error);
        return Items; // Hata durumunda da boþ bir liste döner
    }
};
