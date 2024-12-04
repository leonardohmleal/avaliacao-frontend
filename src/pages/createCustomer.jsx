import { useState, useEffect } from "react";
import api from "../services/api";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CreaateCustomer = () => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/books")
      .then((response) => {
        setBooks(response.data._embedded.bookDtoList || []);
      })
      .catch((err) => console.error("Erro ao carregar livros:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      fullName,
      gender,
      book: selectedBookId ? { id: selectedBookId } : null,
    };
    api
      .post("/customers", newCustomer)
      .then(() => {
        alert("Cliente cadastrado com sucesso!");
        navigate("/customers");
      })
      .catch((err) => console.error("Erro ao cadastrar cliente:", err));
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
      <h2>Cadastrar Novo Cliente</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCustomerName">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome completo do cliente"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{ marginBottom: "1rem" }}
          />
        </Form.Group>
        <Form.Group controlId="formCustomerGender">
          <Form.Label>Genero</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a genero do cliente usando m(masculino) ou f(feminino)"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            style={{ marginBottom: "1rem" }}
            maxLength={1}
          />
        </Form.Group>
        <Form.Group controlId="formCustomerBook">
          <Form.Label>Associar a um Livro</Form.Label>
          <Form.Control
            as="select"
            value={selectedBookId || ""}
            onChange={(e) => setSelectedBookId(e.target.value)}
          >
            <option value="">Nenhum</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </Container>
  );
};

export default CreaateCustomer;
