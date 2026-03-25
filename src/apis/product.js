
export const getProducts = async () => {
    try {
        const response = await fetch("https://admin-apis.vercel.app/get-products", {
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
        const response = await fetch("https://admin-apis.vercel.apprcel.app/delete-manufacturer", {
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
        const response = await fetch("https://admin-apis.vercel.app/get-manufacturers", {
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
        const response = await fetch("https://admin-apis.vercel.app/get-deals", {
            method: "GET", credentials: "include", headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            throw new Error("Failed to get deals")
        }
        return await response.json();
    } catch (error) {
        console.error("Error Get Deals:", error)
        throw error
    }
}
export const AddDeal = async (dealData) => {
    try {
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

export const GetReports = async () => {
    try {
        const response = await fetch("https://admin-apis.vercel.app/get-reports", {
            method: "GET", credentials: "include", headers: { "Content-Type": "application/json" }
        })
        if (!response.ok) {
            throw new Error("Faild to get Reports")
        }
        return await response.json()
    } catch (error) {
        console.log("Error Get Reports", error);
        throw error

    }
}