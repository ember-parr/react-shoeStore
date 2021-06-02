import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import PageNotFound from "./PageNotFound"

export default function Detail() {
    const [sku, setSku] = useState("");
    const { id } = useParams()
    const { data: product, loading, error } = useFetch(`products/${id}`)
    const navigate = useNavigate()


    // start of guard clauses (checking for correct information)
    if (loading) return <Spinner />
    if (!product) return <PageNotFound />
    if (error) throw error;
    // end of guard clauses 
 
    return (
        <div id="detail">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p id="price">${product.price}</p>
        <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
              <option value="">What Size?</option>
              {product.skus.map((s) => (
                  <option key={s.sku} value={s.sku}>
                      {s.size}
                  </option>
              ))}
            </select>
        <p><button className="btn btn-primary" disabled={!sku} onClick={() => navigate('/cart') }>Add To Cart</button></p>
        <img src={`/images/${product.image}`} alt={product.category} />
        </div>
    );
}