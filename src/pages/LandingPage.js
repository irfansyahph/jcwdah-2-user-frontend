import React from "react";
import axios from 'axios';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap'
import { Link } from "react-router-dom";
import { API_URL } from '../helper';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts = () => {
        axios.get(`${API_URL}/products/get`)
            .then((res) => {
                // console.table(res.data)
                this.setState({ products: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    printProducts = () => {
        return this.state.products.map((value, index) => {
            return <div key={index} className="col-md-3 px-3 py-3">
                <Card className="shadow rounded" style={{ fontFamily: "poppins" }}>
                    <Link to={`/product-detail?produk_id=${value.produk_id}`} style={{ textDecoration: "none", color: "black" }}>
                        <div className="text-center" style={{height:"280px"}}>
                            <CardImg style={{maxHeight:"290px"}} src={value.galeri_produk} alt={`image ${value.nama_produk}`} />
                        </div>
                        <hr style={{ marginTop: "0px" }} />
                        <CardBody>
                            <CardTitle>{value.nama_produk}</CardTitle>
                            <CardText style={{ fontWeight: "bold" }} >IDR. {value.harga_jual.toLocaleString()}</CardText>
                        </CardBody>
                    </Link>
                </Card>
            </div>
        })
    }

    sortProducts = (column, sort) => {
        axios.get(`${API_URL}/products/sort/${column}/${sort}`)
            .then((res) => {
                this.setState({ products: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="container row m-auto">
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Sort By
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <button class="dropdown-item" type="button" onClick={() => this.sortProducts("nama_produk", "asc")}>Produk A-Z</button>
                                    <button class="dropdown-item" type="button" onClick={() => this.sortProducts("nama_produk", "desc")}>Produk Z-A</button>
                                    <button class="dropdown-item" type="button" onClick={() => this.sortProducts("harga_jual", "asc")}>Harga Tertinggi-Terendah</button>
                                    <button class="dropdown-item" type="button" onClick={() => this.sortProducts("harga_jual", "desc")}>Harga Terendah-Tertinggi</button>
                                </div>
                            </div>
                            {this.printProducts()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;