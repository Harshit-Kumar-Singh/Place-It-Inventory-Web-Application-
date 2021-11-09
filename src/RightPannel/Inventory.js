import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { AiFillDelete } from "react-icons/ai";
import {IoIosAddCircle} from "react-icons/io";
import {RiDeleteBin2Line} from "react-icons/ri";
const { xx } = require("../deleteCapta");

const Inventory = () => {
  const [name, setName] = useState("Harshit");
  const [expression, setExpression] = useState(['',0]);
  let data;
  useEffect(() => {
    getDataFromDb();
  }, []);
  const [dataList, setDataList] = useState([]);
  function getDataFromDb() {
    fetch("https://my-inventory-backend.herokuapp.com")
      .then((e) => e.json())
      .then((e) => {
        console.log(e);
        setDataList(e);
      });
  }
  async function callback() {
    // e.preventDefault();
    // console.log(e)
    setDisplayData(<p>Loadoing</p>);
    let x = await fetch("https://my-inventory-backend.herokuapp.com", {
      method: "post",
      body: data,
    });

    let res = await x.json();

    getDataFromDb();
  }
  async function deleteSingle(itemNumber) {
    const response = await fetch("https://my-inventory-backend.herokuapp.com/delete",{method : "POST",body : `${itemNumber}`});
    getDataFromDb();
    

  }
  async function DeleteFullDatabase(){
    const response =  await fetch("https://my-inventory-backend.herokuapp.com/finalDelete",{method:"POST"});
    getDataFromDb();
  }
  const [displayData, setDisplayData] = useState(<h1>No Data</h1>);
  const formik = useFormik({
    initialValues: {
      productName: "",
      itemNumber: "",
      manufacturer: "",
      category: "",
      price: "",
      quantity: "",
      productId: "",
    },
    onSubmit: (values) => {
      console.log(values);
      data = JSON.stringify(values, null, 2);
      console.log(data);
      callback(data);
    },
  });
  function callThis() {
    // console.log(xx());

    setExpression(xx());
    document.getElementById("onDeletePage").style.visibility = "visible";
  }
  function  AddingItem(){
    console.log("In Adding Function");
    document.getElementById("onAdding").style.visibility = "visible";
  }
  function remove(){
    document.getElementById("onAdding").style.visibility = "hidden";
  }
  function timeTo(){
    document.getElementById("onDeletePage").style.visibility = "hidden";
    let userAns = document.getElementById('answer').value;
    if(userAns == expression[1])
    {
      DeleteFullDatabase();
    }
    else{
      // document.getElementById("onDeletePage").style.visibility = "hidden";
    }
    console.log("function End");
  }
  return (
    <>
      <div className="billuSanda" id="onDeletePage">
        <div className="promptBox">
          <p></p>
          <kbd>{expression[0]}</kbd>
          <input type="number" id = "answer" />
          <button onClick={timeTo}>Yes</button>
        </div>
      </div>
      <div className="inventory-page">
        <div className="Heading">
          <h2 className="inventory-name">Inventory</h2>
          <div>
          <AiFillDelete
            className="deleteIcon"
            onClick={callThis}
          ></AiFillDelete>
           <IoIosAddCircle
            className="deleteIcon"
            onClick={AddingItem}
          ></IoIosAddCircle>
          </div>
         
        </div>
        <div className = "names">
          <p>Product Name</p>
          <p>Item Number</p>
          <p>Manufacturer</p>
          <p>Category</p>
          <p>Price</p>
          <p>Quantity</p>
          <p></p>
        </div>
        <div className = "addingForm" id = "onAdding">
        <form
          onSubmit={formik.handleSubmit}
          method="POST"
          class="form"
          action="https://my-inventory-backend.herokuapp.com/"
        >
          <label htmlFor="productName"></label>
          <br />
          <input
            onChange={formik.handleChange}
            value={formik.values.productName}
            type="text"
            placeholder="Product Name"
            name="productName"
            id="productName"
          />
          <label htmlFor="itemNumber"></label>
          <br />
          <input

            onChange={formik.handleChange}
            value={formik.values.itemNumber}
            type="number"
            placeholder="Item Number"
            name="itemNumber"
            id="itemNumber"
          />
          <label htmlFor="manufacturer"></label>
          <br />
          <input
            onChange={formik.handleChange}
            value={formik.values.manufacturer}
            type="text"
            placeholder="ManuFacturer"
            name="manufacturer"
            id="manufacturer"
          />
          <label htmlFor="category"></label>
          <br />
          <input
            onChange={formik.handleChange}
            value={formik.values.category}
            type="text"
            placeholder="Category"
            name="category"
            id="category"
          />
          <label htmlFor="price"></label>
          <br />
          <input
            onChange={formik.handleChange}
            value={formik.values.price}
            type="number"
            name="price"
            placeholder="Price"
            id="price"
          />
          <label htmlFor="quantity"></label>
          <br />
          <input
            onChange={formik.handleChange}
            value={formik.values.quantity}
            type="number"
            name="quantity"
            placeholder="Quantity"
            id="quantity"
          />
          <button onClick = {remove} className="add-btn">Add Item</button>
        </form>
        </div>
        <div className="underLine"></div>
        <div className="items">
          { dataList.map((data, idx) => {
            return (
              <div className="singleItem">
                <p className="w11p">{data.productName}</p>
                <p className="w11p">{data.itemNumber}</p>
                <p className="w11p">{data.manufacturer}</p>
                <p className="w11p">{data.category}</p>
                <p className="w11p">{data.price}</p>
                <p className="w11p">{data.quantity}</p>
                <RiDeleteBin2Line onClick={()=>{
                  deleteSingle(data.itemNumber);
                }} className="deleteSingleItemIcon"></RiDeleteBin2Line>
                
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Inventory;
// import React from 'react'
