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

  :hover {
    background: #74d36d;
  }
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

const today = new Date();

const TodoCreate = ({
  nextId,
  createTodo,
  incrementNextId
}: TodoCreateProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [finishDate, setFinishDate] = useState(today.toLocaleDateString());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const handleToggle = () => setOpen(!open);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ???????????? ??????

    if (value === "" || finishDate === "") {
      setModalMsg("?????? ?????? ???????????????");
      setModalOpen(true);
      return;
    }

    createTodo({
      id: nextId,
      text: value,
      finish: finishDate,
      done: false
    });
    incrementNextId(); // nextId ?????? ??????

    setValue(""); // input ?????????
    setOpen(false); // open ??????
  };

  function onChange(date, dateString) {
    if (dateString === "") {
      setModalMsg("???????????? ????????? ???????????? ?????????.");
      setModalOpen(true);
      return;
    }
    if (!dateValid(dateString)) {
      setModalMsg("???????????? ???????????? ????????? ??? ????????????");
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
            <div>??? ???</div>
            <Input
              autoFocus
              placeholder="What's need to be done?"
              onChange={handleChange}
              value={value}
            />
            <div>?????????</div>
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
