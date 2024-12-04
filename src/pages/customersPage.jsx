import { useEffect, useState } from "react";
import api from "../services/api";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const CustomersPage = () => {
  const [customers, setcustomers] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchCustomers = () => {
    api
      .get("/customers")
      .then((response) => {
        const customersList = response.data._embedded?.customerDtoList || [];
        setcustomers(customersList);
        setError(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar clientes:", err);
        setError(true);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, [location]);

  const deleteCustomer = (customerId) => {
    api
      .delete(`/customers/${customerId}`)
      .then(() => {
        alert("Cliente excluído com sucesso!");
        fetchCustomers();
      })
      .catch((err) => console.error("Erro ao excluir cliente:", err));
  };

  const handleCreate = () => {
    navigate("/customers/create");
  };

  const handleEdit = (customerId) => {
    navigate(`/customers/update/${customerId}`);
  };

  return (
    <Container
      style={{
        marginTop: "50px",
        marginLeft: "11%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2>Clientes</h2>
      {error && <p style={{ color: "red" }}>Erro ao carregar os dados.</p>}
      <Button
        variant="success"
        style={{ marginBottom: "20px" }}
        onClick={handleCreate}
      >
        Cadastrar Novo Cliente
      </Button>
      <Row>
        {customers.map((customer) => (
          <Col key={customer.id} sm={12} md={6} lg={4}>
            <Card style={{ marginBottom: "20px" }}>
              <Card.Body>
                <Card.Title>{customer.fullName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {customer.gender}
                </Card.Subtitle>
                {customer.book && (
                  <Card.Text>Livro: {customer.book.name}</Card.Text>
                )}
                <Button
                  variant="primary"
                  onClick={() => handleEdit(customer.id)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  style={{ marginLeft: "10px" }}
                  onClick={() => deleteCustomer(customer.id)}
                >
                  Excluir
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CustomersPage;
