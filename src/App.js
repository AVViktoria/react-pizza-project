// components
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";

//styles
import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />
      {/* {isLoading && "Loading..."} */}
      <div className="content">
        <div className="container">
          <Home />
        </div>
      </div>
    </div>
  );
}

export default App;

// {...obj}
// key={title}
// title={title}
// price={price}
// imageUrl={imageUrl}
// sizes={sizes}
// types={types}
