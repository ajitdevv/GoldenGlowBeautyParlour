
export const getProducts = async () => {
    try {
        const response = await fetch("http://localhost:3000/get-products", {
            method: "GET", credentials: "include"
        });
        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText || "Failed to fetch products");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/delete-manufacturer", {
            method: "DELETE",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                item_id: id,
                token: token
            })
        })
        console.log("STATUS:", response.status);
        const text = await response.text();
        console.log("RAW RESPONSE:", text);
        try {
            const data = JSON.parse(text);
            return data;
        } catch {
            console.log("Not JSON response");
        }
    } catch (error) {
        console.error(error)
    }
}


export const Getmanufacturers = async () => {
    try {
        const response = await fetch("http://localhost:3000/get-manufacturers", {
            method: "GET", credentials: "include", headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText || "Failed to fetch Manufacturers");
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
        const response = await fetch("http://localhost:3000/get-deals", { method: "GET",  credentials: "include", headers: {
                "Content-Type": "application/json"
            }})
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
        const response = await fetch("http://localhost:3000/get-deals",
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
