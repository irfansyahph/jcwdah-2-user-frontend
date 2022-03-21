import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdEmail } from 'react-icons/md';
import { useLocation } from "react-router-dom";
import { API_URL } from '../helper';
import Swal from "sweetalert2";

function ResetPage() {
    const location = useLocation();
    const token = location.pathname.split("/")[2];

    const [toLogin, setToLogin] = useState(false);
    const [openPass, setOpenPass] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const isOpen = () => (openPass ? "fas fa-eye" : "fas fa-eye-slash");
    const onChangePassword = (e) => setNewPassword(e.target.value);

    const onSubmitForm = (e) => {
        e.preventDefault();

        axios.post(API_URL + "/users/resetPassword", {
            token,
            password: newPassword,
        })
            .then((res) => {
                Swal.fire(
                    "Your New Password is Set!",
                    "Silahkan Login Kembali",
                    "success"
                );
                setToLogin(true);
            })
            .catch((err) => {
                Swal.fire(
                    "Failed to Reset Your Password",
                    "Masukkan kembali password baru anda",
                    "error"
                );
                console.log(err);
            })
    }
    return (
        <div className="m-auto" style={{ fontSize: "20px", fontFamily: "poppins", width: "30%" }}>
            <p className="text-center font-weight-lighter py-3">
                Masukkan Password Baru
            </p>
            <div className="box" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <i className='form-control' style={{ width: "10%" }}><MdEmail /></i>
                <input
                    type={openPass ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="password baru"
                    defaultValue={newPassword}
                    onChange={onChangePassword}
                />
            </div>
            <small style={{ color: "grey", fontSize: 12 }}>
                * Password harus min 5 karakter, termasuk number
                and symbol
            </small>
            <button
                className='btn btn-outline-secondary mt-4'
                type="submit"
                style={{ float: "right" }}
                onClick={onSubmitForm}
            >Submit
            </button>
        </div>

    );
}

const styles = {
    password: {
        cursor: "pointer",
    },
};
export default ResetPage;