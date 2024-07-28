import React, { useState ,useEffect }  from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navcss from "../css/Navbar.css"
// import Modal from "../Modal";
// import { useCart } from "./ContextReducer";
// import Cart from "./Cart";
import { useReducer } from "react";


function Nav() {
  const [click, setClick] = React.useState(false);
  const navigate = useNavigate();
  const handleClick = () => {setClick(!click);}
  const Close = () => setClick(false);
  const handleLogout = ()=>{
    let authToken=localStorage.getItem('authToken')
    localStorage.removeItem('authToken');
    // localStorage.removeItem(authToken);
    navigate("/");
  }
  const showCart=()=>{
    navigate('/cart')
  }
  const isObjectEmpty = (objectName) => {
      return JSON.stringify(objectName) === "{}";
    };


  const [data,setData] =useState([])
  let userEmail = localStorage.getItem("userEmail");
  const loadcart = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER}/api/getCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    });
    const data= await res.json()
    // console.log(data.response.items);
    setData(data.response.items);
  }
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(()=>{loadcart();forceUpdate()},[data]);

if (window.location.pathname!=='/adminHome' && !localStorage.getItem('authAdminToken')){
  return (
    <div >
     <div className={click ? "main-container" : ""}  onClick={()=>Close()} />
      <nav className="navbar" onClick={e => e.stopPropagation()}>
        <div className="nav-container">
          <div exact to="/" className="nav-logo">
            <h2 >FastFood</h2>
          </div>
          {(!localStorage.getItem('authToken'))?
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={click ? {handleClick }: null}
              >
                Home
              </Link>
            </li>
        
            <li className="nav-item">
              <Link
                className="nav-links"
                to="/login"
                onClick={click ? handleClick  : null}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
               onClick={click ? handleClick : null} 
              >
                Contact Us
              </Link>
            </li>
          </ul>
          :<div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <button
             
                className="nav-links"
                onClick={()=> {navigate('/home');handleClick()}} style={{backgroundColor:"transparent",border:"none", height:""}}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button
              
                className="nav-links"
                onClick={()=>{navigate('/myorders');handleClick()}} style={{backgroundColor:"transparent",border:"none", height:""}}
              >
                Myorders
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-links"
                onClick={()=>{showCart();handleClick()}} style={{backgroundColor:"transparent",border:"none", height:""}}
              >
                
              
              <span class="fa-stack fa-1x has-badge" data-count={data!==null?data.length:0}>
  <i class="fa fa-circle fa-stack-2x"></i>
  <i class="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
</span>
</button>
            </li>
            <li className="nav-item">
              <button
                className="nav-links"
                onClick={()=>{handleLogout();handleClick()}} style={{backgroundColor:"transparent",border:"none", height:""}}
              >
               Logout 
              </button>
            </li>
            </ul>
            </div>}
          <div className="nav-icon" onClick={()=>{handleClick()}}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </ div>
  );}
  else{

  }
}



export default Nav;