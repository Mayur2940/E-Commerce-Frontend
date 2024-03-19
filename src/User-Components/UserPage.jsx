import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import UserNavbar from './UserNavbar';
import UserRegister from './UserRegister';
import UserLogin from './UserLogin';
import AllProductCust from '../Customer-Product-Component/AllProductCust';
import DisplayCart from '../Customer-Product-Component/DisplayCart';
import Orders from './Orders';
import AllProducts from '../Admin-Product-Component/AllProducts'
import AddProduct from '../Admin-Product-Component/AddProduct'
import UploadImage from '../Admin-Product-Component/UploadImage'
import UpdateProduct from '../Admin-Product-Component/UpdateProduct'
import OrderedItems from './OrderedItems';
import UserLogOut from './UserLogOut';
import HomeNavbar from '../MainPage-Components/HomeNavbar';


const UserPage = () => {
  return (
    <div>
      <Router>
        <HomeNavbar />
        <UserNavbar />
        <Switch>
          <Route exact path="/userlogin" component={UserLogin}></Route>
          <Route exact path="/userregister" component={UserRegister}></Route>
          <Route exact path="/usernavbar" component={UserNavbar}></Route>
          <Route exact path="/viewproducts" component={AllProductCust}></Route>
          <Route exact path="/cart" component={DisplayCart}></Route>
          <Route exact path="/orders" component={Orders}></Route>
          <Route exact path="/ulogout" component={UserLogOut}></Route>
          <Route exact path="/orders/:id" component={OrderedItems}></Route>
          <Route exact path="/productsall" component={AllProducts}></Route>
          <Route exact path="/addproduct" component={AddProduct}></Route>
          <Route exact path="/uploadimage/:id" component={UploadImage}></Route>
          <Route exact path="/editproduct/:id" component={UpdateProduct}></Route>
          <Redirect from="/userpage" to="/viewproducts" /> {/* Redirect to AllProductCust */}

        </Switch>
      </Router>
    </div>
  );
}

export default UserPage;