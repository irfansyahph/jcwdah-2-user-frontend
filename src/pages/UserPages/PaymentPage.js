import React from "react";
import { Button, Input } from "reactstrap";
import axios from "axios";
import { API_URL } from "../../helper";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class PaymentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payment: [],
            fileName: "Select Image",
            fileUpload: null,
            defaultImage: "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg",
            redirectToHistoryPage: false
        }
    }

    componentDidMount() {
        this.getPayment()
    }

    getPayment = () => {
        axios.get(`${API_URL}/transactions/get-payment`)
            .then((res) => {
                this.setState({ payment: res.data })
                // console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtImageUpload = (e) => {
        if (e.target.files[0]) {
            this.setState({ fileName: e.target.files[0].name, fileUpload: e.target.files[0] });
        } else {
            this.setState({ fileName: "Select Image", fileUpload: null })
        }
    }

    btKonfirmasi = () => {
        let formData = new FormData()
        let data = {
            user_id: this.props.user_id
        }
        formData.append('data', JSON.stringify(data));
        formData.append('images', this.state.fileUpload);

        axios.post(`${API_URL}/transactions/add-bukti-pembayaran`, formData)
            .then((res) => {
                this.setState({ redirectToHistoryPage: true })
                alert("Data Tersimpan ✅")
            }).catch((err) => {
                console.log(err)
            })
    }

    printPayment = () => {
        return this.state.payment.map((value, index) => {
            return <div key={index} className="row border p-2 mt-5 pb-3 bg-white rounded m-auto" style={{ width: "50%" }}>
                <h5 className="text-center text-muted">
                    Terima kasih atas pesanan anda, untuk melanjutkan proses pesanan silahkan transfer
                    ke nomor rekening yang tertera dan sertakan bukti transfer pada form yang disediakan.
                </h5>
                <hr className="my-3" style={{ width: "95%" }} />
                <h5 className="col-3 ml-5">
                    <div className="py-3">Total Tagihan</div>
                    <div className="py-3">Nomor Rekening</div>
                </h5>
                <h5 className="col-1">
                    <div className="py-3">:</div>
                    <div className="py-3">:</div>
                </h5>
                <h5 className="col-4 m-auto">
                    <div className="py-3">Rp. {value.total_pembayaran}</div>
                    <div className="py-3">XXX a.n. Joe</div>
                </h5>
                {/* <hr className="my-3" style={{ width: "95%" }} /> */}
                <div className="row mt-5">
                    <div className="col-md-6 text-center">
                        <img
                            id="imagePreview"
                            width="50%"
                            src={this.state.fileUpload ? URL.createObjectURL(this.state.fileUpload) : this.state.defaultImage} />
                    </div>
                    <div className="col-md-6 m-auto">
                        <Input type="file" onChange={this.onBtImageUpload} style={{ width: "60%" }} />
                    </div>
                </div>
                <div className="row mt-5">
                    <Button type="button" color="success" size="md" style={{ width: "20%", margin: "auto" }} onClick={this.btKonfirmasi}>Konfirmasi</Button>
                </div>
            </div>
        })
    }

    render() {
        if (this.state.redirectToHistoryPage) {
            return <Redirect to="/history" />
        }
        return (
            <div className="p-5">
                <h1 className="text-center mt-5">Pembayaran</h1>
                {this.printPayment()}
            </div>
        );
    }
}

const mapToProps = (globalState) => {
    return {
        user_id: globalState.authReducer.user_id,
        email: globalState.authReducer.email
    }
}

export default connect(mapToProps)(PaymentPage);