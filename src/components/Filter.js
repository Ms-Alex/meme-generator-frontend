import React from 'react';

class Filter extends React.Component {

    render() {
        return (
            <div className="filter container">
                <input type="text" onChange={this.props.handleChange} value={this.props.query} placeholder="Search by tag name" />
            </div>
        )
    }
}

export default Filter;