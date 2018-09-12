import React from 'react';
// import { Redirect } from 'react-router-dom';
// import generateAdapter from '../Adapter'
import ImgCard from './ImgCard'

// const memesAPI = 'http://localhost:4000/api/v1/memes'

class EditMeme extends React.Component {
    state = {
        meme: '',
        topText: '',
        bottomText: '',
        tagsAsString: '',
        imgTags: [],
    } 

    componentDidMount() {
        this.setState({
            meme: this.props.meme,
            topText: this.props.meme.top_text,
            bottomText: this.props.meme.bottom_text,
            // imgTags: this.props.meme.tags
        })
    }

    // HANDLE EVENT LISTENERS
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleTagsChange = (event) => {
        this.setState({
            tagsAsString: event.target.value
        }, () => this.turnToArray())
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.meme.img_url)
        // this.createMeme();
        
        // return <Redirect to="/profile" />
        // this.props.history.push("/profile")
    }

    // createMeme = () => {
    //     generateAdapter(memesAPI).create({
    //         user_id: this.state.user.id,
    //         img_url: this.state.clickedImg.url,
    //         top_text: this.state.topText,
    //         bottom_text: this.state.bottomText,
    //         width: this.state.clickedImg.width,
    //         height: this.state.clickedImg.height
    //     }, (data) => this.props.addMemeToState(data))
    // }

    // HELPER FUNCTS
    turnToArray = () => {
        let tagsList = this.state.tagsAsString.split(",").map(tag => tag.trim())
        tagsList = tagsList.filter(tag => tag !== "")
        this.setState({
            imgTags: tagsList
        }, () => console.log(this.state.imgTags))
    }

    imgCardPreview = () => {
        return <ImgCard img={this.state.meme} topText={this.state.topText} url={this.state.meme.img_url} bottomText={this.state.bottomText} />
    }

    render() {
        return (
            <div>

                <h1>Edit meme:</h1>

                <div className="img-preview">
                    {this.imgCardPreview()}
                </div>

                <div className="img-form">
                    <form onSubmit={this.handleSubmit}>


                        <br />

                        <textarea rows="2" columns="50" value={this.state.topText} name="topText" onChange={this.handleChange} placeholder="Add top text" ></textarea>

                        <br />

                        <textarea rows="2" columns="50" value={this.state.bottomText} name="bottomText" onChange={this.handleChange} placeholder="Add bottom text" ></textarea>

                        <br />

                        <textarea rows="1" columns="50" placeholder="Add tags (separate with commas)" value={this.state.tagsAsString} onChange={this.handleTagsChange}  ></textarea>

                        <br />
                        <br />

                        <input type="submit" value="Update meme!" />
                    </form>
                </div>
            </div>
        )
    }
}

export default EditMeme;