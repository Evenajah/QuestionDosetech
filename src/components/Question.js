import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Messages } from "primereact/messages";
import { RadioButton } from "primereact/radiobutton";
import React, { useRef, useState } from "react";

const Question = () => {
  const [answerState, setAnswerState] = useState([]);
  const msgs1 = useRef(null);

  const myQuestions = [
    {
      question: "1 + 2 is ?",
      answers: ["1", "2", "3"],
      correctAnswer: 2,
    },
    {
      question: "What is the best site for Web Programmer ?",
      answers: ["Stack Overflow", "Quora", "w3school"],
      correctAnswer: 0,
    },
    {
      question: "Who is Prime minister fo Thailand ?",
      answers: [
        "Prayut Chan-o-cha",
        "Yingluck Shinawatra",
        "Abhisit Vejjajiva",
        "Somchai Wongsawat",
      ],
      correctAnswer: 0,
    },
  ];

  const renderQuestion = myQuestions.map((item) => {
    return (
      <div className="p-col  ">
        <h4 style={{ textAlign: "left" }}>{item.question}</h4>
        {item.answers.map((items, index) => {
          return (
            <div key={index} className="p-field-radiobutton">
              <RadioButton
                inputId={items}
                onChange={(e) => {
                  setAnswerState({ ...answerState, [item.question]: index });
                }}
                checked={answerState[item.question] === index}
                name="city"
                value={items}
              />
              &nbsp;
              <label htmlFor={items}>{items}</label>
            </div>
          );
        })}
      </div>
    );
  });

  const checkUserAnswerAllQuestion = () => {
    let catchWrong = "";
    myQuestions.forEach((item, index) => {
      const findArray = Object.keys(answerState).filter((element) => {
        return element === item.question;
      });
      if (findArray.length === 0) {
        catchWrong += `ข้อที่ ${index + 1} `;
      }
    });

    msgs1.current.show([
      {
        severity: "warn",
        detail: `กรุณาตอบ ${catchWrong}`,
      },
    ]);
  };

  const checkAnswer = async () => {
    const clearMessage = await msgs1.current.clear();
    let catchWrong = "";

    if (Object.keys(answerState).length !== 3) {
      checkUserAnswerAllQuestion();
      return;
    }
    myQuestions.forEach((item, index) => {
      if (answerState[item.question] !== item.correctAnswer) {
        catchWrong += `ข้อที่ ${index + 1} `;
      }
    });

    if (catchWrong !== "") {
      msgs1.current.show([
        {
          severity: "error",
          detail: `${catchWrong} ผิด`,
        },
      ]);
    } else {
      msgs1.current.show([
        {
          severity: "success",
          detail: `ยินดีด้วย คุณตอบถูกหมดทุกข้อ`,
        },
      ]);
    }
  };

  return (
    <div id="question-section" className="p-grid p-justify-center">
      <div className="p-col-8">
        <Card title="Question">
          <div className="p-grid">{renderQuestion}</div>
          <Messages ref={msgs1} />
          <Button
            label="Check Answer"
            onClick={checkAnswer}
            icon="pi pi-check-square"
            className="p-button-outlined"
          />
        </Card>
      </div>
    </div>
  );
};

export default Question;
