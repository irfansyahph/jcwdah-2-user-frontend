import React from 'react';
import { BsFillPinMapFill } from "react-icons/bs";
import axios from 'axios';
import { API_URL } from '../../helper';
import { connect } from 'react-redux';

class AddressPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataAddress: []
        }
    }

    componentDidMount() {
        this.getAddress()
        console.log(this.state.dataAddress)
    }

    getAddress = async () => {
        try {
            let token = localStorage.getItem("shopToken")
            if (token) {
                let res = await axios.get(`${ API_URL }/users/get-address`, {
                    headers: {
                        'Authorization': `Bearer ${ token } `
                    }
                })
                console.log(res.data)
                this.setState({ dataAddress: res.data })
            }
        } catch (error) {
            console.log(error)
        }
    }

    printAddress = () => {
        return this.state.dataAddress.map((value, index) => {
            return <div key={index} className="row shadow p-2 mt-5 pb-3 bg-white rounded m-auto" style={{ width: "40%" }}>
                <h5><BsFillPinMapFill /> Lokasi</h5>
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
        return (
            <div className="p-5">
                <h1 className="text-center mt-5">Data Alamat</h1>
                <div>
                    {this.printAddress()}
                </div>
            </div>
        );
    }
}

const mapToProps = (globalState) => {
    return {
        address: globalState.authReducer.address,
        user_id: globalState.authReducer.user_id,
        email: globalState.authReducer.email
    }
}

export default connect(mapToProps)(AddressPage);