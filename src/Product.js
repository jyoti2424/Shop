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
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

function lowTohigh(){
    setData([...data].sort((a,b) => a.price-b.price));
}

function highTolow(){
    setData([...data].sort((a,b) => b.price-a.price));
}

  return (
    <div className="container-sm">
      {loading && (
        <div>
          {" "}
          <h1>Loading...</h1>
        </div>
      )}
      <div className="sort">
        <button type="button" class="btn btn-dark btn" onClick={lowTohigh}>LowToHigh</button>
        <button type="button" class="btn btn-dark btn" onClick={highTolow}>HighToLow</button>
        </div>

      {data.map((product)=> ( 
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