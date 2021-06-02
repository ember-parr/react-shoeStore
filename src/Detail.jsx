import React from "react";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";
import useFetch from "./services/useFetch";
import PageNotFound from "./PageNotFound"
export default function Detail() {
    const { id } = useParams()
    const { data: product, loading, error } = useFetch(`products/${id}`)

    // start of guard clauses (checking for correct information)
    if (error) throw error;
    if (loading) return <Spinner />
    if (!id) return <PageNotFound />
    // end of guard clauses 
    //   return <h1>Detail</h1>;
    console.log("productId: ", id)

    // TODO: Display these products details
    return (
        <div id="detail">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p id="price">${product.price}</p>
        <img src={`/images/${product.image}`} alt={product.category} />
        </div>
    );
}