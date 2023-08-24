import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function FullPizza() {
  const [pizza, setPizza] = useState();
  const { id } = useParams(); //params :id  come from router in App.js
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://64b78c1321b9aa6eb0784a2e.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (err) {
        alert("Error to get one pizza");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return "Loading...";
  }
  return (
    <div className="container">
      <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
      <h4>{pizza.price} $</h4>
    </div>
  );
}
export default FullPizza;
