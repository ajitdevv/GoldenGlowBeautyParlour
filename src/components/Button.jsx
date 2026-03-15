export const AddButton=({children,onClick})=>{
    return(
        <button onClick={onClick} className="bg-primary hover:bg-accent py-2 px-4 rounded-2xl transition-all duration-300 cursor-pointer text-foreground">
            {children}
        </button>
    )
}