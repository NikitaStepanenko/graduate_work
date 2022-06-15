import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import Main from "./pages/Main";
import Catalog from "./pages/Catalog";
import { MainContainer } from "./styles";
import Product from "./pages/Product";
import Login from "./pages/Auth/Login";
import Registration from "./pages/Auth/Registration";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./redux/reducers/UserSlice";
import CompanySearch from "./pages/CompanySearch";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(auth());
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  return (
    <Router>
      <MainContainer>
        <Routes>
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company"
            element={
              <ProtectedRoute>
                <CompanySearch />
              </ProtectedRoute>
            }
          />
          <Route exact path="/" element={<Catalog />} />
        </Routes>
      </MainContainer>
    </Router>
  );
}

export default App;
