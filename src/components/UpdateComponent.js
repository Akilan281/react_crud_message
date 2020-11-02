import React, { useState } from 'react'

function UpdateComponent(props) {
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastname] = useState(props.updatelist.lastname)
    const [email, setEmail] = useState(props.updatelist.email)
    const [phone, setPhone] = useState(props.updatelist.phone)
    const [company, setCompany] = useState(props.updatelist.company)
    const [address, setAddress] = useState(props.updatelist.address)

    function handleEdit(value) {
        console.log("EDIY", value)
    }
    function handleInput() {

    }
    return (
        <div>
            <i className="fa fa-edit" type="button" data-toggle="modal" data-target="#exampleModal" onClick={() => handleEdit(props.updatelist)}></i>
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div >
                                <div class="form-group">
                                    <input value={props.updatelist.firstname} type="text" onChange={(e) => { handleInput(e.target.value, "first") }} class="form-control" placeholder="Enter Firstname" />
                                </div>
                                <div class="form-group">
                                    <input value={lastname} type="text" onChange={(e) => { handleInput(e.target.value, "last") }} class="form-control" placeholder="Enter Lastname" />
                                </div>
                                <div class="form-group">
                                    <input value={email} type="email" onChange={(e) => { handleInput(e.target.value, "email") }} class="form-control" placeholder="Enter email" />
                                </div>
                                <div class="form-group">
                                    <input value={company} type="text" onChange={(e) => { handleInput(e.target.value, "company") }} class="form-control" placeholder="Enter company" />
                                </div>
                                <div class="form-group">
                                    <input value={address} type="text" onChange={(e) => { handleInput(e.target.value, "address") }} class="form-control" placeholder="Enter address" />
                                </div>
                                <div class="form-group">
                                    <input value={phone} type="number" onChange={(e) => { handleInput(e.target.value) }} class="form-control" placeholder="Enter phone" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateComponent
