import React, { useState, useEffect } from 'react'
import './styles/component.css'
import { randomId, getRandomColor } from '../common/AppUtils';
import { connect } from 'react-redux'
import { LOCAL_STORAGE } from '../common/Constant';
import { contactData, setUser } from '../redux/action/Action';

function ChatComponent(props) {

    const [message, setMessagevalue] = useState('')
    const [Messages, setMessages] = useState([])


    useEffect(() => {
        let getuser = localStorage.getItem(LOCAL_STORAGE.MESSAGE)
        let parse = JSON.parse(getuser);
        let messageDetails = parse != null ? parse : [];

        // let userfind = Object.assign([], props.contactDetails)
        // let userExist = userfind.find((item)=> item.id == messageDetails.senderid || item.id == messageDetails.receiverid)
        // if(userExist){
        //     setMessages(messageDetails)
        // }else{
        //     setMessages([])
        // }
        setMessages(messageDetails)
        console.log("Message", messageDetails)
        // console.log("userfind", userfind)
    }, [])

    function handlemessage(value) {
        setMessagevalue(value)
    }

    function hanleSend(itemdetails) {
        let getuser = localStorage.getItem(LOCAL_STORAGE.MESSAGE)
        let parse = JSON.parse(getuser);
        let messageDetails = parse != null ? parse : [];
        let sender = Object.assign({}, props.user)
        let receiver = itemdetails;
        let messageinfo = {
            senderid: sender.id,
            receiverid: receiver.id,
            message: message,
            messageid: randomId(),

        }

        messageDetails.push(messageinfo)
        localStorage.setItem(LOCAL_STORAGE.MESSAGE, JSON.stringify(messageDetails))
        setMessages(messageDetails)
        setMessagevalue("")

    }

    return (props.chatlist.map((item) => {
        return (
            <div className="chat-details col-lg-5 col-md-5 col-sm-12 ">
                <div className="chat">
                    <div className="chat-header">
                        <div className="profile">
                            <div className="left">
                                <div className="pp">
                                    <div className="name-logo" style={{ background: 'green' }}>{item.firstname.slice(0, 1)}{item.lastname.slice(0, 1)}</div>
                                </div>
                                <div className="name">
                                    <h2>{item.firstname}</h2>
                                    <span>Online</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chat-box">
                        {Messages.filter((filtmesg) => ((filtmesg.senderid == props.user.id && filtmesg.receiverid == item.id) ||
                            (filtmesg.senderid == item.id && filtmesg.receiverid == props.user.id))).map((send) => {
                                return (send.senderid == props.user.id ?
                                    <div className="chat-r">
                                        <div className="sp">
                                        </div>

                                        <div className="mess mess-r">
                                            <p>{send.message}</p>
                                        </div>
                                    </div>
                                    :
                                    <div className="chat-l">
                                        <div className="sp"></div>
                                        <div className="mess">
                                            <p>{send.message}</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="chat-footer">
                        <input
                            value={message}
                            className="form-control"
                            onChange={(e) => handlemessage(e.target.value)} placeholder="Type a message" />
                        <div className="iconss">

                            <i className="fa fa-send-o"
                                onClick={() => hanleSend(item)}>
                            </i>
                        </div>
                    </div>
                </div>

                <button type="button" className="btn btn-sm chat-close" onClick={() => props.closeCallback()}>
                    <i class="fa fa-times-circle" />
                </button>
            </div>
        )
    }));
}

const mapStateToProps = ({ ContactReducer }) => {
    return {
        contactDetails: ContactReducer.contactlist,
        user: ContactReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        contactdata: (data) => (dispatch(contactData(data))),
        setUser: (data) => (dispatch(setUser(data))),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent)