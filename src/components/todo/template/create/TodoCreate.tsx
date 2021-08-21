import React, { useState } from "react";
import { DatePicker } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import styled from "styled-components";

import { Itodo } from "components/todo/TodoService";

import { dateValid } from "./utils/Validation";
import Modals from "../../../common/Modal";

const CircleButton = styled.button<{ open: boolean }>`
  background: #33bb77;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  left: 50%;
  transform: translate(50%, 0%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  background: #eeeeee;
  padding-left: 40px;
  padding-top: 36px;
  padding-right: 60px;
  padding-bottom: 36px;

  div {
    width: 100%;
  }
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #dddddd;
  width: 100%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
  color: #119955;
  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
`;

interface TodoCreateProps {
  nextId: number;
  createTodo: (todo: Itodo) => void;
  incrementNextId: () => void;
}

const TodoCreate = ({
  nextId,
  createTodo,
  incrementNextId
}: TodoCreateProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [finishDate, setFinishDate] = useState(new Date().toLocaleDateString());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const handleToggle = () => setOpen(!open);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지

    if (value === "" || finishDate === "") {
      setModalMsg("모든 값을 입력하세요");
      setModalOpen(true);
      return;
    }

    createTodo({
      id: nextId,
      text: value,
      finish: finishDate,
      done: false
    });
    incrementNextId(); // nextId 하나 증가

    setValue(""); // input 초기화
    setOpen(false); // open 닫기
  };

  function onChange(date, dateString) {
    if (dateString === "") {
      setModalMsg("만료일은 반드시 존재해야 합니다.");
      setModalOpen(true);
      return;
    }
    if (!dateValid(dateString)) {
      setModalMsg("만료일은 오늘보다 이전일 수 없습니다");
      setModalOpen(true);
      return;
    }
    setModalOpen(false);
    setFinishDate(dateString);
  }

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={handleSubmit}>
          <div>
            <div>할 일</div>
            <Input
              autoFocus
              placeholder="What's need to be done?"
              onChange={handleChange}
              value={value}
            />
            <div>만료일</div>
            <DatePicker
              onChange={onChange}
              size="large"
              value={moment(finishDate, "YYYY-MM-DD")}
              format="YYYY-MM-DD"
            />
          </div>
          <CircleButton onClick={handleToggle} open={open}>
            <PlusCircleOutlined />
          </CircleButton>
        </InsertForm>
      </InsertFormPositioner>
      <Modals modalOpen={modalOpen} setModalOpen={setModalOpen}>
        {modalMsg}
      </Modals>
    </>
  );
};

export default React.memo(TodoCreate);
