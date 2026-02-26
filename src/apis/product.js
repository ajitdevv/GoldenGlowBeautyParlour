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