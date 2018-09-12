import React from 'react';
import ImgCard from './ImgCard'
import Filter from './Filter'
import generateAdapter from '../Adapter'

const memesAPI = 'http://localhost:4000/api/v1/memes'
// const usersAPI = 'http://localhost:4000/api/v1/users'
const favesAPI = 'http://localhost:4000/api/v1/favorites'

class Home extends React.Component {
    state = {
        currentUser: '',
        allMemes:[],
        allMemesCopy: [],
        allFaves: [],
        faves: [],
        query: '',
    }

    allMemes = () => {
        generateAdapter(memesAPI).index(data => this.setState({
            allMemes: data,
            allMemesCopy: data
        }, () => this.getUser()))
    }

    getUser = () => {
        let user = this.props.user
        this.setState({
            currentUser: user
        })
    }

    getAllFaves = () => {
        generateAdapter(favesAPI).index(data => this.setState({
            allFaves: data
        }))
    }

    componentDidMount(){
        this.allMemes();
        this.getAllFaves();
    }

    handleFaveClick = (event) => {
        let meme = this.state.allMemes.find(meme => meme.id === parseInt(event.target.dataset.memeId))

        let faveExists = this.state.allFaves.find(fave => fave.meme.id === parseInt(meme.id) && fave.user.id === this.state.currentUser.id)

        if (faveExists){
            alert("💁🏻‍ Already in your faves 💁🏻‍")
        } else {
            generateAdapter(favesAPI).create({user_id: this.state.currentUser.id, meme_id: meme.id}, () => this.componentDidMount())
            alert("🧚 Successfully added! 🧚 ‍")
        }
    }

    nowFilter = () => {
        let memes = this.state.allMemes.filter(meme => meme.tags.includes(this.state.query))
        this.setState({
            allMemesCopy: memes
        })
    }

    handleFilterChange = (event) => {
        this.setState({
            query: event.target.value
        }, () => this.nowFilter() )
    }


    //HELPER FUNCTIONS
    tagsMapper = (tagsArr) => {
        return (tagsArr.split(",")).map(tag => `#${tag}`).join(", ")
    }

    memesMapper = () => {
        // if (this.props.user.memes.length !== 0) {
            return this.state.allMemesCopy.map(meme => <div className="col l4">

                <div className="meme-card">
                    <ImgCard key={meme.id} img={meme} url={meme.img_url} topText={meme.top_text} bottomText={meme.bottom_text} />
                    <p>By: {meme.user.username}</p>
                    <p>Hash Tags: {this.tagsMapper(meme.tags)}</p>

                    <button className="waves-effect waves-light btn-small" data-meme-id={meme.id} onClick={this.handleFaveClick}>❤️ Like</button>
                </div>   

            </div>)
        // } else {
        //     return ''
        // }
    }

    render(){
        return (
            <div>
                
                <div>
                    <h2>Welcome, {this.props.user.username}!</h2>
                    <hr className="welcome-hr" />

                    <h3>Filter by Tag:</h3>
                    <Filter query={this.state.query} handleChange={this.handleFilterChange} />
                </div>
                
                <h3>All Them Memes:</h3>

                <div className="memes-container row">

                    {this.memesMapper()}

                </div>

            </div>
        )
    }
}

export default Home;