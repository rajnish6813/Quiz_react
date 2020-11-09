import React, { Component } from "react";
import axios from "axios";
import history from "../store/history";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: {},
      data: {},
      submittedResult: {},
      step: 0,
      score: 0,
      count: 15,
      result: [],
      answeredQuestion: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.location.state === undefined) {
      history.push("/home");
    } else {
      this.fetchQuestions();
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchQuestions() {
    axios
      .get(
        "http://34.229.128.69:4001/api/quiz-questions/all/" +
          this.props.location.state.quizId,
        {
          headers: {
            "auth-token": "19c4ff12-e027-4320-b844-2cda768714e8",
            "content-type": "application/json"
          }
        }
      )
      .then(response => {
        this.setState({
          quizName: response.data.name,
          quiz_id: this.props.location.state.quizId,
          data: response.data,
          submittedResult: {
            quiz_id: this.props.location.state.quizId,
            mappings: []
          }
        });
        this.nextQuestion();
      })
      .catch(error => {
        alert("check backend service " + error);
      });
  }

  nextQuestion() {
    let data = this.state.data;
    let step = this.state.step;
    if (step < data.questions.length) {
      let str = data.questions[step].options;
      let options = str.split(",");
      data.questions[step].options = options;
      let pushOption = {
        id: data.questions[step].id,
        question: data.questions[step].name
      };
      this.state.answeredQuestion.push(pushOption);
      this.setState({
        questions: data.questions[step],
        step: step + 1
      });
      clearInterval(this.inter);
      this.setState({
        count: 15
      });
      this.inter = setInterval(() => {
        if (this.state.count <= 0) {
          clearInterval(this.inter);
          this.nextQuestion();
        } else {
          this.setState(prevState => ({ count: prevState.count - 1 }));
        }
      }, 1000);
    } else {
      axios
        .post(
          `http://34.229.128.69:4001/api/user/quiz-score`,
          this.state.submittedResult,
          {
            headers: {
              "auth-token": "19c4ff12-e027-4320-b844-2cda768714e8",
              "content-type": "application/json"
            }
          }
        )
        .then(response => {
          for (let i in response.data.questions) {
            for (let j in this.state.answeredQuestion) {
              if (
                response.data.questions[i].ques_id ===
                this.state.answeredQuestion[j].id
              ) {
                response.data.questions[
                  i
                ].answeredQuestion = this.state.answeredQuestion[j].question;
              }
            }
          }
          console.log(response.data.questions);
          this.setState({
            score: response.data.score,
            result: response.data.questions
          });
        })
        .catch(error => {
          alert("check backend service " + error);
        });
    }
  }

  submitOption(index, submitted_option, ques_id) {
    let constructValue = {
      ques_id: ques_id,
      submitted_option: submitted_option
    };
    this.state.submittedResult.mappings.push(constructValue);
    this.nextQuestion();
    document.getElementById("selectedAnswer-" + index).checked = false;
  }

  render() {
    return (
      <div>
        <div className="quiz-name">
          <h3 className="text-center">{this.state.quizName}</h3>
        </div>
        <progress
          style={{ backgroundColor: "#04F200", width: "100%" }}
          value={this.state.count}
          max="15"
          id="progressBar"
        ></progress>
        <p style={{ backgroundColor: "#ffffff" }}>
          Time Remaining {this.state.count} / 15 seconds
        </p>
        <br />
        {this.state.result.length > 0 ? (
          <div>
            <h1 className="score text-center">
              Your score is : {this.state.score}
            </h1>
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 quiz-value">
                  <p>Answer</p>
                </div>
              </div>
              {this.state.result.map((o, index) => (
                <div className="row question" key={index}>
                  <div className="col-12">
                    <div className={"question-" + index}>
                      {o.answeredQuestion}
                    </div>
                    <div className={"submitted-answer-" + index}>
                      Your Answer: {o.submitted_option}
                    </div>
                    <div className={"correct-answer-" + index}>
                      Correct Answer : {o.correct_option}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 question">
                <h4>{this.state.questions.name}</h4>
              </div>
            </div>
            {this.state.questions.options !== undefined ? (
              <div>
                {this.state.questions.options.map((o, index) => (
                  <div className="row" key={index}>
                    <div className="col-1 quiz-option text-center">
                      <input
                        type="radio"
                        id={"selectedAnswer-" + index}
                        value={{ o }}
                        style={{ marginTop: "10px" }}
                        onChange={e =>
                          this.submitOption(index, o, this.state.questions.id)
                        }
                      />
                    </div>
                    <div className="col-11 quiz-value">
                      <p
                        className={"answer-value-" + index}
                        style={{ marginTop: "10px" }}
                      >
                        {o}
                      </p>
                    </div>
                    <p>{o.description}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
