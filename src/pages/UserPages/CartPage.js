import React from 'react';
import { Button, Input, FormGroup, Label, InputGroup } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../../helper';
import { Redirect } from 'react-router-dom';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCart: [],
            redirectToCart: false
        }
    }

    componentDidMount() {
        this.getCart()
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

    btInc = (cart_id, produk_id, qty) => {
        axios.patch(`${API_URL}/transactions/update-cart`, {
            cart_id: cart_id,
            produk_id: produk_id,
            qty: qty + 1
        }).then((res) => {
            this.getCart()
        }).catch((err) => {
            console.log(err)
        })
    }

    btDec = (cart_id, produk_id, qty) => {
        axios.patch(`${API_URL}/transactions/update-cart`, {
            cart_id: cart_id,
            produk_id: produk_id,
            qty: qty - 1
        }).then((res) => {
            this.getCart()
        }).catch((err) => {
            console.log(err)
        })
    }

    btDeleteProduk = (cart_id, produk_id) => {
        axios.delete(`${API_URL}/transactions/delete-cart/${cart_id}/${produk_id}`)
            .then((res) => {
                this.getCart()
            }).catch((err) => {
                console.log(err);
            })
    }

    btCheckOut = (cart_id) => {
        this.setState({ redirectToCart: true })
        alert("Checkout Berhasil ✅")
        // axios.post(`${API_URL}/transactions/checkout`, {
        //     user_id: this.props.user_id,
        //     produk_id: this.state.dataCart[0].produk_id,
        //     nama_produk: this.state.dataCart[0].nama_produk,
        //     qty: this.state.dataCart[0].qty,
        //     harga_jual: this.state.dataCart[0].harga_jual,
        //     ongkos_kirim: this.totalPayment().ongkir,
        //     total_tagihan: this.totalPayment().total,
        //     galeri_produk: this.state.dataCart[0].galeri_produk
        // }).then((res) => {
        //     axios.post(`${API_URL}/transactions/payment`, {
        //         nama_produk: this.state.dataCart[0].nama_produk,
        //         total_tagihan: this.totalPayment().total
        //     })
        //     this.getCart()
        //     this.setState({ redirectToCart: true })
        //     alert("Checkout Berhasil ✅")
        // }).catch((err) => {
        //     console.log(err)
        // })
    }

    totalPayment = () => {
        let total = 0
        this.state.dataCart.forEach(item => total += item.qty * item.harga_jual)
        return { total: total + (total * 0.025), ongkir: total * 0.025 }
    }

    printCart = () => {
        return this.state.dataCart.map((item, index) => {
            return <div className="row shadow p-1 mb-3 bg-white rounded" >
                <div className="col-md-2">
                    <img src={item.galeri_produk} width="100%" />
                </div>
                <div className="col-md-3 d-flex justify-content-center flex-column">
                    <h5 style={{ fontWeight: 'bolder' }}>{item.nama_produk}</h5>
                    <h4 style={{ fontWeight: 'bolder' }}>IDR. {item.harga_jual.toLocaleString()}</h4>
                </div>
                <div className="col-md-5 d-flex align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                        <InputGroup style={{ width: "45%", marginLeft: "20px" }}>
                            <Button onClick={() => this.btDec(item.cart_id, item.produk_id, item.qty)}>-</Button>
                            <Input type="number" placeholder="qty" value={item.qty} />
                            <Button onClick={() => this.btInc(item.cart_id, item.produk_id, item.qty)}>+</Button>
                        </InputGroup>
                        <h4>IDR. {(item.harga_jual * item.qty).toLocaleString()}</h4>
                    </div>
                    <Button color="warning" onClick={() => this.btDeleteProduk(item.cart_id, item.produk_id)} style={{ border: 'none', float: 'right', marginLeft: "1vw" }} >Remove</Button>
                </div>

            </div>
        })
    }

    render() {
        if (this.state.redirectToCart) {
            return <Redirect to="/checkout" />
        }
        return (
            <div className="p-5">
                <h1 className="text-center mt-5">Keranjang Belanja</h1>
                <div className="row m-1">
                    <div className="col-8">
                        {this.printCart()}
                    </div>
                    <div className="col-4">
                        <div className="shadow p-4 mb-3 bg-white rounded">
                            <h3 style={{}}>Total Payment</h3>
                            <h2 style={{ fontWeight: 'bold' }}>Rp. {this.totalPayment().total.toLocaleString()}</h2>
                            <FormGroup>
                                <Label for="ongkir">Biaya Pengiriman</Label>
                                <Input type="text" id="ongkir" disabled value={this.totalPayment().ongkir} innerRef={elemen => this.ongkir = elemen} />
                            </FormGroup>
                            <div className="d-flex justify-content-end">
                                <Button type="button" color="success" onClick={() => this.btCheckOut()}>Checkout</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
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

export default connect(mapToProps)(CartPage);