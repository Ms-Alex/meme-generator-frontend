import React from 'react';

class ImgCard extends React.Component {

    render(){
        let width
        let height
        if (this.props.img.width > this.props.img.height) {
            width = "95%";
            height = "55%";
        } else {
            width = "80%";
            height = "80%"
        }

        return (
            <React.Fragment>
                <div className="card-panel teal lighten-4">
                    <img src={this.props.url} alt={this.props.img.id} width={width} height={height} className="selected-img" />
                </div>
                <h3 className="top-txt-img">
                    {this.props.topText}
                </h3>
                <h3 className="bottom-txt-img">
                    {this.props.bottomText}
                </h3>
            </React.Fragment> 
        )
    }
}

export default ImgCard;