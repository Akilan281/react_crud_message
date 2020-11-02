import React from 'react'
import { connect } from 'react-redux'
import { LOCAL_STORAGE } from '../common/Constant';
import { contactData, setUser } from '../redux/action/Action';

function HeaderComponent(props) {

    function handleSelect(value) {
        var findUser = props.contactDetails.find(item => item.id == value);
        findUser = findUser ?? {
            'id': '0'
        };
        props.setUser(findUser);
        localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(findUser))
    }

    return (
        <div className="head-content">

            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-9 col-md-8 col-sm-12">
                        <div className="search">
                            <i className="fa search-icon fa-search"></i>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <div className="user-info">
                            <div>+ Add</div>
                            <div>
                                <i className="fa icons fa-envelope" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" ></i>
                            </div>
                            <div>
                                {Object.keys(props.user).length > 0 && Object.keys(props.contactDetails).length > 0 ?
                                    <select id="ddlViewBy" onChange={(e) => handleSelect(e.target.value)} value={props.user.id}>
                                        <option value={'0'}>username</option>
                                        {props.contactDetails.map((items) => {
                                            return (
                                                <option value={items.id}  >{items.firstname} {items.lastname} </option>
                                            )
                                        })
                                        }
                                    </select>
                                    : null}
                            </div>
                            <div><i className="fa  icons fa-user"></i></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
