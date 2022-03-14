import React from 'react';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import ProductDetail from './pages/ProductDetail';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import VerificationPage from './pages/VerificationPage';
import ForgotPage from './pages/ForgotPage';

import ProfilePage from './pages/UserPages/ProfilePage';
import CartPage from './pages/UserPages/CartPage';
import PaymentPage from './pages/UserPages/PaymentPage';
import HistoryPage from './pages/UserPages/HistoryPage';

import ProductAdmin from './pages/AdminPages/ProductAdmin';
import TransactionAdmin from './pages/AdminPages/TransactionAdmin';

import { Switch, Route } from 'react-router-dom'
import { loginAction, keepLogin } from './actions';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.reLogin()
  }

  reLogin = () => {
    let token = localStorage.getItem("shopToken")
    console.log(token)
    if (token) {
      this.props.keepLogin(token)
    }
  }

  render() {
    return (
      <div style={{ paddingTop: "65px" }}>
        <Navbar brand="W-Commerce" />
        <div style={{ minHeight: "95vh" }}>
          <Switch>
            <Route path="/" component={LandingPage} exact />
            <Route path="/products" component={ProductPage} />
            <Route path="/product-detail" component={ProductDetail} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/forgot" component={ForgotPage} />
            <Route path="/verification" component={VerificationPage} />
            {
              this.props.user_role == "Admin" ?
                <>
                  <Route path="/products-admin" component={ProductAdmin} />
                  <Route path="/transactions-admin" component={TransactionAdmin} />
                </> :
                <>
                  <Route path="/profile" component={ProfilePage} />
                  <Route path="/cart" component={CartPage} />
                  <Route path="/payment" component={PaymentPage} />
                  <Route path="/history" component={HistoryPage} />
                </>
            }
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapToProps = (globalState) => {
  return {
    user_role: globalState.authReducer.user_role
  }
}

export default connect(mapToProps, { loginAction, keepLogin })(App);