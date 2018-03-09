import React, { Component } from 'react';


export class AnswerAccept extends Component {
    render() {
    return (
      <div className="AnswerAccept">
        <img src={imgSrc} className="AnswerAccept-best answer-best" alt="" title="This question onwer accepted this as the best answer" />
        <span className="AnswerAccept-h1">The best answer</span>
        <div>
            <button className="AnswerAccept-reject" title="It will reject this answer as the best answer">Reject answer</button>
            <button className="AnswerAccept-accept" title="Each question you only can accept one answer">Accept answer</button>
            </div>
      </div>
    );
  }
}

