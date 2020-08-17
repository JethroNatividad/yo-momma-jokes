import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component{
    constructor(props){
        super(props)
        this.handleUpvote = this.handleUpvote.bind(this)
        this.handleDownvote = this.handleDownvote.bind(this)
    }
    //this sets the color according to the votes
    getColor() {
        if (this.props.votes >= 15) {
          return "#4CAF50";
        } else if (this.props.votes >= 12) {
          return "#8BC34A";
        } else if (this.props.votes >= 9) {
          return "#CDDC39";
        } else if (this.props.votes >= 6) {
          return "#FFEB3B";
        } else if (this.props.votes >= 3) {
          return "#FFC107";
        } else if (this.props.votes >= 0) {
          return "#FF9800";
        } else {
          return "#f44336";
        }
      }
    //this sets the emoji according to the votes
    getEmoji() {
    if (this.props.votes >= 15) {
        return "em em-rolling_on_the_floor_laughing";
    } else if (this.props.votes >= 12) {
        return "em em-laughing";
    } else if (this.props.votes >= 9) {
        return "em em-smiley";
    } else if (this.props.votes >= 6) {
        return "em em-slightly_smiling_face";
    } else if (this.props.votes >= 3) {
        return "em em-neutral_face";
    } else if (this.props.votes >= 0) {
        return "em em-confused";
    } else {
        return "em em-angry";
    }
    }
    //this two are the vote method with the props jokeId and what. again, what = upvote is 1, downvote is -1
    handleUpvote(){
        this.props.upvote(this.props.id, 1)
    }
    handleDownvote(){
        this.props.downvote(this.props.id, -1)
    }
    //renders the joke
    render(){
        return(
            <div className='Joke'>
                <div className='Joke-buttons'>
                    <i className='fas fa-arrow-up' onClick={this.handleUpvote} />
                    <span className='Joke-votes' style={{ borderColor: this.getColor() }}>
                        {this.props.votes}
                    </span>
                    <i className='fas fa-arrow-down' onClick={this.handleDownvote} />
                </div>
                <div className='Joke-text'>{this.props.text}</div>
                <div className='Joke-smiley'>
                    <i className={this.getEmoji()} />
                </div>
            </div>
        )
    }
}
export default Joke;