import { useEffect, useState } from "react";
import api from "../services/api";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditCustomer = () => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const { customerid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/customers/${customerid}`)
      .then((response) => {
        setFullName(response.data.fullName);
        setGender(response.data.gender);
        setSelectedBookId(response.data.book ? response.data.book.id : null);
      })
      .catch((err) => console.error("Erro ao carregar cliente:", err));

    api
      .get("/books")
      .then((response) => {
        setBooks(response.data._embedded.bookDtoList || []);
      })
      .catch((err) => console.error("Erro ao carregar livros:", err));
  }, [customerid]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCustomer = {
      id: customerid,
      fullName,
      gender,
      book: selectedBookId ? { id: selectedBookId } : null,
    };

    api
      .put(`/customers`, updatedCustomer)
      .then(() => {
        alert("Cliente atualizado com sucesso!");
        navigate("/customers");
      })
      .catch((err) => {
        console.error("Erro ao atualizar cliente:", err);
        alert("Erro ao atualizar o cliente.");
      });
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
      <h2>Editar Cliente</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group
          controlId="formCustomerName"
          style={{ marginBottom: "1rem" }}
        >
          <Form.Label style={{ marginBottom: "0.5rem" }}>
            Nome Completo
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome completo do cliente"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{ marginBottom: "1rem" }}
          />
        </Form.Group>

        <Form.Group
          controlId="formCustomerGender"
          style={{ marginBottom: "1rem" }}
        >
          <Form.Label style={{ marginBottom: "0.5rem" }}>Genero</Form.Label>
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
        <Form.Group
          controlId="formCustomerBook"
          style={{ marginBottom: "1rem" }}
        >
          <Form.Label style={{ marginBottom: "0.5rem" }}>
            Associar a um Livro
          </Form.Label>
          <Form.Control
            as="select"
            value={selectedBookId || ""}
            onChange={(e) => setSelectedBookId(e.target.value)}
            style={{ marginBottom: "1rem" }}
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
          Atualizar
        </Button>
      </Form>
    </Container>
  );
};

export default EditCustomer;
