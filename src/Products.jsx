import React, { useState } from "react";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";
import { useParams } from "react-router-dom"
import PageNotFound from "./PageNotFound"

export default function Products() {
  const [size, setSize] = useState("")
  
  const { category } = useParams()
  // aliasing data as products because products is variable expected below in return
  const { data: products, loading, error } = useFetch(`products?category=${category}`)
  
  // no longer need, custom hook placed in useFetch.js
  // useEffect(() => {  
  //   getProducts("shoes")
  //   .then((response)=> {
  //     setProducts(response)
  //   }).catch((e) => setError(e))
  //   .finally(() => isLoading(false))
  // }, [])


  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  const filteredProducts = size ? products.filter(product => product.skus.find((shoe) => shoe.size === parseInt(size)) ) : products;

  // start of guard clauses (checking for correct information)
  if (error) throw error;
  if (loading) return <Spinner />
  if (products.length === 0) return <PageNotFound />
  // end of guard clauses 
  
  return (
    <>
      
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            {/* && works like an if operator here, if left is true, right is rendered */}
            { size && <h2>Found {filteredProducts.length} products </h2>} 
          </section>
          <section id="products">
            {filteredProducts.map(renderProduct)}
          </section>
       
    </>
  );
}
