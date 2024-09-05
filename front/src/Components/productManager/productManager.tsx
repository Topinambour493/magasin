import React, {ChangeEvent, useEffect, useState} from 'react';
import ProductCard from "../product/product";
import {Product} from "../../models";
import "./productManager.css"
import {useNavigate} from "react-router-dom";


const ProductManager = () => {
  let navigate = useNavigate()
  let [nameNewProduct, setNameNewProduct] = useState<string>("")
  let [priceNewProduct, setPriceNewProduct] = useState<number>(1)
  let [stockNewProduct, setStockNewProduct] = useState<number>(1)
  let [descriptionNewProduct, setDescriptionNewProduct] = useState<string>("")
  let [search, setSearch] = useState<string>("")
  let [products, setProducts] = useState<Product[]>([])


  function resetNewProduct() {
    setNameNewProduct("")
  }

  function createNewProduct(e: React.SyntheticEvent) {
    e.preventDefault()
    let newProduct = {
      "name": nameNewProduct,
      "price": priceNewProduct,
      "stock": stockNewProduct,
      "description": descriptionNewProduct
    }
    addProduct(newProduct)
    filterProduct(search)

    resetNewProduct()
  }

  const onProductDelete = async (id: string) => {
    const response = await fetch('http://localhost:3010/products/' + id, {
      method: 'DELETE',
    })
    filterProduct(search)
  }

  const onProductEdit = async (product: Product) => {
    const response = await fetch('http://localhost:3010/products/' + product._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    if (response.ok) {
      console.log('AAAAh', response);
      filterProduct(search)
    } else {
      alert('Failed to get products');
    }
  }

  async function filterProduct(filter: string = '') {
    try {
      const response = await fetch('http://localhost:3010/products?search=' + filter, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (response.ok) {
        let productsFiltered = await response.json()
        setProducts(productsFiltered)
        console.log(productsFiltered)
      } else {
        alert('Failed to get products');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  async function addProduct(newProduct: Product) {
    try {
      const response = await fetch('http://localhost:3010/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      console.log(response);

      if (response.ok) {
        resetNewProduct()
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    filterProduct(search)
  }, [search])

  return (
    <div id={"productManager"}>
      <form onSubmit={createNewProduct}>
        <label>Nom du nouveau produit: </label>
        <input type={"text"} onChange={(e: ChangeEvent<HTMLInputElement>) => setNameNewProduct(e.target.value)}
               value={nameNewProduct}></input>
        <label>Prix: </label>
        <input type={"number"}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setPriceNewProduct(parseFloat(e.target.value))}
               value={priceNewProduct}></input>
        <label>Description: </label>
        <textarea  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescriptionNewProduct(e.target.value)}
               value={descriptionNewProduct}></textarea>
        <label>Stock: </label>
        <input type={"number"}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setStockNewProduct(parseInt(e.target.value))}
               value={stockNewProduct}></input>
        <button>Créer</button>
      </form>
      <label>Barre de recherche</label><input onChange={(e)=>{setSearch(e.currentTarget.value)}} value={search}></input>
      <div id={"productsCard"}>
        {products.map((product: Product, index) => (
          <ProductCard key={index}
                       _id={product._id}
                       onDelete={onProductDelete}
                       onEdit={onProductEdit}
                       name={product.name}
                       description={product.description}
                       price={product.price}
                       stock={product.stock}
          />
        ))}
      </div>
    </div>
  )
    ;
}

export default ProductManager;