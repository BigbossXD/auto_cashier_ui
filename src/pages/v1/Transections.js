import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Input,
  InputNumber,
  Card,
  Typography,
  message,
} from "antd";

import { getTransection } from "../../services/systems.service";
const { Text } = Typography;

export default function Transection() {
  const machineId = Number(localStorage.getItem("machineId"));
  const [transection, setTransection] = useState([]);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const res = await getTransection(machineId);
    if (!res._error) {
      setTransection(res.data);
    }
  };

  return (
    <div>
      <Row>
        <Col span={24} style={{ padding: 10 }}>
          <Row style={{ margin: 4, padding: 4, backgroundColor: "#F7FAFF" }}>
            <Col span={6}>
              <b>CreatedAt</b>
            </Col>
            <Col span={6}>
              <b>Session Id</b>
            </Col>
            <Col span={4}>
              <b>Type</b>
            </Col>
            <Col span={4}>
              <b>Value</b>
            </Col>
            <Col span={4}>
              <b>Amount</b>
            </Col>
          </Row>
          {transection.length === 0 && <div>---ยังไม่มีประวัติรายการ---</div>}
          {transection.map((v) => (
            <Row
              style={{ margin: 4, padding: 4, backgroundColor: "#F7FAFF" }}
              key={v.ID}
            >
              <Col span={6}>{v.CreatedAt}</Col>
              <Col span={6}>{v.session_id}</Col>
              <Col span={4}>{v.Type}</Col>
              <Col span={4}>{v.money_value}</Col>
              <Col span={4}>{v.amount}</Col>
            </Row>
          ))}
        </Col>
      </Row>
    </div>
  );
}
