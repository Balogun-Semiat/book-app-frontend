import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartItem from "../pages/books/CartItem";
import CheckOut from "../pages/books/CheckOut";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import AllOrders from "../pages/orders/AllOrders";
import AdminPrivateRoute from "./AdminPrivateRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/Admin/DashboardLayout";
import Dashboard from "../pages/Admin/Dashboard";
import ManageBooks from "../pages/Admin/manage-books/ManageBooks";
import AddBook from "../pages/Admin/AddBook/AddBook";
import Editbook from "../pages/Admin/EditBook/Editbook";




const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home /> 
        },
        {
          path: "/orders", 
          element: <PrivateRoute> <AllOrders /> </PrivateRoute> 
        },
        { 
          path: "/products", 
          element: <h1>products</h1>
        },
        { 
          path: "/login", 
          element: <Login />
        },
        { 
          path: "/register", 
          element: <Register />
        },
        {
          path: '/cart',
          element: <CartItem />
        },
        {
          path: '/checkout',
          element: <PrivateRoute><CheckOut /></PrivateRoute>
        },
        {
          path: '/books/:id',
          element: <SingleBook />
        }
      ]
    },
    {
      path :'/admin',
      element: <AdminLogin />
    },
    {
      path: '/dashboard',
      element: <AdminPrivateRoute> <DashboardLayout /> </AdminPrivateRoute>,
      _children: [
        {
          index: true,
          element: <Dashboard />
        },
        {
          path: 'add-new',
          element: <AddBook />
        },
        {
          path: 'edit/:id',
          element: <Editbook />
        },
        {
          path: 'manage-books',
          element: <ManageBooks />
        }
      ],
      get children() {
        return this._children;
      },
      set children(value) {
        this._children = value;
      },
    }
  ]);
  

  export default router;