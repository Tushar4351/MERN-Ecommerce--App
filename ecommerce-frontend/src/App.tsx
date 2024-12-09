import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/Shared/Loader";
import Header from "./components/Shared/Header";
import NewsLetter from "./components/Shared/NewsLetter";
import Footer from "./components/Shared/Footer";
import ScrollProvider from "./components/Shared/ScrollProvider";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { useCheckAuthQuery } from "./redux/api/userApi";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import ProtectedRoute from "./components/Shared/ProtectedRoute";
import { RootState } from "./redux/store";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Payment = lazy(() => import("./pages/Payment"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CategoryProducts = lazy(() => import("./pages/CategoryProducts"));
// Admin Routes Importing
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Products = lazy(() => import("./pages/admin/Products"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Transaction = lazy(() => import("./pages/admin/Transaction"));

// Management
const NewProduct = lazy(() => import("./pages/admin/management/NewProduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/ProductManagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/TransactionManagement")
);

// Charts
const BarCharts = lazy(() => import("./pages/admin/charts/BarCharts"));
const LineCharts = lazy(() => import("./pages/admin/charts/LineCharts"));
const PieCharts = lazy(() => import("./pages/admin/charts/PieCharts"));

// Apps
const Coupon = lazy(() => import("./pages/admin/apps/Coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/Stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/Toss"));

const App = () => {
  return (
    <ScrollProvider>
      <Router>
        <AppContent />
        <Toaster position="top-center" />
      </Router>
    </ScrollProvider>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isTransparent = location.pathname === "/login";
  const isAdminRoute = location.pathname.startsWith("/admin");

  const { user } = useSelector((state: RootState) => state.userReducer);

  const dispatch = useDispatch();
  const { data, error } = useCheckAuthQuery();
  useEffect(() => {
    if (data) {
      //console.log("Authenticated user data:", data.user);
      dispatch(userExist(data.user));
    } else {
      dispatch(userNotExist());
    }
  }, [data, error, dispatch]);

  return (
    <>
      {/* Header Section */}
      {!isAdminRoute && !isTransparent && <Header user={user} />}

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category/:category" element={<CategoryProducts />} />
          <Route path="/gender/:gender" element={<CategoryProducts />} />
          {/* Not logged In Route */}
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={!user}>
                <Login />
              </ProtectedRoute>
            }
          />
          {/* Logged In User Routes */}
          <Route element={<ProtectedRoute isAuthenticated={!!user} />}>
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/payment" element={<Payment />} />
          </Route>

          {/* Admin Routes */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated
                adminOnly
                admin={user?.role === "admin"}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />

            {/* Charts */}
            <Route path="/admin/chart/bar" element={<BarCharts />} />
            <Route path="/admin/chart/pie" element={<PieCharts />} />
            <Route path="/admin/chart/line" element={<LineCharts />} />

            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<ProductManagement />} />
            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {!isAdminRoute && (
        <>
          <NewsLetter />
          <Footer />
        </>
      )}
    </>
  );
};
export default App;
