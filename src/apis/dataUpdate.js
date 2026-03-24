export const ReportUpdate = async ({ id, edits }) => {
    try {
        const res = await fetch("https://admin-apis.vercel.app/update-report", {
            method: "PATCH", headers: { "Content-type": "application/json", }, credentials: "include", body: JSON.stringify({ edits })

        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error("Faild to update Reports")
            throw data?.message || "Failed to update report"
        }
        return data
    } catch (error) {
        console.log("Error Get Reports", error);
        throw error
    }
}