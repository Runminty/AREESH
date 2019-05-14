import React, { Component, Fragment as F } from "react";
import { connect } from "react-redux";
import SplitText from "react-pose-text";

import {
  transcribeSpeech,
  checkSpelling,
  speltCorrectly
} from "../../apis/speech";
import { changeView, setWordCorrect, saveWord } from "../../actions/game";
import Firework from "./Firework";
import Looser from "./Looser";

export class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for speech-recognition version
      result: {
        word: "testaaaaaa",
        isCorrect: false
      },
      message: "The results are in...",
      letterSpeed: 400,
      resultsComplete: false
    };

    this.charPoses = {
      exit: { opacity: 0, y: -200 },
      enter: {
        opacity: 0.8,
        y: 0,
        delay: ({ charIndex }) => charIndex * this.state.letterSpeed
      }
    };

    this.handleClick = this.handleClick.bind(this);
    this.updateResult = this.updateResult.bind(this);
  }

  // for speech-recognition version
  handleClick() {
    transcribeSpeech("flacSonic.flac")
      .then(transcription => checkSpelling("sonic", transcription))
      .then(result => {
        this.setState({
          result: ""
        });
        result.forEach((letter, i) => {
          setTimeout(() => this.updateResult(letter), 750 * i);
        });
      });
  }

  updateResult(letter) {
    this.setState({
      result: this.state.result + letter
    });
  }

  componentDidMount(e) {
    let { word, spellingAttempt } = this.props;

    //let result = checkSpelling(word, spellingAttempt);

    let result = speltCorrectly(word, spellingAttempt);
    this.setState({
      result
    });
    this.props.dispatchWordCorrect(result.isCorrect);

    setTimeout(() => {
      this.setState({
        resultsComplete: true,
        message: this.state.result.isCorrect
          ? "Well Done!"
          : "Oops! Incorrect spelling"
      });
      this.props.dispatchSaveWord({
        ...this.props.currentWord,
        wordCorrect: result.isCorrect
      });
    }, this.state.letterSpeed * result.word.length);

    // result.forEach((letter, i) => {
    //   setTimeout(() => this.updateResult(letter), 750 * i);
    // });
  }

  changeView = e => {
    e.preventDefault();
    if (this.state.result.isCorrect) {
      this.props.displayWhichWord();
    } else {
      this.props.displayLiveSpelling()
    }
    
  };

  render() {
    const wordAnimation = (
      <div
        className={`resultsContainer ${!this.state.result.isCorrect &&
          "resultWrong"}`}
      >
        <SplitText initialPose="exit" pose="enter" charPoses={this.charPoses}>
          {this.state.result.word}
        </SplitText>
        <div />
      </div>
    );

    let retryButton = (
      <F>
        <button
          onClick={this.changeView}
          className="btn btn-outline-black waves-effect"
        >
          {this.state.result.isCorrect? "Spell another word": "Try again?"}
        </button>
      </F>
    )

    return (
      <F>
        {/* <button onClick={() => this.handleClick()}>Transcribe File</button> */}
        {/* <p>Answer: {this.state.result}</p> */}
        {(this.state.resultsComplete && this.state.result.isCorrect) && <Firework />}
          <h1>{this.state.message}</h1>
          {this.state.result && wordAnimation}
          <div className="d-flex justify-content-center">
            {this.state.resultsComplete && retryButton}
          </div>

          {/* <img className="card-image" src="/images/bk.png" alt="Card image cap"></img>  */}
      </F>
    );
  }
}

const mapStateToProps = state => ({
  word: state.game.wordData.word,
  spellingAttempt: state.game.wordData.spellingAttempt,
  currentWord: state.game.wordData
});

const mapDispatchToProps = dispatch => {
  return {
    displayWhichWord: e => dispatch(changeView("displayWhichWord")),
    displayLiveSpelling: e => dispatch(changeView("displayLiveSpelling")),
    dispatchWordCorrect: wordcorrect => dispatch(setWordCorrect(wordcorrect)),
    dispatchSaveWord: currentWord => dispatch(saveWord(currentWord))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);
