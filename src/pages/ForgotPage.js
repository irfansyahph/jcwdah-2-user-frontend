import React, { useState } from 'react';
import axios from 'axios';
import { MdEmail } from 'react-icons/md';
import { connect, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { API_URL } from '../helper';
import Swal from "sweetalert2";

function ForgotPage() {
    const [email, setEmail] = useState("");
    const onChangeEmail = (e) => setEmail(e.target.value);

    const onSubmitForm = (e) => {
        e.preventDefault();

        axios
            .post(`${API_URL}/users/forgotPassword`, { email })
            .then((res) => {
                Swal.fire("Reset Password!", "reset Password berhasil!", "success");
                console.log("success");
            })
            .catch((err) => {
                Swal.fire(
                    "Reset Password Failed!",
                    "Email anda tidak terdaftar",
                    "error");
                console.log(err);
            });
    };


    return (

        <div className="m-auto" style={{ fontSize: "20px", fontFamily: "poppins", width: "30%" }}>
            <h1 className='text-center font-weight-lighter py-3' style={{ fontSize: '18px' }}>Lupa Password</h1>
            <div className="box py-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <i className='form-control' style={{ width: "10%" }}><MdEmail /></i>
                <input type="email" className="form-control" placeholder="Email" onChange={onChangeEmail} id="email" defaultValue={email}></input>
            </div>

            <button type="submit" className='btn btn-outline-secondary' style={{ float: "right", }} onClick={onSubmitForm} >Submit
            </button>
        </div>

    );
}
export default ForgotPage;