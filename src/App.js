import "./App.scss";
import { useState, useEffect } from "react";
import { Form, Button, Image } from "react-bootstrap";
import axios from "axios";

function App() {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImage, setItemImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "item-name") {
      setItemName(value);
    } else if (name === "item-price") {
      setItemPrice(value);
    } else if (name === "item-image") {
      setItemImage(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <section className="app-container">
      <div id="header">
        <h1>google sheets test</h1>
      </div>

      <div className="app-content-form">
        <h2>Form to add values</h2>
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formItemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="item-name"
                placeholder="Enter item name..."
                onChange={handleChange}
                value={itemName}
                className="app-form-control"
              />
            </Form.Group>
          </Form>
        </div>
      </div>

      <div className="app-content-values">
        <h2>The values</h2>
      </div>
    </section>
  );
}

export default App;
