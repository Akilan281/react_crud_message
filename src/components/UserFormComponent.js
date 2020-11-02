import React, { useState, useEffect } from 'react'
import { randomId } from '../common/AppUtils'
import { LOCAL_STORAGE } from '../common/Constant'

function UserFormComponent(props) {


    const [firstname, setFirstName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [company, setCompany] = useState('')
    const [address, setAddress] = useState('')

    useEffect(() => {
        console.log('props.intialData', props.intialData)
    }, [])
    function setUserDetails(data) {
        console.log('data', data);
    }
    function handleInput(value, type) {
        if (type == "first") {
            setFirstName(value)
        } else if (type == "last") {
            setLastname(value)
        } else if (type == "email") {
            setEmail(value)
        } else if (type == "company") {
            setCompany(value)
        } else if (type == "address") {
            setAddress(value)
        } else {
            setPhone(value)
        }
    }
    function handleAdd() {
        let first = firstname
        let last = lastname
        let companyinfo = company
        let addressinfo = address;
        let mobile = phone;
        let emailinfo = email;
        let checkValidEmail = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email));

        if (first == "") {
            alert("enter first name")
        } else if (last == "") {
            alert("enter last name")
        } else if (!checkValidEmail) {
            alert("enter valid email")
        } else if (companyinfo == "") {
            alert("enter company name")
        } else if (addressinfo == "") {
            alert("enter your address")
        } else if (mobile.length < 10) {
            alert("enter valid mobile")
        } else {
            handleAddfunction(first, last, emailinfo, companyinfo, addressinfo, mobile)
        }
    }

    function handleAddfunction(first, last, emailinfo, companyinfo, addressinfo, mobile) {
        let contactinfo = {}
        contactinfo.firstname = first
        contactinfo.lastname = last
        contactinfo.email = emailinfo
        contactinfo.company = companyinfo
        contactinfo.address = addressinfo
        contactinfo.phone = mobile
        contactinfo.id = randomId()
        props.callback(contactinfo)
        setFirstName('')
        setLastname('')
        setEmail('')
        setCompany('')
        setAddress('')
        setPhone('')
    }
    return (
        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div >
                            <div class="form-group">
                                <input value={firstname} type="text" onChange={(e) => { handleInput(e.target.value, "first") }} class="form-control" placeholder="Enter Firstname" />
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
                        <button type="button" className="btn btn-success"  onClick={handleAdd}>+ Add Contact</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserFormComponent
