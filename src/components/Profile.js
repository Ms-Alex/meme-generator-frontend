import React from 'react';
// import { Redirect } from 'react-router-dom';
import ImgCard from './ImgCard';
import generateAdapter from '../Adapter'
// import EditMeme from './EditMeme'
import M from 'materialize-css'

const usersAPI = 'http://localhost:4000/api/v1/users'
const memesAPI = 'http://localhost:4000/api/v1/memes'
const favesAPI = 'http://localhost:4000/api/v1/favorites'


class Profile extends React.Component {
    state = {
        allFaves: [],
        myFaves: [],
        allMemes: [],
        myMemes: [],
        user: '',
        viewFaves: false,
    }

    getUser = () => {
        generateAdapter(usersAPI).show(this.props.user.id, data => this.setState({
            user: data
        }, () => this.getMemes()) )   
    }

    getMemes = () => {
        generateAdapter(memesAPI).index(data => this.setState({
            allMemes: data
        }, () => this.getMyMemes()))
    }

    getMyMemes = () => {
        let mine = this.state.allMemes.filter(meme => meme.user.id === this.state.user.id)
        this.setState({
            myMemes: mine
        }, () => this.getFaves())
    } 

    getFaves = () => {
        generateAdapter(favesAPI).index(data => this.setState({
            allFaves: data
        }, () => this.getMyFaves()))
    }

    getMyFaves = () => {
        let faves = this.state.allFaves.filter(fave => fave.user.id === this.state.user.id)
        this.setState({
            myFaves: faves
        })
    }

    componentDidMount() {
        this.getUser();
    }

    // EDIT MEME
    // editMeme = (id, body) => {
    //     generateAdapter(memesAPI).update(id, body)
    // }

    handleEditClick = (event) => {
        // let memeObj = this.state.myMemes.find(meme => meme.id === event.target.dataset.memeId) 
        // this.props.history.push("/edit-meme")
        // return <Redirect to="/edit-meme" />
        alert("Update feature yet to be implemented")
    }

    // DELETE MEME
    deleteMeme = (id) => {
        generateAdapter(memesAPI).toDelete(id)
    }

    // EVENT LISTENERS
    handleDeleteClick = (event) => {
        // console.log(event.target.dataset.memeId)
        this.removeDeletedMeme(parseInt(event.target.dataset.memeId))
    }

    removeDeletedMeme = (id) => {
        let withoutMeme = this.state.myMemes.filter(meme => meme.id !== parseInt(id))
        M.toast({ html: "Successfully deleted!" });
        this.setState({
            myMemes: withoutMeme
        }, () => this.deleteMeme(id))
    }

    handleRenderClick = (event) => {
        event.target.dataset.type === "faves" ? this.setState({ viewFaves:true }, () => this.showView()) : this.setState({ viewFaves: false }, () => this.showView())
    }

    handleRemove = (event) => {
        generateAdapter(favesAPI).toDelete(event.target.dataset.faveId)
        // alert("💁🏻‍ Successfully removed! 💁🏻‍")
        M.toast({ html: "Successfully removed!" });
        this.componentDidMount()
    }

    // HELPER FUNCTS
    memesMapper = () => {
        return this.state.myMemes.map(meme => <div className="meme-card col l4">
            <div>
                <ImgCard key={meme.id} img={meme} url={meme.img_url} topText={meme.top_text} bottomText={meme.bottom_text} />
            </div>

            <div className="edit-delete">
                {/* <button className="waves-effect waves-light btn-small profile-butt" data-meme-id={meme.id} onClick={this.handleEditClick}>Edit</button>
                &emsp; */}
                <button className="waves-effect waves-light btn-small profile-butt" data-meme-id={meme.id} onClick={this.handleDeleteClick}>Delete</button>

            </div>

            </div>)
    }

    favesMapper = () => {
        return this.state.myFaves.map(fave => <div className="meme-card col l4">
    
            <ImgCard key={fave.meme.id} img={fave.meme} url={fave.meme.img_url} topText={fave.meme.top_text} bottomText={fave.meme.bottom_text} />

            <button className="waves-effect waves-light btn-small profile-butt" data-fave-id={fave.id} onClick={this.handleRemove}>Remove</button>

        </div>)
    }

    yourMemes = () => {
        return (
            <React.Fragment>
                <h3>Your Memes</h3>
                <div className="my-memes row">
                    {this.memesMapper()}
                </div>
            </React.Fragment>
        )
    }

    yourFaves = () => {
        return <React.Fragment>
            <h3>Your Faves</h3>
            <div className="faves-memes row">
                {this.favesMapper()}
            </div>
        </React.Fragment>
    }

    showView = () => {
        if (this.state.viewFaves === false) {
            return this.yourMemes()
        }
        return this.yourFaves()
    }

    render() {
        return (
            <div>

                <h2>{this.state.user.username}'s Profile</h2>

                <div className="profile-render-butts">
                    <button className="waves-effect waves-light btn-small" data-type="all" onClick={this.handleRenderClick}>
                        View Yours
                    </button>  &emsp;&emsp;
                    <button className="waves-effect waves-light btn-small" data-type="faves" onClick={this.handleRenderClick}>
                        View Faves
                    </button>
                </div>

                <hr />

                {this.showView()}
                
            </div>
        )
    }
}

export default Profile;