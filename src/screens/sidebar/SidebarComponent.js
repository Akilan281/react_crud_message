import React from 'react'
import './styles/sidebar.css'

function SidebarComponent() {
    return (
        <div className="">
            <div className="sidebar">
                <i className="fa icon burger fa-bars"></i>
                <i className="fa icon fa-home"></i>
                <i className="fa icon fa-user"></i>
                <i className="fa icon fa-calendar"></i>
                <i className="fa icon fa-clock-o"></i>
                <i className="fa icon fa-gear"></i>
            </div>
        </div>
    )
}

export default SidebarComponent
