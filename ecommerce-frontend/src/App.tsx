import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react"; //Lazy()So that if we are not in that page that page wont load //<Suspense> lets you display a fallback until its children have finished loading.
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));

const App = () => {
  return (
    <Router>
      {/* Header Section */}

      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
