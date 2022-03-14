import React from 'react';

class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="p-5">
                <h1 className="text-center mt-5">Daftar Transaksi Pembelian</h1>
                <div className="row shadow p-2 mt-5 pb-3 bg-white rounded m-auto" style={{ width: "60%" }}>
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
                </div>
            </div>
        );
    }
}

export default HistoryPage;