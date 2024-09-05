import React, {useState} from 'react';
import {ProductEdit} from "../../models";
import "./product.css"
import edition from "../../images/edit.png"
import valid from "../../images/valid.png"

const ProductCard: React.FC<ProductEdit> = ({name = "", stock, price, description, _id, onDelete, onEdit}) => {

  let [editName, setEditName] = useState(name)
  let [editStock, setEditStock] = useState(stock)
  let [editPrice, setEditPrice] = useState(price)
  let [editDescription, setEditDescription] = useState(description)
  let [edit, setEdit] = useState(false)

  function changeEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (edit ){
      onEdit({name:editName, stock:editStock, price:editPrice, description: editDescription, _id:e.currentTarget.parentElement!.id})
      resetEdit()
    }
    setEdit(!edit)
  }

  function resetEdit(){
    setEditName(name)
    setEditDescription(description)
    setEditPrice(price)
    setEditStock(stock)
  }

  return (
    <div className={"productCard"} id={_id}>
      {edit ? (
        <div className={"editProductCard"}>
          <label>Nom:<input className={"nameProductCard"} onChange={(e) => setEditName(e.target.value)} value={editName}></input></label>
          <label>Prix:<input className={"nameProductCard"} onChange={(e) => setEditPrice(parseFloat(e.target.value))}
                             value={editPrice} type={"number"}></input></label>
          <label>Description:<textarea className={"nameProductCard"} onChange={(e) => setEditDescription(e.target.value)}
                                       value={editDescription}></textarea></label>
          <label>Stock:<input className={"nameProductCard"} onChange={(e) => setEditStock(parseInt(e.target.value))} value={editStock}></input></label>
        </div>
      ) : (
        <div>
          <div className={"nameProductCard"}>Nom: {name}</div>
          <div className={"nameProductCard"}>Prix: {price}€</div>
          <div className={"nameProductCard"}>Description: {description}</div>
          <div className={"nameProductCard"}>Stock: {stock}</div>
        </div>
      )}
      <button className={"deleteProductCard"} onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(e.currentTarget.parentElement)
        onDelete(e.currentTarget.parentElement!.id);
      }}>x
      </button>
      <button className={"editProductCard"} onClick={(e)=>changeEdit(e)}>

        <img src={edit ? valid : edition}/>
      </button>
    </div>
  )
    ;
};

export default ProductCard;