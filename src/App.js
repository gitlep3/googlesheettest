import "./App.scss";
import { useState, useEffect } from "react";
import { Form, Button, Image, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from "nanoid";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []); // eslint-disable-line

  const fetchItems = async () => {
    const res = await axios.get(API);

    setItems(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "item-name") {
      setName(value);
    } else if (name === "item-price") {
      setPrice(value);
    } else if (name === "item-image") {
      setImage(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      price,
      image,
    };

    await axios
      .post(API, data)
      .then((res) => {
        setItems([...items, res.data]);
        fetchItems();
        notify();
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    clearForm();
  };

  const notify = () => {
    toast.success("Item added successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const clearForm = () => {
    setName("");
    setPrice("");
    setImage("");
  };

  const renderItems = () => {
    return items.map((item) => {
      return (
        <Card className="app-card" key={nanoid()}>
          <Card.Img variant="top" className="app-card-img" src={item.image} />
          <Card.Body>
            <Card.Title>Name: {item.name}</Card.Title>
            <Card.Text>Price: ${item.price}</Card.Text>
          </Card.Body>
        </Card>
      );
    });
  };

  return (
    <section className="app-container">
      <div id="header">
        <h1>google sheets test</h1>
      </div>

      <div className="app-content-form">
        <h2>Add To Values</h2>
        <div className="form-container">
          <Image src={image} className="app-form-image" alt="item" />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formItemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="item-name"
                placeholder="Enter item name..."
                onChange={handleChange}
                value={name}
                className="app-form-control"
              />
            </Form.Group>

            <Form.Group controlId="formItemPrice">
              <Form.Label>Item Price</Form.Label>
              <Form.Control
                type="number"
                name="item-price"
                placeholder="Enter item price..."
                onChange={handleChange}
                value={price}
                className="app-form-control"
              />
            </Form.Group>

            <Form.Group controlId="formItemImage">
              <Form.Label>Item Image</Form.Label>
              <Form.Control
                type="text"
                name="item-image"
                placeholder="Enter item image link..."
                onChange={handleChange}
                value={image}
                className="app-form-control"
              />
            </Form.Group>
            <br />

            <div className="app-form-buttons">
              <Button variant="dark" type="submit" className="app-form-button">
                Submit
              </Button>
            </div>
          </Form>
        </div>
        <br />
      </div>

      <div className="app-content-values">
        <h2>Values</h2>
        {renderItems()}
      </div>

      <ToastContainer autoClose={3000} theme="dark" />
    </section>
  );
}

export default App;
