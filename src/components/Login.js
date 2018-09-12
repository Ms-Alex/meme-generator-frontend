import React from 'react';

class Login extends React.Component {

    state = {
        value:''
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onLoginSubmit(this.state.value)
        this.setState({
            value: ''
        })

    }

    render(){
        return(
            <div className="container center-align login-form hoverable">
                <h1>"Login" To Meme Space</h1>

                <form onSubmit={this.handleSubmit}>

                    <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter a username" required />
                    <br />

                    <input className="waves-effect waves-light btn" type="submit" value="Submit" waves-effect waves-light btn/>

                </form>
            </div>
        )
    }
}

export default Login;