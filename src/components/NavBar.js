import React from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends React.Component {


    render(){
        return(

            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">

                            <NavLink className="brand-logo" to="/main">MemeSpace</NavLink>

                        <ul>

                            <li className="right">
                                <NavLink to="/" onClick={this.props.handleClick}>Exit</NavLink>
                            </li>

                            <li className="right">
                                <NavLink to="/add-meme">Add A Meme</NavLink>
                            </li>
                            
                            <li className="right">
                                <NavLink to="/profile"> Profile</NavLink>
                            </li>

                            <NavLink className="right" to="/main">Home</NavLink>
                            
                        </ul>
                        
                    </div>
                </nav>
            </div>

            
        )
    }
}

export default NavBar;