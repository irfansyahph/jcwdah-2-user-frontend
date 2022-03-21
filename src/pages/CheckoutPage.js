import React from "react";
import axios from 'axios';
import { BsFillPinMapFill } from "react-icons/bs";
import { connect } from 'react-redux';
import { API_URL } from "../helper";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { Redirect } from "react-router-dom";

class CheckoutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCheckout: [],
            dataCart: [],
            redirectToPayment: false
        }
    }
    componentDidMount() {
        this.getCheckout()
        this.getCart()
    }

    getCheckout = async () => {
        try {
            let token = localStorage.getItem("shopToken")
            if (token) {
                let res = await axios.get(`${API_URL}/users/get-address`, {
                    headers: {
                        'Authorization': `Bearer ${token} `
                    }
                })
                console.log(res.data)
                this.setState({ dataCheckout: res.data })
            }
        } catch (error) {
            console.log(error)
        }
    }

    getCart = async () => {
        try {
            let token = localStorage.getItem("shopToken")
            if (token) {
                let res = await axios.get(`${API_URL}/transactions/get-cart`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(res.data)
                this.setState({ dataCart: res.data })
            }
        } catch (error) {
            console.log(error)
        }
    }

    totalPayment = () => {
        let total = 0
        this.state.dataCart.forEach(item => total += item.qty * item.harga_jual)
        return { total: total + (total * 0.025), ongkir: total * 0.025 }
    }

    btBayar = (cart_id) => {
        console.log(this.state.dataCart)
        axios.patch(`${API_URL}/transactions/update-checkout`, {
            ongkos_kirim: this.totalPayment().ongkir,
            cart_id: this.state.dataCart[0].cart_id
        }).then((res) => {
            this.setState({ cart_id: this.state.dataCart[0].cart_id })
            this.setState({ redirectToPayment: true })
            alert("Data Tersimpan ✅")
        }).catch((err) => {
            console.log(err)
        })
    }

    printAddress = () => {
        return this.state.dataCheckout.map((value, index) => {
            return <div key={index} className="row shadow p-1 ml-5 mb-3 bg-white rounded" style={{ width: "90%" }}>
                <h5><BsFillPinMapFill /> Alamat</h5>
                <div className='col-md-4'>
                    <div>Alamat</div>
                    <div>Kota</div>
                    <div>Kode Pos</div>
                </div>
                <div className='col-md-5'>
                    <div>{value.alamat}</div>
                    <div>{value.kota}</div>
                    <div>{value.kode_pos}</div>
                </div>
            </div>
        })
    }

    render() {
        if (this.state.redirectToPayment) {
            return <Redirect to="/payment" />
        }
        return (
            <div className="p-5">
                <h1 className="text-center mt-5">Checkout</h1>
                <div className="row m-1">
                    <div className="col-8">
                        {this.printAddress()}
                    </div>
                    <div className="col-4">
                        <div className="shadow p-4 mr-5 mb-3 bg-white rounded">
                            <h2 style={{ fontWeight: 'bold' }}>Rp. {this.totalPayment().total.toLocaleString()}</h2>
                            <FormGroup>
                                <Label for="ongkir">Biaya Pengiriman</Label>
                                <Input type="text" id="ongkir" disabled value={this.totalPayment().ongkir} innerRef={elemen => this.ongkir = elemen} />
                            </FormGroup>
                            <Button className="primary" onClick={() => this.btBayar(this.cart_id)}>Bayar</Button>
                        </div>
                    </div>
                </div>
            </div >);
    }
}

const mapToProps = (globalState) => {
    return {
        cart_user: globalState.authReducer.cart,
        cart_id: globalState.authReducer.cart,
        user_id: globalState.authReducer.user_id,
        email: globalState.authReducer.email
    }
}

export default connect(mapToProps)(CheckoutPage);