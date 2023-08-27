import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
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
    <div className="cart cart--empty">
      <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
      <h2 className="pizza-block__title">{pizza.title}</h2>
      <p className="pizza-block__text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis modi,
        minus quas sequi tenetur excepturi deleniti quis atque labore nulla?
      </p>
      <div className="pizza-block__price pizza-block__one--pizza">
        {pizza.price} $
      </div>
      <Link to="/" className="button button--black">
        <span>Go back</span>
      </Link>
    </div>
  );
};
export default FullPizza;
