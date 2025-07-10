import React, { Suspense, lazy } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Auth from "./Auth/Auth";
import UserAuth from "./Auth/UserAuth";
// import ShoppingCart from "./shoppingcart/ShoppingCart";
// import CheckOutPage from "./checkoutpage/CheckOutPage";
// import LogIn from "./login/LogIn";
// import SignUp from "./login/SignUp";
// import Shop from "./Shop.js/Shop";
// import ProductPage from "./Shop.js/ProductPage";
// import FAQ from "./FAQ/FAQ";
// import Contact from "./contact/Contact";
// import About from "./about/About";
// import AdminDashboard from "./Dashboard/AdminDashboard";
// import UserDashboard from "./Dashboard/UserDashboard";
import Landing from "../components/header/Landing";
import Footer from "../components/footer/Footer";
import "../App.scss";
import Layout from "./Layout";
// import Whishlist from "./Dashboard/Whishlist";
// import AccountInfo from "./Dashboard/AccountInfo";
// import Orders from "./Dashboard/Orders";
// import Overview from "./Dashboard/Overview";
// import Reviews from "./Dashboard/Reviews";
// import OrderDetail from "./Dashboard/OrderDetail";
// import AdminOrderDetails from "./Dashboard/Admin/AdminOrderDetails";
// import Users from "./Dashboard/Admin/Users";
// import UserDetail from "./Dashboard/Admin/UserDetail";
// import Products from "./Dashboard/Admin/Products";
// import AdminOverview from "./Dashboard/Admin/AdminOverview";
// import CreateProduct from "./Dashboard/Admin/CreateProduct";

const Login = lazy(() => import("./login/LogIn"));
const SignUp = lazy(() => import("./login/SignUp"));
const CheckOutPage = lazy(() => import("./checkoutpage/CheckOutPage"));
const ShoppingCart = lazy(() => import("./shoppingcart/ShoppingCart"));
const Shop = lazy(() => import("./Shop/Shop"));
const ProductPage = lazy(() => import("./productpage/ProductPage"));
const FAQ = lazy(() => import("./FAQ/FAQ"));
const Contact = lazy(() => import("./contact/Contact"));
const About = lazy(() => import("./about/About"));
const AdminDashboard = lazy(() => import("./Dashboard/AdminDashboard"));
const UserDashboard = lazy(() => import("./Dashboard/UserDashboard"));
const Whishlist = lazy(() => import("./Dashboard/Whishlist"));
const AccountInfo = lazy(() => import("./Dashboard/AccountInfo"));
const Orders = lazy(() => import("./Dashboard/Orders"));
const Overview = lazy(() => import("./Dashboard/Overview"));
const Reviews = lazy(() => import("./Dashboard/Reviews"));
const OrderDetail = lazy(() => import("./Dashboard/OrderDetail"));
const AdminOrderDetails = lazy(() =>
  import("./Dashboard/Admin/AdminOrderDetails")
);
const Users = lazy(() => import("./Dashboard/Admin/Users"));
const UserDetail = lazy(() => import("./Dashboard/Admin/UserDetail"));
const Products = lazy(() => import("./Dashboard/Admin/Products"));
const AdminOverview = lazy(() => import("./Dashboard/Admin/AdminOverview"));
const CreateProduct = lazy(() => import("./Dashboard/Admin/CreateProduct"));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route
            index
            path="/"
            element={
              <div className="main">
                <Landing />
                <Footer />
              </div>
            }
          />
          <Route path="cart">
            <Route
              index
              element={
                <Suspense fallback="Loading...">
                  <ShoppingCart />
                </Suspense>
              }
            />
            <Route element={<UserAuth />}>
              <Route
                path="checkout"
                element={
                  <Suspense fallback="Loading...">
                    <CheckOutPage />
                  </Suspense>
                }
              />
            </Route>
          </Route>
          <Route
            path="login"
            // element={<LogIn />}

            element={
              <Suspense>
                <Login />
              </Suspense>
            }
            // lazy={() => import("./login/LogIn")}
          />
          <Route
            path="signup"
            element={
              <Suspense fallback="Loading...">
                <SignUp />
              </Suspense>
            }
            l
          />
          <Route
            path="FAQ"
            element={
              <Suspense fallback="Loading...">
                <FAQ />
              </Suspense>
            }
          />
          <Route
            path="contact-us"
            element={
              <Suspense fallback="Loading...">
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback="Loading...">
                <About />
              </Suspense>
            }
          />
          <Route
            path="shop/:gender"
            element={
              <Suspense fallback="Loading...">
                <Shop />
              </Suspense>
            }
          />
          <Route
            path="shop"
            element={
              <Suspense fallback="Loading...">
                <Shop />
              </Suspense>
            }
          />
          <Route
            path="shop/:gender/:category"
            element={
              <Suspense fallback="Loading...">
                <Shop />
              </Suspense>
            }
          />
          <Route
            path="shop/product/:productid"
            element={
              <Suspense fallback="Loading...">
                <ProductPage />
              </Suspense>
            }
          />
        </Route>
        <Route element={<Auth allowedRoles={["Admin"]} />}>
          <Route
            path="admin-dashboard"
            element={
              <Suspense fallback="Loading...">
                <AdminDashboard />
              </Suspense>
            }
          >
            <Route
              path="orders"
              element={
                <Suspense>
                  <Orders overflow={true} />
                </Suspense>
              }
            />
            <Route
              path="orders/:orderid"
              element={
                <Suspense>
                  <AdminOrderDetails />
                </Suspense>
              }
            />
            <Route
              path="users/:username"
              element={
                <Suspense>
                  <UserDetail type={"detail"} />{" "}
                </Suspense>
              }
            />
            <Route
              path="users/create"
              element={<UserDetail type={"create"} />}
            />
            <Route
              path="users"
              index
              element={
                <Suspense>
                  <Users />{" "}
                </Suspense>
              }
            />
            <Route
              path="products/create"
              element={
                <Suspense>
                  <CreateProduct type={"Create"} />
                </Suspense>
              }
            />
            <Route
              path="products/edit/:productid"
              element={
                <Suspense>
                  <CreateProduct type={"Edit"} />{" "}
                </Suspense>
              }
            />
            <Route
              path="products"
              element={
                <Suspense>
                  <Products overflow={true} />{" "}
                </Suspense>
              }
            />
            <Route
              path="reviews"
              element={
                <Suspense>
                  <Reviews />
                </Suspense>
              }
            />
            <Route
              path="overview"
              index
              element={
                <Suspense>
                  <AdminOverview />
                </Suspense>
              }
            />
            <Route
              path="accountinfo"
              element={
                <Suspense>
                  <AccountInfo />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route element={<UserAuth />}>
          <Route
            path="/user-dashboard"
            element={
              <Suspense>
                <UserDashboard />
              </Suspense>
            }
          >
            <Route
              path="overview"
              index
              element={
                <Suspense>
                  <Overview />
                </Suspense>
              }
            />
            <Route
              path="accountinfo"
              element={
                <Suspense>
                  <AccountInfo />
                </Suspense>
              }
            />
            <Route
              path="wishlist"
              element={
                <Suspense>
                  <Whishlist />
                </Suspense>
              }
            />
            <Route
              path="orders"
              element={
                <Suspense>
                  <Orders overflow={true} />
                </Suspense>
              }
            />
            <Route
              path="orders/:orderid"
              element={
                <Suspense>
                  <OrderDetail />
                </Suspense>
              }
            />
            <Route
              path="reviews"
              element={
                <Suspense>
                  <Reviews />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<div>Path Not Matched</div>} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
