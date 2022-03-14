import React from "react";
import axios from 'axios';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap'
import { BsSearch } from "react-icons/bs";
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
                <Card className="shadow rounded"style={{ fontFamily: "poppins"}}>
                    <Link to={`/product-detail?produk_id=${value.produk_id}`} style={{ textDecoration: "none", color: "black" }}>
                        <CardImg width="100%" src={value.galeri_produk} alt={`image ${value.nama_produk}`} /><hr style={{marginTop:"0px"}}/>
                        <CardBody>
                            <CardTitle>{value.nama_produk}</CardTitle>
                            <CardText style={{ fontWeight: "bold" }} >IDR. {value.harga_jual.toLocaleString()}</CardText>
                        </CardBody>
                    </Link>
                </Card>
            </div>
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="container row m-auto">
                            {this.printProducts()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;