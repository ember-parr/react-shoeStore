import React from "react";
import Spinner from "./Spinner";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import PageNotFound from "./PageNotFound"

export default function Detail() {
    const { id } = useParams()
    const { data: product, loading, error } = useFetch(`products/${id}`)
    const navigate = useNavigate()
    // start of guard clauses (checking for correct information)
    if (loading) return <Spinner />
    if (!product) return <PageNotFound />
    if (error) throw error;
    // end of guard clauses 
    //   return <h1>Detail</h1>;
    console.log("productId: ", id)

    // TODO: Display these products details
    return (
        <div id="detail">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p id="price">${product.price}</p>
        <p><button class="btn btn-primary" onClick={() => navigate('/cart') }>Add To Cart</button></p>
        <img src={`/images/${product.image}`} alt={product.category} />
        </div>
    );
}