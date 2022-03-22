import React from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs'
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { logoutAction } from '../actions'
import { Redirect } from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    btnLogOut = () => {
        localStorage.removeItem("shopToken");
        this.props.logoutAction()
    }

    render() {

        return (
            <nav className={`navbar navbar-expand-lg fixed-top`} style={{ fontFamily: "poppins", backgroundColor: "#B0E0E6" }}>
                <div className='container'>
                    <div className='col-md-2'>
                        <Link className="navbar-brand font-weight-bold" style={{ color: "#008080", fontSize: '30px' }} to="/">{this.props.brand}</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
                    <div className="col-md-7 input-group rounded" style={{ width: "100%" }}>
                        <input type="search" className="form-control rounded" placeholder="Search Product" ref="resi" style={{ width: "100px" }} />
                        <Button className='bg-primary' size="sm" type="button" >
                            < BsSearch />
                        </Button>
                    </div>
                    <div className='col-md-3'>
                        {
                            this.props.user_id != null
                                ?
                                <div className="ml-auto">
                                    {/* <BsFillCartFill /> */}
                                    <div class="btn-group">
                                        <button type="button" className="btn btn-outline-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Hello, {this.props.username}
                                        </button>
                                        <div className="dropdown-menu">
                                            {
                                                this.props.user_role === "user" ?
                                                    <div>
                                                        {/* <Link to={`/profile?user_id=${value.produk_id}`} className="dropdown-item" style={{ cursor: "pointer" }}>Profile</Link> */}
                                                        <Link to="/profile" className="dropdown-item" style={{ cursor: "pointer" }}>Profile</Link>
                                                        <Link to="/cart" className="dropdown-item" style={{ cursor: "pointer" }}>Cart</Link>
                                                        <Link to="/history" className="dropdown-item" style={{ cursor: "pointer" }}>Transactions</Link>
                                                    </div>
                                                    :
                                                    <div>
                                                        <Link to="/products-admin" className="dropdown-item" style={{ cursor: "pointer" }}>Manage Products</Link>
                                                        <Link to="/transactions-admin" className="dropdown-item" style={{ cursor: "pointer" }}>Manage Transactions</Link>
                                                    </div>
                                            }
                                            <div className="dropdown-divider"></div>
                                            <div className="dropdown-item" style={{ cursor: "pointer" }} onClick={this.btnLogOut}>Logout</div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="nav-link text-white ml-auto">
                                    <Link className="btn btn-outline-dark font-weight-bold" style={{ fontSize: '14px' }} to="/signup">Daftar</Link>
                                    <Link className="btn btn-outline-light font-weight-bold" style={{ fontSize: '14px' }} to="/signin">Masuk</Link>

                                </div>
                        }
                    </div>
                </div>
                {/* </div> */}
            </nav>
        );
    }
}

const mapToProps = (globalState) => {
    console.log(globalState.authReducer)
    return {
        user: globalState.authReducer,
        user_id: globalState.authReducer.user_id,
        email: globalState.authReducer.email,
        username: globalState.authReducer.username,
        user_role: globalState.authReducer.user_role,
        produk_id: globalState.authReducer.cart,
        cartUser: globalState.authReducer.cart
    }
}

export default connect(mapToProps, { logoutAction })(Navbar);