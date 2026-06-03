import {
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Buyer from "./pages/Buyer";
import Seller from "./pages/Seller";
import Admin from "./pages/Admin";

function App() {

  return (
    <Routes>

      {/* HOME PAGE */}

      <Route
        path="/"
        element={

          <div className="min-h-screen bg-gray-100">

            {/* HERO */}

            <div className="bg-black text-white py-16 px-10">

              <h1 className="text-5xl font-bold mb-4">
                Inventory & Order Management System
              </h1>

              <p className="text-lg text-gray-300 max-w-2xl">
                Manage products, inventory,
                quotations and orders with
                Buyers, Sellers and Admins.
              </p>

            </div>

            {/* ROLE CARDS */}

            <div className="grid md:grid-cols-3 gap-8 p-10">

              {/* BUYER */}

              <div className="bg-white p-8 rounded-xl shadow-lg">

                <h2 className="text-3xl font-bold mb-4">
                  Buyer
                </h2>

                <p className="text-gray-600 mb-6">
                  Browse products and place orders.
                </p>

                <Link to="/buyer">

                  <button className="bg-black text-white px-6 py-3 rounded-lg w-full">
                    Enter Buyer Panel
                  </button>

                </Link>

              </div>

              {/* SELLER */}

              <div className="bg-white p-8 rounded-xl shadow-lg">

                <h2 className="text-3xl font-bold mb-4">
                  Seller
                </h2>

                <p className="text-gray-600 mb-6">
                  Manage products and stock.
                </p>

                <Link to="/seller">

                  <button className="bg-black text-white px-6 py-3 rounded-lg w-full">
                    Enter Seller Panel
                  </button>

                </Link>

              </div>

              {/* ADMIN */}

              <div className="bg-white p-8 rounded-xl shadow-lg">

                <h2 className="text-3xl font-bold mb-4">
                  Admin
                </h2>

                <p className="text-gray-600 mb-6">
                  Control the complete platform.
                </p>

                <Link to="/admin">

                  <button className="bg-black text-white px-6 py-3 rounded-lg w-full">
                    Enter Admin Panel
                  </button>

                </Link>

              </div>

            </div>

          </div>
        }
      />

      {/* ROUTES */}

      <Route
        path="/buyer"
        element={<Buyer />}
      />

      <Route
        path="/seller"
        element={<Seller />}
      />

      <Route
        path="/admin"
        element={<Admin />}
      />

    </Routes>
  );
}

export default App;