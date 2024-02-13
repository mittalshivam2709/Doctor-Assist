import Dropdown from "./components/Dropdown";
import Placeholder from "./components/Placeholder";
import Template from "./components/Template";

function App() {
  
    return (
    
    <div className="flex-container wrapper">
      <div className="column">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Template />
        {Array.from({ length: 10 }).map((_, index) => (
          <Dropdown key={index} title="Dropdown" content={"Template Content"} />
        ))}
      </div>
      <div className="column">
        <h1 className="text-3xl font-bold underline">Second column</h1>
        <Placeholder />
      </div>
    </div>
  );
}

export default App;