import axios from 'axios';
import React from 'react';
import { Badge } from 'reactstrap';
import { API_URL } from '../../helper';

class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            histori: []
        }
    }

    componentDidMount() {
        this.getHistori()
    }

    getHistori = () => {
        axios.get(`${API_URL}/transactions/get-histori`)
            .then((res) => {
                this.setState({ histori: res.data })
                // console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    printHistori = () => {
        return this.state.histori.map((value, index) => {
            return <div className="row shadow p-2 mt-5 pb-3 bg-white rounded m-auto" style={{ width: "95%" }}>
                <div className='col-md-2'>
                    <div><img src={value.galeri_produk} width="70%" alt={value.nama_produk} /></div>
                </div>
                <div className='col-md-2 m-auto text-center'>
                    <div><b>Tanggal Transaksi</b></div>
                    <div>{value.date}</div>
                </div>
                <div className='col-md-2 m-auto text-center'>
                    <div><b>Nama Produk</b></div>
                    <div>{value.nama_produk}</div>
                </div>
                <div className='col-md-2 m-auto text-center'>
                    <div><b>Harga Produk</b></div>
                    <div>Rp {value.harga_jual}</div>
                </div>
                <h5 className='col-md-3 m-auto text-center'>
                    <div><Badge color={value.nama_status === "Menunggu Pembayaran" ? "info" : value.nama_status === "Menunggu Konfirmasi" ? "warning" : value.nama_status === "Transaksi Berhasil" ? "success" : "danger"}>{value.nama_status}</Badge></div>
                </h5>
            </div>
        })
    }

    render() {
        return (
            <div className="p-5">
                <h1 className="text-center mt-5">Daftar Transaksi Pembelian</h1>
                <div className="row shadow pb-3 bg-white rounded m-auto" style={{ width: "75%" }}>
                    {this.printHistori()}
                </div>
                {/* <div className="row shadow p-2 mt-5 pb-3 bg-white rounded m-auto" style={{ width: "60%" }}>
                    <div className='col-md-3'>
                        <div>Date</div>
                        <div>Image</div>
                    </div>
                    <div className='col-md-4'>
                        <div>Nama Produk</div>
                        <div>Harga</div>
                    </div>
                    <div className='col-md-5'>
                        <div>Menunggu Pembayaran</div>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default HistoryPage;