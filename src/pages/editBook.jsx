import { useEffect, useState } from "react";
import api from "../services/api";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/books/${bookId}`)
      .then((response) => {
        setName(response.data.name);
        setState(response.data.state);
      })
      .catch((err) => {
        alert("Erro ao carregar o livro para edição.");
      });
  }, [bookId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBook = { name, state, id: bookId };

    api
      .put(`/books`, updatedBook)
      .then((response) => {
        alert("Livro atualizado com sucesso!");
        navigate("/books");
      })
      .catch((err) => {
        alert("Erro ao atualizar o livro.");
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
      <h2>Editar Livro</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBookTitle">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o título do livro"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginBottom: "1rem" }}
          />
        </Form.Group>
        <Form.Group controlId="formBookState">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o estado do livro"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            style={{ marginBottom: "1rem" }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Atualizar
        </Button>
      </Form>
    </Container>
  );
};

export default EditBook;
