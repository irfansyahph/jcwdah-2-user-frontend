import React from 'react';
import axios from 'axios';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { loginAction } from '../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { API_URL } from '../helper';
import { Link } from 'react-router-dom';

class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: "password",
            passVisible: "Show",
            redirect: false
        }
    }


    btnShowHide = () => {
        if (this.state.passType == "password") {
            this.setState({ passType: "text", passVisible: "Hide" })
        } else {
            this.setState({ passType: "password", passVisible: "Show" })
        }
    }

    btnSignIn = () => {
        let email = this.refs.email.value
        let password = this.refs.password.value

        if (email == "" || password == "") {
            alert(`Fill in form ❌`)
        } else {

            axios.post(`${API_URL}/users/login`, {
                email,
                password
            })
                .then((res) => {
                    console.log(res.data)
                    this.props.loginAction(res.data.loginData)
                    this.setState({ redirect: true })
                    // console.table(res.data)
                    localStorage.setItem("shopToken", res.data.loginData.token)
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    render() {
        if (this.props.user_id) {
            return (
                <Redirect to="/" />)
        }
        return (

            <div className="m-auto" style={{ fontSize: "20px", fontFamily: "poppins", width: "30%" }}>
                <h1 className='text-center font-weight-lighter py-3' style={{ fontSize: '18px' }}>Login ke Akun Anda</h1>
                <div className="box py-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <i className='form-control' style={{ width: "10%" }}><MdEmail /></i>
                    <input type="text" className="form-control" placeholder="Email" ref="email"></input>
                </div>
                <div className="form-group py-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <i className='form-control' style={{ width: "10%" }}><RiLockPasswordFill /></i>
                    <div className="input-group">
                        <input type={this.state.passType} className="form-control" placeholder="Password" ref="password"></input>
                        <div className="input-group-append" >
                            <span className="input-group-text" style={{ cursor: "pointer" }} onClick={this.btnShowHide}>{this.state.passVisible}</span>
                        </div>
                    </div>
                </div>
                <button type="button" className='btn btn-outline-secondary' style={{ float: "right" }} onClick={this.btnSignIn} >Masukkan</button>
                <p className="forgot-password text-left" style={{float:"left", fontSize:"smaller"}}>
                    <Link to={'/forgot-password'}>Lupa password?</Link>
                </p>
            </div>
        );
    }
}

const mapToProps = (globalState) => {
    return {
        user_id: globalState.authReducer.user_id
    }
}

export default connect(mapToProps, { loginAction })(SignInPage);