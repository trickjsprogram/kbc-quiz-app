import { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBListGroup, MDBBtn } from "mdb-react-ui-kit";
import "./App.css";
import Quiz from "./components/Quiz";
import { data, prizeMoney } from "./data";
import Timer from "./components/Timer";
import Start from "./components/Start";

function App() {
  const [name, setName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeOut, setTimeOut] = useState(false);
  const [earned, setEarned] = useState("₹ 0");

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(
        prizeMoney.find((item) => item.id === questionNumber - 1).amount
      );
  }, [questionNumber]);

  return (
    <div className="App">
      {!name ? (
        <Start setName={setName} setTimeOut={setTimeOut} />
      ) : (
        <MDBRow>
          <MDBCol md="9">
            <div className="main">
              {timeOut ? (
                <h1 className="earned">You Earned Total: {earned}</h1>
              ) : (
                <>
                  <div style={{ height: "50%", position: "relative" }}>
                    <div className="timer">
                      <Timer
                        setTimeOut={setTimeOut}
                        questionNumber={questionNumber}
                      />
                    </div>
                  </div>
                  <div style={{ height: "50%" }}>
                    <Quiz
                      data={data}
                      questionNumber={questionNumber}
                      setQuestionNumber={setQuestionNumber}
                      setTimeOut={setTimeOut}
                    />
                  </div>
                </>
              )}
            </div>
          </MDBCol>
          <MDBCol md="3" className="money">
            <MDBListGroup className="money-list">
              <MDBRow>
                <span className="mb-2">
                  <MDBBtn
                    style={{ float: "right" }}
                    className="mx-2"
                    color="light"
                    onClick={() => setTimeOut(true)}
                  >
                    Quit
                  </MDBBtn>
                  <MDBBtn
                    style={{ float: "right" }}
                    onClick={() => {
                      setName(null);
                      setQuestionNumber(1);
                      setEarned("₹ 0");
                    }}
                  >
                    Exit
                  </MDBBtn>
                </span>
                <MDBCol md="6">Name: {name}</MDBCol>
                <MDBCol md="6">Total Earned: {earned}</MDBCol>
              </MDBRow>
              <hr />
              {prizeMoney.map((item) => (
                <>
                  <li
                    className={
                      questionNumber === item.id ? "item active" : "item"
                    }
                  >
                    <h5 className="amount">{item.amount}</h5>
                  </li>
                </>
              ))}
            </MDBListGroup>
          </MDBCol>
        </MDBRow>
      )}
    </div>
  );
}

export default App;
