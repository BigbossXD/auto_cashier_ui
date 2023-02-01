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

import { getAllConfigs, adminDeposit } from "../../services/systems.service";
const { Text } = Typography;

export default function AdminDeposit() {
  const machineId = Number(localStorage.getItem("machineId"));
  
  const [messageApi] = message.useMessage();
  const [receiveData, setReceiveData] = useState([]);
  const [receiveTotal, setReceiveTotal] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(0);

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    culateReceiveTotal();
  }, [receiveData]);

  const onSuccess = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };
  const onError = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };

  const initData = async () => {
    const res = await getAllConfigs(machineId);
    if (!res._error) {
      const updateData = res.data.map((item) => {
        return { ...item, receive_amount: 0 };
      });
      setReceiveData(updateData);
    }
  };

  const minus = (id) => {
    const updateData = receiveData.map((item) => {
      if (item.ID === id) {
        if (item.receive_amount - 1 >= 0)
          return {
            ...item,
            receive_amount: item.receive_amount - 1,
            current_amount: item.current_amount - 1,
          };
      }
      return item;
    });
    setReceiveData(updateData);
  };

  const add = (id) => {
    const updateData = receiveData.map((item) => {
      if (item.ID === id) {
        if (item.current_amount + 1 <= item.maximum_amount)
          return {
            ...item,
            receive_amount: item.receive_amount + 1,
            current_amount: item.current_amount + 1,
          };
      }
      return item;
    });
    setReceiveData(updateData);
  };

  const culateReceiveTotal = () => {
    const sumReceiveTotal = receiveData.reduce(function (
      previousValue,
      currentValue
    ) {
      return (
        previousValue + currentValue.money_value * currentValue.receive_amount
      );
    },
    0);
    setReceiveTotal(sumReceiveTotal);
  };

  const deposit = async () => {
    const items = receiveData.map((v) => {
      return { config_id: v.ID, amount: v.receive_amount };
    });
    const data = {
      machine_id: machineId,
      items: items,
    };
    const res = await adminDeposit(data);
    if (!res._error) {
      setPaymentStatus(1);
      onSuccess();
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    }
  };

  return (
    <div>
      <Row>
        <Col span={16} style={{ padding: 10, backgroundColor: "#F7FAFF" }}>
          <Row>
            {receiveData.map((v) => (
              <Col span={6} key={v.ID}>
                <Card
                  style={{
                    margin: 4,
                    justifyContent: "center",
                    alignContent: "center",
                    display: "flex",
                    textAlign: "center",
                    backgroundColor:
                      v.maximum_amount - v.current_amount <= 0
                        ? "#FF988F"
                        : "white",
                  }}
                >
                  <div>
                    <Text strong>{v.money_value}</Text>
                  </div>
                  <div>
                    <Text>มีอยู่ :{v.current_amount}</Text>
                  </div>
                  <div>
                    <Text>
                      เก็บได้อีก : {v.maximum_amount - v.current_amount}
                    </Text>
                  </div>
                  <div>
                    <Text>ความจุจำกัด : {v.maximum_amount}</Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col
          span={8}
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#F7FAFF",
          }}
        >
          <h1>เติมเงินเข้าเครื่อง</h1>
          {receiveData.map((v) => (
            <div key={v.ID} style={{ marginBottom: 10 }}>
              <Input.Group compact style={{ display: "flex" }}>
                <Button
                  onClick={() => minus(v.ID)}
                  type="primary"
                  style={{ marginRight: 10 }}
                  disabled={v.receive_amount === 0 || paymentStatus !== 0}
                >
                  -
                </Button>
                <InputNumber
                  style={{ flex: 1 }}
                  addonBefore={<div style={{ width: 60 }}>{v.money_value}</div>}
                  defaultValue={0}
                  value={v.receive_amount}
                />
                <Button
                  onClick={() => add(v.ID)}
                  type="primary"
                  style={{ marginLeft: 10 }}
                  disabled={
                    v.maximum_amount - v.current_amount <= 0 ||
                    paymentStatus !== 0
                  }
                >
                  +
                </Button>
              </Input.Group>
            </div>
          ))}
          <div>
            <Text strong>ยอดเงินทั้งหมด {receiveTotal.toFixed(2)}</Text>
          </div>
          <Button
            onClick={() => deposit()}
            type="primary"
            style={{ width: "80%", marginTop: 10 }}
            disabled={paymentStatus !== 0}
          >
            ยืนยันการเติมเงิน
          </Button>
        </Col>
      </Row>
    </div>
  );
}
