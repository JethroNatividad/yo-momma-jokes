import React, {Component} from 'react'; 
import Joke from './Joke'
import _jokes from './jokes'
import uniqid from 'uniqid'
import momma from './momma.png'
import './JokeList.css'

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props) {
        super(props);
        this.state = {
            //check localStorage and of none , set it to an empty array
            jokes: JSON.parse(window.localStorage.getItem('jokes')) || [],
            loading: true
        }
        //a Set of ids to track if a joke exist or not
        console.log(this.jokes)
        this.existingJoke = new Set(this.state.jokes.map(j => (j.joke)))
        this.vote = this
            .vote
            .bind(this);
        this.getJokes = this.getJokes.bind(this);
    }

    async componentDidMount() {
        //check if there are items in the local storage
        if(window.localStorage.length === 0){
            //if there are no items, generate jokes.
            await this.getJokes()
            //sets the loading to false
            this.setState(st => ({...st, loading: false}))
        } else {
            //same as on the previous comment
            this.setState(st => ({...st, loading: false}))
        }
    }
    //this generates jokes
    async getJokes(){
        try {
            //set loading to true
            this.setState(st => ({...st, loading: true}))
            //declares joke variable to an empty array to fill with jokes and track in while loop
            let jokes = []
            //generates joke
            while(jokes.length < this.props.numJokesToGet){
                let newjoke = _jokes[Math.floor(Math.random() * _jokes.length)]
                //checks the Set if joke does not exist
                if(!this.existingJoke.has(newjoke)){
                    //if it does not, add the current joke in the existing joke Set
                    this.existingJoke.add(newjoke)
                    //pushes the joke in the jokes array
                    jokes.push({joke: newjoke, id: uniqid(), votes: 0})
                }
            }
            //sets the state and loading to false
            await this.setState(st => ({
                jokes: [...st.jokes, ...jokes],
                loading: false
            }))
            //saves the jokes to localStorage
            window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
        } catch (error) {
            alert(error)
        }
    }
    //this assigns votes, params jokeId = id of the joke, params what = 1 to upvote, -1 to downvote
    async vote(jokeId, what) {
        let newSt = await this.state.jokes.map(j => {
                //check if current Joke.id === given Jokeid
                if (j.id === jokeId) {
                    return {
                        ...j,
                        votes: j.votes + what
                    }
                }
                return {
                    ...j
                }
            })
            //setState
        await this.setState(st => ({jokes: newSt}));
        //save to localstorage again
        window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    }
    render() {
        //render this if loading
        if (this.state.loading) {
            return (
              <div className='JokeList-spinner'>
                <i className='far fa-8x fa-laugh fa-spin' />
                <h1 className='JokeList-title'>Loading...</h1>
              </div>
            );
          }
          //sorts the jokes array
          let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes)
          //render this if finished loading
        return (
            <div className='JokeList'>
                <div className='JokeList-sidebar'>
                    <h1 className='JokeList-title'>
                        <span>Yo</span>
                        Momma!</h1>
                    <img
                        alt='smiley'
                        src={momma}/>
                    <button className='JokeList-getmore' onClick={this.getJokes}>
                        More!
                    </button>
                    <div className='JokeList-Sicons'>
                    <a href='https://github.com/JethroSama' className='fab fa-github'></a>
                    <a href='https://www.facebook.com/Jethro.Natividad.06' className='fab fa-facebook'></a>
                    </div>
                </div>
                <div className='JokeList-jokes'>
                    {jokes
                        .map(j => <Joke
                            text={j.joke}
                            key={j.id}
                            id={j.id}
                            votes={j.votes}
                            downvote={this.vote}
                            upvote={this.vote} />)}
                </div>
            </div>
        )
    }
}
//exports the jokelist, its obvious lol btw im using my phone as keyboard 
export default JokeList;