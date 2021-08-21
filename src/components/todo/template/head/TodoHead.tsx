import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";

const TodoHeadBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 52px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
`;

const DateText = styled.div`
  font-size: 26px;
  color: #119955;
  padding-left: 10px;
`;

const TimeText = styled.div`
  font-size: 20px;
  color: #2f9d27;
  padding-left: 10px;
`;

const TodoHead = () => {
  //@TODO 현재 시간을 표시해야합니다.
  const today = moment().format("LL");
  const [time, setTime] = useState(moment().format("LTS"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("LTS"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TodoHeadBlock>
      <DateText>{today}</DateText>
      <TimeText>{time}</TimeText>
    </TodoHeadBlock>
  );
};

export default React.memo(TodoHead);
