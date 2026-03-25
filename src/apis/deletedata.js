export const DeleteDeal=async({id})=>{
    try {
        const res=await fetch("https://admin-apis.vercel.app/delete-deal",{method:"DELETE",headers:{"Content-type":"Application/json",},credentials:"include",body:JSON.stringify({id})})
        const data=await res.json()
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