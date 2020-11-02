import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { getRandomColor } from '../../common/AppUtils';

import './styles/home.css'
import { LOCAL_STORAGE } from '../../common/Constant';
import AddContactComponent from '../../components/AddContactComponent';
import { contactData, setUser } from '../../redux/action/Action';
import HeaderComponent from '../../components/HeaderComponent';
import ChatComponent from '../../components/ChatComponent';
import UpdateComponent from '../../components/UpdateComponent';
import UserFormComponent from '../../components/UserFormComponent';

function HomeComponent(props) {
    const userForm = useRef();
    var editUserDetails = {};
    const [contactDetails, setContactDetails] = useState([])
    const [Details, setDetails] = useState([])
    const [chat, setChat] = useState(false)

    useEffect(() => {
        var getUserDetails = localStorage.getItem(LOCAL_STORAGE.CONTACT_DETAILS);
        var contactlist = getUserDetails != null ? JSON.parse(getUserDetails) : [];
        props.contactdata(contactlist)
        var userDetails = {
            'id': '0'
        };
        var getUser = localStorage.getItem(LOCAL_STORAGE.USER);
        if (getUser != null) {
            userDetails = JSON.parse(getUser);
        }
        props.setUser(userDetails)
        setContactDetails(contactlist)
        setDetails([])
    }, [])

    useEffect(() => {
        updateContactDetails()
    }, [props.Contactlist, props.user.id])

    useEffect(() => {
        setDetails([])
    }, [props.user.id])
    function updateContactDetails() {
        var contactDetails = Object.assign([], props.Contactlist);
        contactDetails = contactDetails.filter((itemss) => itemss.id != props.user.id)
        setContactDetails(contactDetails);
    }
    function viewDetails(item, index) {
        console.log("item", item)
        if (props.user.id == '0') {
            props.setUser(item)
            setDetails([])
        } else {
            let details = props.Contactlist
            let filtered = details.filter((value) => value.id == item.id)
            setDetails(filtered)
            console.log("valuye", filtered)
        }
    }

    function handleDelete(item) {
        let deldata = Object.assign([], contactDetails);
        let indexofdel = deldata.findIndex((delitem) => delitem.id == item.id)
        console.log("index", indexofdel)
        deldata.splice(indexofdel, 1)
        setContactDetails(deldata)
        //props.setUser(item)
        localStorage.setItem(LOCAL_STORAGE.CONTACT_DETAILS, JSON.stringify(deldata))
    }
    function handleEdit(item) {
        // .setUserDetails(Object.assign([], item))
    }

    function addContactCallback(contactinfo) {
        let getuser = localStorage.getItem(LOCAL_STORAGE.CONTACT_DETAILS)
        let parse = JSON.parse(getuser);
        let contactlist = parse != null ? parse : [];
        contactlist.push(contactinfo)
        localStorage.setItem(LOCAL_STORAGE.CONTACT_DETAILS, JSON.stringify(contactlist))
        props.Contactdata(contactlist)
    }

    function handleChat() {
        setChat(true)
    }
    function handleClose() {
        setChat(false)
    }
    return (
        <div>
            <HeaderComponent />
            <div className="body-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-8 col-sm-12 address-book">
                            <div><i className="fa fa-address-book"></i></div>
                            <div className="contact-text">
                                <h4>Contacts</h4>
                                <a className="inner-text">welcome to DoodleBlue contact</a>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-4 col-sm-12 address-book">
                            <div className="contact-text-1">
                                <a className="inner-text">sort by :  </a>
                                <h6> Date created</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-content">
                <div className="container">
                    <AddContactComponent />
                </div>
                <div className="container">
                    <div className="row contact-list">
                        <div className=" col-lg-7 col-md-7 col-sm-12 ">
                            <table className="table borderless">
                                <thead className="t-head">
                                    <tr>
                                        <th scope="col">+</th>
                                        <th scope="col">Basic Info</th>
                                        <th scope="col">Company</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {contactDetails.map((item, index) => {
                                        return (
                                            <tr>
                                                <th scope="row"><input type="checkbox" /></th>
                                                <td className="table-body">
                                                    <div className="name-logo" style={{ background: getRandomColor() }}>{item.firstname.slice(0, 1)}{item.lastname.slice(0, 1)}</div>
                                                    <div className="table-text">
                                                        <h6 onClick={() => viewDetails(item, index)}>{item.firstname} {item.lastname}</h6>
                                                        <p className="inner-text">{item.email}</p>
                                                    </div>
                                                </td>
                                                <td>{item.company}</td>
                                                <td>
                                                    <span className="action-wrap">
                                                        <i className="fa fa-edit" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => handleEdit(item)}></i>
                                                        <i className="fa fa-trash-o" onClick={() => handleDelete(item)}></i></span></td>
                                                <td> </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <UserFormComponent ref={userForm} type="update" intialData={editUserDetails} callback={(contactinfo) => addContactCallback(contactinfo)} />
                            </table>
                        </div>

                        {!chat ? Details.length > 0 && Details.map((detailitem) => {
                            return (
                                <div className="contact-details col-lg-5 col-md-5 col-sm-12 ">
                                    <div className="contact-info">
                                        <div className="name-logo2" style={{ background: getRandomColor() }}>{detailitem.firstname.slice(0, 1)}{detailitem.lastname.slice(0, 1)}</div>
                                        <div className="contact-text"><h6>{detailitem.firstname} {detailitem.lastname}</h6>
                                            <a className="inner-text">{detailitem.email}</a></div>
                                    </div>
                                    <div className="details">
                                        <a className="inner-text2">Fullname: </a>
                                        <h6 className="inner-text3">{detailitem.firstname} {detailitem.lastname}</h6>
                                    </div>
                                    <div className="details">
                                        <a className="inner-text2">Email Id: </a>
                                        <h6 className="inner-text3">{detailitem.email}</h6>
                                    </div>
                                    <div className="details">
                                        <a className="inner-text2">Phone: </a>
                                        <h6 className="inner-text3">{detailitem.phone}</h6>
                                    </div>
                                    <div className="details">
                                        <a className="inner-text2">Company: </a>
                                        <h6 className="inner-text3">{detailitem.company}</h6>
                                    </div>
                                    <div className="details">
                                        <a className="inner-text2">Address: </a>
                                        <h6 className="inner-text3">{detailitem.address}</h6>
                                    </div>

                                    <div className="details">
                                        <button type="button" className="btn btn-primary" onClick={handleChat}>
                                            Chat
                                        </button>
                                    </div>
                                </div>
                            )
                        }) :
                            <ChatComponent chatlist={Details} closeCallback={() => handleClose()} />
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}


const mapStateToProps = ({ ContactReducer }) => {
    return {
        Contactlist: ContactReducer.contactlist,
        user: ContactReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        contactdata: (data) => (dispatch(contactData(data))),
        setUser: (data) => (dispatch(setUser(data))),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
