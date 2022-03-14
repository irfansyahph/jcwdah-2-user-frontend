import React from "react";
import { Button } from "reactstrap";
import { BsPlusSquareFill } from "react-icons/bs";

class PaymentPage extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (
            <div className="p-5">
                <h1 className="text-center mt-5">Pembayaran</h1>
                <div className="row border p-2 mt-5 pb-3 bg-white rounded m-auto" style={{ width: "50%" }}>
                    <h5 className="text-center text-muted">
                        Terima kasih atas pesanan anda, untuk melanjutkan proses pesanan silahkan transfer
                        ke nomor rekening yang tertera dan sertakan bukti transfer pada form yang disediakan.
                    </h5>
                    <hr className="my-3 m-auto" style={{ width: "95%" }} />
                    <h5 className="col-3 m-auto">
                        <div className="py-3">Nama Produk</div>
                        <div className="py-3">Total Tagihan</div>
                        <div className="py-3">Nomor Rekening</div>
                    </h5>
                    <h5 className="col-4">
                        <div className="py-3">XXX</div>
                        <div className="py-3">XXX</div>
                        <div className="py-3">XXX</div>
                    </h5>
                    <div className="py-3" style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button type="button" outline color="secondary" size="sm" ><BsPlusSquareFill /> Bukti Pembayaran</Button>
                    </div>
                </div>
                <div className="row mt-3">
                    <Button type="button" color="success" size="md" style={{width:"20%",margin:"auto"}} >Konfirmasi</Button>
                </div>
            </div>
        );
    }
}

export default PaymentPage;