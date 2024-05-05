import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react"; //Lazy()So that if we are not in that page that page wont load //<Suspense> lets you display a fallback until its children have finished loading.
import Loader from "./components/Shared/Loader";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));

// Admin Routes Importing
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Products = lazy(() => import("./pages/admin/Products"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Transaction = lazy(() => import("./pages/admin/Transaction"));

//Managenment
const NewProduct = lazy(
  () => import("./components/Shared/admin/management/NewProduct")
);
const ProductManagement = lazy(
  () => import("./components/Shared/admin/management/ProductManagement")
);
const TransactionManagement = lazy(
  () => import("./components/Shared/admin/management/TransactionManagement")
);

const App = () => {
  return (
    <Router>
      {/* Header Section */}

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          {/* Admin Routes */}

          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<Products />} />
          <Route path="/admin/customer" element={<Customers />} />
          <Route path="/admin/transaction" element={<Transaction />} />
          {/* Charts */}
          {/* <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} /> */}
          {/* Apps */}
          {/* <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} /> */}

          {/* Management */}
          <Route path="/admin/product/new" element={<NewProduct />} />

          <Route path="/admin/product/:id" element={<ProductManagement />} />

          <Route
            path="/admin/transaction/:id"
            element={<TransactionManagement />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
