
export const getProducts = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch("https://admin-apis.vercel.app/get-products", { method: "PATCH", headers: { "Content-type": "application/json", "Authorization": `Bearer ${token}`, }, body: JSON.stringify({ token }) });
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const Getmanufacturers = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://admin-apis.vercel.app/get-manufacturers", { method: "PATCH", headers: { "Content-type": "application/json", "Authorization": `Bearer ${token}`, }, body: JSON.stringify({ token }) });
        if (!response.ok) {
            throw new Error("Failed to fetch manufacturers");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching manufacturers:", error);
        throw error;
    }
}
export const GetDeals = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://admin-apis.vercel.app/get-deals", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ "token": token }) })
        if (!response.ok) {
            throw new Error("Failed to post deals")
        }
        return await response.json();
    } catch (error) {
        console.error("Error Post Deals:", error)
        throw error
    }
}
export const AddDeal = async (dealData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://admin-apis.vercel.app/get-deals",
            {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, }, body: JSON.stringify(dealData),
            });
        if (!response.ok) {
            throw new Error("Failed to add deal")

        }
        return await response.json()
    } catch (error) {
        console.error("Error adding deal:", error);
        throw error;
    }
}
