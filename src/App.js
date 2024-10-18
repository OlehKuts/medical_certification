import React, { useState, useEffect } from "react";
import "./styles.css";
import { finalVersionCreator } from "./utilities/finalVersionCreator";
import {
  childTypeList,
  maxilloSortedList,
  otoSortedList,
  doctors,
  maleNames
} from "./formData";
import { Block } from "./Block";
import { maleChecker } from "./utilities/maleChecker";
import { randomizer } from "./utilities/randomizer";
import signPikh from "./images/pikh.jpg";

export const App = () => {
  const childTypeNames = childTypeList.map((item) => item.name);
  const randomNumber = randomizer();
  const [showForm, setShowForm] = useState(true);
  const [showLastLine, setShowLastLine] = useState(false);
  const newDate = new Date();
  const stringifiedDate = `${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()}`;
  const [isOtolaryngology, setIsOtolaryngology] = useState(false);
  const onIsOtolaryngologyChange = (e) => {
    setIsOtolaryngology(!isOtolaryngology);
  };
  const [date, setDate] = useState(stringifiedDate);
  const onDateChange = (e) => {
    setDate(e.target.value);
  };
  const [startDate, setStartDate] = useState(stringifiedDate);
  const onStartDateChange = (e) => {
    setStartDate(e.target.value);
  };
  const [finalDate, setFinalDate] = useState(stringifiedDate);
  const onFinalDateChange = (e) => {
    setFinalDate(e.target.value);
  };
  const [deferment, setDeferment] = useState("");
  const onDefermentChange = (e) => {
    setDeferment(e.target.value);
  };
  const [childType, setChildType] = useState(childTypeList[0].name);
  const [childType1, setChildType1] = useState(childTypeList[0].childType1);
  const [childType2, setChildType2] = useState(childTypeList[0].childType2);
  const [name, setName] = useState("");
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onChildTypeChange = (e) => {
    setChildType(e.target.value);
    if (doctor === "Піх І.І.") setShowSignet(true);
  };
  const [doctor, setDoctor] = useState(doctors[0].name);
  const onDoctorChange = (e) => {
    setDoctor(e.target.value);
  };
  const [showSignet, setShowSignet] = useState(false);
  const urlSign = doctor === "Піх І.І." ? signPikh : "";
  const [birthDate, setBirthDate] = useState(stringifiedDate);
  const onBirthDateChange = (e) => {
    setBirthDate(e.target.value);
  };

  const [diagnosis, setDiagnosis] = useState(maxilloSortedList[0].code);
  const onDiagnosisChange = (e) => {
    setDiagnosis(e.target.value);
  };
  const [diagnosisList, setDiagnosisList] = useState(maxilloSortedList);
  const [completedData, setCompletedData] = useState({});
  const readyToPrint = () => {
    setShowLastLine(false);
  };
  const backToForm = () => {
    setShowLastLine(false);
    setShowForm(true);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      alert(`Не вказано пацієнта!`);
      return;
    }
    if (childType === "Форма навчання") {
      alert(`Вкажіть форму навчання!`);
      return;
    }
    setCompletedData(
      finalVersionCreator(
        date,
        startDate,
        finalDate,
        childType1,
        childType2,
        doctor,
        name,
        birthDate,
        diagnosis,
        deferment
      )
    );
    setShowForm(false);
    setShowLastLine(true);
  };
  const [sexString1, setSexString] = useState("перебувала");
  const [sexString2, setSexString2] = useState("Звільнена");
  const [lessonType, setLessonType] = useState("занять");
  const modstring = sexString2[0].toLowerCase() + sexString2.slice(1);
  useEffect(() => {
    setChildType1(childTypeList[childTypeNames.indexOf(childType)].childType1);
    setChildType2(childTypeList[childTypeNames.indexOf(childType)].childType2);
  }, [childType]);
  useEffect(() => {
    setDiagnosisList(isOtolaryngology ? otoSortedList : maxilloSortedList);
  }, [isOtolaryngology]);
  useEffect(() => {
    setSexString(
      maleChecker(maleNames, completedData.name) ? "перебував" : sexString1
    );
    setSexString2(
      maleChecker(maleNames, completedData.name) ? "Звільнений" : sexString2
    );
    setLessonType(
      completedData.childType2 ===
        "дитині, яка відвідує дошкільний навчальний заклад"
        ? "відвідування дошкільного навчального закладу"
        : lessonType
    );
  }, [completedData]);
  console.log(modstring);
  return (
    <div className="App">
      {showForm && <h3>Заповніть форму для отримання довідки</h3>}
      {showForm && (
        <div className="dateForm">
          <form onSubmit={onSubmit}>
            <div className="formLine">
              <label className="likeLabel">ЛОР-патологія</label>
              <input
                className="checkbox"
                type="checkbox"
                value={isOtolaryngology}
                onChange={onIsOtolaryngologyChange}
                checked={isOtolaryngology}
              />
            </div>
            <div>
              {" "}
              <input
                className="longInput"
                type="text"
                value={name}
                onChange={onNameChange}
                placeholder="Пацієнт..."
              />
            </div>
            <div className="formLine">
              {" "}
              <label>Дата народження</label>
              <input
                type="text"
                value={birthDate}
                onChange={onBirthDateChange}
              />
            </div>
            <div className="formLine">
              {" "}
              <label>Дата видачі</label>
              <input type="text" value={date} onChange={onDateChange} />
            </div>
            <div className="formLine">
              {" "}
              <label>Початок </label>
              <input
                type="text"
                value={startDate}
                onChange={onStartDateChange}
              />
            </div>
            <div className="formLine">
              {" "}
              <label>Завершення</label>
              <input
                type="text"
                value={finalDate}
                onChange={onFinalDateChange}
              />
            </div>
            <div className="formLine">
              {" "}
              <label>Додатково від фіз-ри</label>
              <input
                type="text"
                value={deferment}
                onChange={onDefermentChange}
                placeholder="кількість днів..."
              />
            </div>
            <div className="formLine">
              <select value={doctor} onChange={onDoctorChange}>
                {doctors.map((item, idx) => (
                  <option value={item.value} key={idx}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select value={childType} onChange={onChildTypeChange}>
                {childTypeList.map((item, idx) => (
                  <option value={item.childType} key={idx}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="formLine">
              <label>Патологія</label>
              <select value={diagnosis} onChange={onDiagnosisChange}>
                {diagnosisList.map((item, idx) => (
                  <option value={item.code} key={idx}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div id="sendLine">
              {" "}
              <input className="submit" type="submit" value="Створити" />
            </div>{" "}
          </form>
        </div>
      )}
      {!showForm && (
        <>
          <div className="super">
            <div className="main">
              <div className="header">
                <div className="headerPart headerPart1">
                  <div className="nameAdress">
                    КНП "ТОДКЛ" ТОР, вулиця Академіка Андрія Сахарова, 2а,
                    Тернопіль, Тернопільська область, 46000
                  </div>
                  <div className="code">Код за ЄДРПОУ |0|2|0|0|0|1|3|0|5|</div>
                </div>
                <div className="headerPart">
                  <div className="headerLine">Медична документація</div>
                  <div className="headerLine">
                    Форма первинної облікової документації
                  </div>
                  <div className="headerLine">№095/о</div>
                  <div className="headerLine">ЗАТВЕРДЖЕНО</div>
                  <div className="headerLine">Наказ МОЗ України</div>
                  <div className="headerLine">
                    |1|4|0|2|2|0|1|2| <span className="spanNumber">№110</span>
                  </div>
                </div>
              </div>
              <div className="secondHeader">
                <div className="secondHeaderLine">ДОВІДКА №{randomNumber}</div>
                <div className="secondHeaderLine">
                  про тимчасову непрацездатність {completedData.childType1}
                </div>
              </div>
              <div className="mainBlock">
                <Block header={`Дата видачі: ${completedData.date}.`} />
                <Block header={`1. Видана: ${completedData.childType2}.`} />
                <Block header={`2. ПІБ пацієнта: ${completedData.name}.`} />
                <Block
                  header={`3. Дата народження: ${completedData.birthDate} року.`}
                />
                <Block
                  header={`4. Діагноз захворювання: ${completedData.diagnosis}.`}
                />
                <Block
                  header={`5. В контакті з інфекційними хворими не ${sexString1}.`}
                />
                <Block
                  header={`6. ${sexString2} від ${lessonType} з ${startDate} року по ${finalDate} року.`}
                />
                {completedData.deferment !== "" && (
                  <Block
                    header={`7. Додатково ${modstring} від занять з фізкультури на ${completedData.deferment} днів.`}
                  />
                )}
              </div>
              <div className="empty"></div>
              {/* <div className="footer">
                <div className="footerLeft">М.П.</div>
                <div className="footerRight">
                  Підпис лікаря __________ {doctor}
                </div>
              </div> */}
              <div className="footer">
                {!showSignet && <div className="footerLeft">М.П.</div>}
                {showSignet && (
                  <div className="footerLeft" id="signet">
                    <img src={urlSign} alt="" />
                  </div>
                )}
                <div className="footerRight">
                  Підпис лікаря __________ {doctor}
                </div>
              </div>
            </div>
            <div className="main">
              <div className="header">
                <div className="headerPart headerPart1">
                  <div className="nameAdress">
                    КНП "ТОДКЛ" ТОР, вулиця Академіка Андрія Сахарова, 2а,
                    Тернопіль, Тернопільська область, 46000
                  </div>
                  <div className="code">Код за ЄДРПОУ |0|2|0|0|0|1|3|0|5|</div>
                </div>
                <div className="headerPart">
                  <div className="headerLine">Медична документація</div>
                  <div className="headerLine">
                    Форма первинної облікової документації
                  </div>
                  <div className="headerLine">№095/о</div>
                  <div className="headerLine">ЗАТВЕРДЖЕНО</div>
                  <div className="headerLine">Наказ МОЗ України</div>
                  <div className="headerLine">
                    |1|4|0|2|2|0|1|2| <span className="spanNumber">№110</span>
                  </div>
                </div>
              </div>
              <div className="secondHeader">
                <div className="secondHeaderLine">
                  КОНТРОЛЬНИЙ ТАЛОН №{randomNumber}
                </div>
                <div className="secondHeaderLine">
                  про тимчасову непрацездатність {completedData.childType1}
                </div>
              </div>
              <div className="mainBlock">
                <Block header={`Дата видачі: ${completedData.date}.`} />
                <Block header={`1. Видана: ${completedData.childType2}.`} />
                <Block header={`2. ПІБ пацієнта: ${completedData.name}.`} />
                <Block
                  header={`3. Дата народження: ${completedData.birthDate} року.`}
                />
                <Block
                  header={`4. Діагноз захворювання: ${completedData.diagnosis}.`}
                />
                <Block
                  header={`5. В контакті з інфекційними хворими не ${sexString1}.`}
                />
                <Block
                  header={`6. ${sexString2} від ${lessonType} з ${startDate} року по ${finalDate} року.`}
                />
                {completedData.deferment !== "" && (
                  <Block
                    header={`7. Додатково ${modstring} від занять з фізкультури на ${completedData.deferment} днів.`}
                  />
                )}
              </div>
              <div className="empty"></div>
              <div className="footer">
                {!showSignet && <div className="footerLeft">М.П.</div>}
                {showSignet && (
                  <div className="footerLeft" id="signet">
                    <img src={urlSign} alt="" />
                  </div>
                )}
                <div className="footerRight">
                  Підпис лікаря __________ {doctor}
                </div>
              </div>
              <div className="empty"></div>
            </div>
          </div>
        </>
      )}
      {showLastLine && (
        <div className="controls">
          <button onClick={readyToPrint}>Готово до друку</button>
          <button onClick={backToForm}>Виправити форму</button>
        </div>
      )}
    </div>
  );
};
