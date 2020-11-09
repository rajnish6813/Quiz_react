import React, { Component } from "react";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizList: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    axios
      .get("http://34.229.128.69:4001/api/quiz/all", {
        headers: {
          "auth-token": "19c4ff12-e027-4320-b844-2cda768714e8",
          "content-type": "application/json"
        }
      })
      .then(response => {
        this.setState({
          quizList: response.data
        });
      })
      .catch(error => {
        alert("check backend service " + error);
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  startQuiz(id) {
    this.props.history.push({
      pathname: "/quiz",
      state: {
        quizId: id
      }
    });
  }

  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center", marginTop: "2em" }}>
          Welcom to CodeJudge
        </h2>
        {this.state.quizList.map((o, index) => (
          <div className="container-fluid" key={index}>
            <div
              className="row card-quiz"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="col-10">
                <h3 className={"quiz-list-" + o.id}>{o.name}</h3>
              </div>
              <div className="col-2 text-right">
                <button
                  className={"start-quiz-" + o.id}
                  onClick={() => this.startQuiz(o.id)}
                >
                  Start
                </button>
              </div>
              <p>{o.description}</p>
            </div>
            <br />
          </div>
        ))}
      </div>
    );
  }
}

export default Home;
