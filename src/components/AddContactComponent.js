import React, { useState, useEffect } from 'react'
import { randomId } from '../common/AppUtils';
import { LOCAL_STORAGE } from '../common/Constant';
import { connect } from 'react-redux'
import { contactData } from '../redux/action/Action';
import UserFormComponent from './UserFormComponent';
function AddContactComponent(props) {
    const [contactDetails, setContactDetails] = useState([])

    function addContactCallback(contactinfo) {
        let getuser = localStorage.getItem(LOCAL_STORAGE.CONTACT_DETAILS)
        let parse = JSON.parse(getuser);
        let contactlist = parse != null ? parse : [];
        contactlist.push(contactinfo)
        localStorage.setItem(LOCAL_STORAGE.CONTACT_DETAILS, JSON.stringify(contactlist))
        props.Contactdata(contactlist)
    }

    return (
        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 input-group">
                <input type="text" className="form-control input-text" placeholder="search contact" />
                <span className="input-group-addon">
                    <i className="fa search-icon-2 fa-search"></i>
                </span>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 add-contacts">
                <button type="button" className="btn btn-sm" data-toggle="modal" data-target="#exampleModalCenter">
                    + Add Contacts
                </button>
                <UserFormComponent type="new" callback={(contactinfo) => addContactCallback(contactinfo)} />
            </div>
        </div>
    )
}
const mapStateToProps = ({ ContactReducer }) => {
    return {

        Contactlist: ContactReducer.contactlist

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Contactdata: (data) => (dispatch(contactData(data))),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContactComponent)
