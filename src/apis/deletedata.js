export const DeleteDeal = async ({ id }) => {
    try {
        const res = await fetch("https://admin-apis.vercel.app/delete-deal", { method: "DELETE", headers: { "Content-type": "Application/json", }, credentials: "include", body: JSON.stringify({ id }) })
        const data = await res.json()
        if (!res.ok) {
            throw new Error("Faild to Delete Deal")
            throw data?.message || "Failed to Delete Deal"
        }
        return data;
    } catch (error) {
        console.log("Error Delete Deal", error);
        throw error
    }
}




export const deleteProduct = async (id) => {
    try {
        const response = await fetch("https://admin-apis.vercel.app/delete-manufacturer", {
            method: "DELETE",
            headers: { "Content-Type": "application/json", },credentials:"include",
            body: JSON.stringify({
                item_id: id,
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