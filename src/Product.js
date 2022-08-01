import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import axios from "axios";

const Product = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: "https://fakestoreapi.com/products",
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((e) => alert(e))
      .finally(() => setLoading(false));
  }, []);

  const [q, setQ] = useState("");
  const [foundProducts, setFoundProducts] = useState(data);

function lowTohigh(){
    setFoundProducts([...foundProducts].sort((a,b) => a.price-b.price));
}

function highTolow(){
    setFoundProducts([...foundProducts].sort((a,b) => b.price-a.price));
}

const filter = (e) => {
  const keyword = e.target.value;

  if (keyword !== '') {
    const results = data.filter((product) => {
      return product.title.toLowerCase().startsWith(keyword.toLowerCase());
      // Use the toLowerCase() method to make it case-insensitive
    });
    setFoundProducts(results);
  } else {
    setFoundProducts(data);
    // If the text field is empty, show all users
  }

  setQ(keyword);
};

  return (
    <div className="container-sm">
      {loading && (
        <div>
          {" "}
          <h1>Loading...</h1>
        </div>
      )}
      <div className="sort">
      <input class="form-control" value={q} placeholder="Type to search..." onChange={filter}></input>
        <button type="button" class="btn btn-dark btn" onClick={lowTohigh}>LowToHigh</button>
        <button type="button" class="btn btn-dark btn" onClick={highTolow}>HighToLow</button>
        
        </div>

      {foundProducts.map((product)=> ( 
          <div key={product.id} className="card">
           <div className="card-img-top"><img src={product.image} alt="#"/></div>
           <div className="card-body">
               <h5 className="card-title">{product.title}</h5>
               <h6 >{`Price: ${product.price}`}</h6>
               <h6>{`Category: ${product.category}`}</h6>
               <h6 className="card-text">{product.description}</h6>
           </div>
          </div>
      ))}
    </div>
  );
};

export default Product;