import React from 'react';
import { Redirect } from 'react-router-dom';
import generateAdapter from '../Adapter'
import ImgCard from './ImgCard'

const imagesAPI = 'https://api.imgflip.com/get_memes'
const memesAPI = 'http://localhost:4000/api/v1/memes'

class AddMeme extends React.Component {
    state = {
        user: '',
        images: [],
        clickedImg: '',
        topText: '',
        bottomText: '',
        tagsAsString: '',
    }

    getImages = () => {
        generateAdapter(imagesAPI).index(data => this.setState({ images: data.data.memes, clickedImg: data.data.memes[0] }) )
    }

    getUser = () => {
        let user = this.props.user
        this.setState({
            user: user
        })
    }
    
    componentDidMount(){
        this.getImages();
        this.getUser();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleTagsChange = (event) => {
        this.setState({
            tagsAsString: event.target.value
        })
    }

    handleImgClick = (event) => {
        let imgObj = this.state.images.find(img => img.id === event.target.dataset.img)
        this.setState({
            clickedImg: imgObj
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.createMeme();
        alert("🧚 Successfully created! Click on Logo or your profile. 🧚")

        return <Redirect to="/profile" />
    }

    createMeme = () => {
        generateAdapter(memesAPI).create({
            user_id: this.state.user.id, 
            img_url: this.state.clickedImg.url,
            top_text: this.state.topText,
            bottom_text: this.state.bottomText,
            width: this.state.clickedImg.width,
            height: this.state.clickedImg.height, 
            tags: this.state.tagsAsString,
        }, (data) => {
            this.setState({
                topText: '',
                bottomText: '',
                tagsAsString: '',
            }, this.props.addMemeToState(data))
        })
    }

    imgMapperSelection = () => {
        return this.state.images.map(img => <div onClick={this.handleImgClick} className="img-selection" key={img.id} data-img={img.id} style={{ background: `url(${img.url})`, backgroundSize: '60px 60px' }} >
        </div>)
    }

    imgCardPreview = () => {
        return <ImgCard img={this.state.clickedImg} topText={this.state.topText} url={this.state.clickedImg.url} bottomText={this.state.bottomText} />
    }

    render() {
        return (
            <div>
                
                <h2>Add a new meme:</h2>

                <div className="img-preview">
                    {this.imgCardPreview()}
                </div>

                <div className="img-form">
                    <form onSubmit={this.handleSubmit}>
                        <p>Select an image:</p>

                        <div className="wrapper">
                            {this.imgMapperSelection()}

                        </div>

                        <br />

                        <textarea rows="2" columns="50" value={this.state.topText} name="topText" onChange={this.handleChange} placeholder="Add top text" ></textarea>

                        <br />

                        <textarea rows="2" columns="50" value={this.state.bottomText} name="bottomText" onChange={this.handleChange} placeholder="Add bottom text" ></textarea>

                        <br />

                        <textarea rows="1" columns="50" placeholder="Add tags (separate with commas)" value={this.state.tagsAsString} onChange={this.handleTagsChange}  required></textarea>

                        <br />
                        <br />

                        <input className="waves-effect waves-light btn" type="submit" value="Add meme!" />
                    </form>
                </div>
            </div>
        )
    }
}

export default AddMeme;