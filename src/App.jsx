import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/homePage";
import BooksPage from "./pages/booksPage";
import CreateBook from "./pages/createBook";
import EditBook from "./pages/editBook";
import CustomersPage from "./pages/customersPage";
import CreateCustomer from "./pages/createCustomer";
import EditCustomer from "./pages/editCustomer";
import { Container } from "react-bootstrap";
import TopBar from "./components/topbar";
import Sidebar from "./components/sidebar";

const App = () => {
  return (
    <Router>
      <div className="app">
        <TopBar />

        <div className="main-content">
          <Sidebar />

          <Container>
            <div className="page-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/books/create" element={<CreateBook />} />
                <Route path="/books/update/:bookId" element={<EditBook />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/customers/create" element={<CreateCustomer />} />
                <Route
                  path="/customers/update/:customerid"
                  element={<EditCustomer />}
                />
              </Routes>
            </div>
          </Container>
        </div>
      </div>
    </Router>
  );
};

export default App;
