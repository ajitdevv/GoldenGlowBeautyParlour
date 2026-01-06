import  mehndiImages  from "./data/mehndiphotos";
function App() {
  return (
    <div className="grid grid-cols-4 gap-2 p-4">
      {mehndiImages.map((image) => (
        <img
          className="size-cover w-full h-full rounded-lg"
          key={image.id}
          src={image.url}
          alt={`Mehndi ${image.id}`}
        />
      ))}
    </div>
  );
}

export default App;
