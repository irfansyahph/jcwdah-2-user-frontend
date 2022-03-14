import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { updateCartAction } from "../actions";
import axios from "axios";
import { API_URL } from "../helper";
import { Button, Input, InputGroup } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// const ProductDetail = () => {
//     const [dataDetail, setDataDetail] = useState({})
//     const [qty, setQty] = useState(1)


//     let location = useLocation();
//     console.log(location)

//     useEffect(() => {
//         getProductDetail()
//     }, [])

//     const getProductDetail = async () => {
//         try {
//             let response = await axios.get(`${API_URL}/products/getAll${location.search}`)
//             setDataDetail(response.data[0])
//             console.log(response.data)
//         } catch (err) {
//             console.log(err.message)
//         }
//     }

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetail: {},
            qty: 1,
            redirectToCart: false
        }
    }

    componentDidMount() {
        this.getProductDetail()
    }

    getProductDetail = () => {
        axios.get(`${API_URL}/products/getAll${this.props.location.search}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ dataDetail: res.data[0] })
            }).catch((err) => {
                console.log(err)
            })
    }

    btInc = () => {
        if (this.state.qty < this.state.dataDetail.stok) {
            this.setState({ qty: this.state.qty += 1 })
        } else {
            alert("Product out of stock ❌")
        }
    }

    btDec = () => {
        if (this.state.qty > 1) {
            this.setState({ qty: this.state.qty -= 1 })
        }
    }

    btAddToCart = async () => {
        try {
            if (this.props.user_id) {
                let { dataDetail, qty } = this.state
                // let temp = [...this.props.cartUser]
                // temp.push({
                //     nama: dataDetail.nama,
                //     harga: dataDetail.harga,
                //     qty,
                //     subTotal: dataDetail.harga * qty,
                //     image: dataDetail.images[0]
                // })
                let res = await axios.post(`${API_URL}/transactions/add-cart`, {
                    produk_id: dataDetail.produk_id,
                    user_id: this.props.user_id,
                    qty
                })
                console.log(res.data)
                //     let res = await this.props.updateCartAction(temp, this.props.idUser)
                if (res.data.success) {
                    this.setState({ redirectToCart: true })
                    alert("Success Add To Cart ✅")
                }
            } else {
                alert("Login First !!!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let { dataDetail, qty, redirectToCart } = this.state
        if (redirectToCart) {
            return <Redirect to="/cart" />
        }
        return (
            <div className="container p-2" >
                {
                    dataDetail.produk_id &&
                    <>
                        <div className="row p-5">
                            <div className="col-sm-6 pt-5">
                                <img src={dataDetail.galeri_produk} alt={`${dataDetail.nama_produk}`} width="100%" />
                            </div>
                            <div className="col-sm-6" style={{ paddingTop: "6vw" }}>
                                <div>
                                    <h4 style={{ fontWeight: "bolder" }}>{dataDetail.nama_produk}</h4>
                                    <h2 style={{ fontWeight: "bolder" }}>IDR. {dataDetail.harga_jual.toLocaleString()}</h2>
                                </div>
                                <hr />
                                <div>
                                    <label style={{ fontWeight: "bold" }}>Description</label>
                                    <p style={{ textAlign: "justify" }}>{dataDetail.deskripsi_produk}</p>
                                </div>
                                <hr />
                                <div>
                                    <label style={{ fontWeight: "bold" }}>Stock</label>
                                    <p style={{ textAlign: "justify" }}>{dataDetail.stok}</p>
                                </div>
                                <hr />
                                <div className="d-flex mb-3">
                                    <label style={{ fontWeight: "bold" }}>Amount Buy :</label>
                                    <InputGroup style={{ width: "24%", marginLeft: "20px" }}>
                                        <Button onClick={this.btDec}>-</Button>
                                        <Input type="number" placeholder="qty" value={qty} />
                                        <Button onClick={this.btInc}>+</Button>
                                    </InputGroup>
                                </div>
                                <button type="button" className="btn btn-success" style={{ width: "100%" }} onClick={this.btAddToCart}>Add To Cart</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        )
    }
}

const mapToProps = (globalState) => {
    return {
        cart_user: globalState.authReducer.cart,
        user_id: globalState.authReducer.user_id,
    }
}

export default connect(mapToProps, { updateCartAction })(ProductDetail);