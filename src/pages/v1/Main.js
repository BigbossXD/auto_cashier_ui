import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Input,
  InputNumber,
  Card,
  Typography,
  Modal,
} from "antd";

import { getAllConfigs, paymentReceive } from "../../services/systems.service";
import AdminDeposit from "./AdminDeposit";
import AdminWithdraw from "./AdminWithdraw";
import Transection from "./Transections";
import Config from "./Config";
const { Text } = Typography;

export default function Main() {
  const machineId = Number(localStorage.getItem("machineId"));
  const [receiveData, setReceiveData] = useState([]);
  const [receiveTotal, setReceiveTotal] = useState(0);
  const [priceTotal, setPriceTotal] = useState(1200.5);
  const [changeTotal, setChangeTotal] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(0);
  const [changeResItems, setChangeResItems] = useState([]);
  const [isBalanceOpen, setIsBalanceOpen] = useState(false);
  const [balance, setBalance] = useState([]);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTransectionsOpen, setIsTransectionsOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    culateReceiveTotal();
  }, [receiveData]);

  const initData = async () => {
    const randomPrice = Math.floor(Math.random() * (3000 - 1) + 1);
    const randomDecimal = Math.floor(Math.random() * (3 - 0) + 0);
    let price = 0;
    if (randomDecimal < 1) {
      price = randomPrice + 0.25;
    } else if (randomDecimal >= 1 && randomDecimal < 2) {
      price = randomPrice + 0.5;
    } else if (randomDecimal >= 2) {
      price = randomPrice + 0.75;
    }
    setPriceTotal(price);
    const res = await getAllConfigs(machineId);
    if (!res._error) {
      const updateData = res.data.map((item) => {
        return { ...item, receive_amount: 0 };
      });
      setReceiveData(updateData);
    }
  };

  const getBalance = async () => {
    const res = await getAllConfigs(machineId);
    if (!res._error) {
      setBalance(res.data);
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
    setChangeTotal(sumReceiveTotal - priceTotal);
  };

  const payment = async () => {
    const items = receiveData.map((v) => {
      return { config_id: v.ID, amount: v.receive_amount };
    });
    const data = {
      machine_id: machineId,
      price: priceTotal,
      items: items,
    };
    const res = await paymentReceive(data);
    if (!res._error) {
      setPaymentStatus(1);
      setChangeResItems(res.data);
    }
  };

  return (
    <div>
      <Row>
        <Col span={4}>
          <Card
            onClick={() => {
              window.location.href = "/";
            }}
            style={{
              margin: 10,
              justifyContent: "center",
              alignContent: "center",
              display: "flex",
              textAlign: "center",
              backgroundColor: "#AAD6FF",
            }}
          >
            <div>
              <Text strong>Machine ID {machineId} กดเปลี่ยนเครื่อง</Text>
            </div>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            onClick={() => {
              getBalance();
              setIsBalanceOpen(true);
            }}
            style={{
              margin: 10,
              justifyContent: "center",
              alignContent: "center",
              display: "flex",
              textAlign: "center",
              backgroundColor: "#AAD6FF",
            }}
          >
            <div>
              <Text strong>Admin Check Balance</Text>
            </div>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            onClick={() => setIsDepositOpen(true)}
            style={{
              margin: 10,
              justifyContent: "center",
              alignContent: "center",
              display: "flex",
              textAlign: "center",
              backgroundColor: "#AAD6FF",
            }}
          >
            <div>
              <Text strong>Admin Deposit</Text>
            </div>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            onClick={() => setIsWithdrawOpen(true)}
            style={{
              margin: 10,
              justifyContent: "center",
              alignContent: "center",
              display: "flex",
              textAlign: "center",
              backgroundColor: "#AAD6FF",
            }}
          >
            <div>
              <Text strong>Admin Withdraw</Text>
            </div>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            onClick={() => setIsTransectionsOpen(true)}
            style={{
              margin: 10,
              justifyContent: "center",
              alignContent: "center",
              display: "flex",
              textAlign: "center",
              backgroundColor: "#AAD6FF",
            }}
          >
            <div>
              <Text strong>Admin Get Transections</Text>
            </div>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            onClick={() => setIsConfigOpen(true)}
            style={{
              margin: 10,
              justifyContent: "center",
              alignContent: "center",
              display: "flex",
              textAlign: "center",
              backgroundColor: "#AAD6FF",
            }}
          >
            <div>
              <Text strong>Admin Cashier Config</Text>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12} style={{ padding: 10, backgroundColor: "#F7FAFF" }}>
          <h1>ยอดเงินทั้งหมด : {priceTotal.toFixed(2)} บาท</h1>
          <h1>เงินที่จ่ายเข้ามา : {receiveTotal.toFixed(2)} บาท</h1>
          <h1>
            เงินทอนที่จะได้รับ :{" "}
            {changeTotal < 0
              ? "ยังชำระไม่ครบ"
              : changeTotal.toFixed(2) + " บาท"}
          </h1>
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
          span={6}
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#F7FAFF",
          }}
        >
          <h1>เงินที่จ่ายเข้ามา</h1>
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
                    changeTotal > 0 ||
                    v.maximum_amount - v.current_amount <= 0 ||
                    paymentStatus !== 0
                  }
                >
                  +
                </Button>
              </Input.Group>
            </div>
          ))}
          <Button
            onClick={() => payment()}
            type="primary"
            style={{ width: "80%" }}
            disabled={paymentStatus !== 0 || changeTotal <= 0}
          >
            ยืนยันการชำระเงิน
          </Button>
        </Col>
        <Col
          span={6}
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#F7FAFF",
          }}
        >
          <h1>เงินที่ต้องทอน</h1>
          {paymentStatus === 0 && <div>- - - รอยืนยันการชำระเงิน - - -</div>}
          {paymentStatus === 1 && (
            <div>
              {changeResItems.map((v) => (
                <div
                  style={{
                    margin: 4,
                    backgroundColor: v.amount >= 1 ? "#AEFFAA" : "",
                  }}
                >
                  <Input.Group
                    compact
                    style={{
                      display: "flex",
                    }}
                  >
                    <InputNumber
                      style={{ flex: 1 }}
                      addonBefore={
                        <div style={{ width: 100 }}>{v.money_value} จำนวน</div>
                      }
                      defaultValue={0}
                      value={v.amount}
                      disabled={true}
                    />
                  </Input.Group>
                </div>
              ))}
              <Button
                onClick={() => window.location.reload(false)}
                type="primary"
                style={{ width: "100%", marginTop: 10 }}
              >
                กดเริ่มต้นใหม่
              </Button>
            </div>
          )}
        </Col>
      </Row>
      <Modal
        title="Check Balance"
        open={isBalanceOpen}
        onCancel={() => setIsBalanceOpen(false)}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => setIsBalanceOpen(false)}
          >
            ปิด
          </Button>,
        ]}
      >
        <div>
          {balance.map((v) => (
            <div
              style={{
                margin: 4,
                backgroundColor: v.amount >= 1 ? "#AEFFAA" : "",
              }}
            >
              <Input.Group
                compact
                style={{
                  display: "flex",
                }}
              >
                <InputNumber
                  style={{ flex: 1 }}
                  addonBefore={
                    <div style={{ width: 100 }}>{v.money_value} จำนวน</div>
                  }
                  addonAfter={
                    <div style={{ width: 100 }}>
                      {v.current_amount === v.maximum_amount
                        ? "เต็ม"
                        : `ว่าง [${v.maximum_amount - v.current_amount}] (${
                            v.current_amount
                          }/${v.maximum_amount})`}
                    </div>
                  }
                  defaultValue={0}
                  value={v.current_amount}
                  disabled={true}
                />
              </Input.Group>
            </div>
          ))}
          <div>
            <Text strong>
              ยอดเงินทั้งหมด{" "}
              {balance
                .reduce(function (previousValue, currentValue) {
                  return (
                    previousValue +
                    currentValue.current_amount * currentValue.money_value
                  );
                }, 0)
                .toFixed(2)}
            </Text>
          </div>
        </div>
      </Modal>

      <Modal
        title="Admin Deposit"
        open={isDepositOpen}
        onCancel={() => setIsDepositOpen(false)}
        width="80%"
        footer={[]}
      >
        <div>
          <AdminDeposit />
        </div>
      </Modal>

      <Modal
        title="Admin Withdraw"
        open={isWithdrawOpen}
        onCancel={() => setIsWithdrawOpen(false)}
        width="80%"
        footer={[]}
      >
        <div>
          <AdminWithdraw />
        </div>
      </Modal>

      <Modal
        title="Transections"
        open={isTransectionsOpen}
        onCancel={() => setIsTransectionsOpen(false)}
        width="80%"
        footer={[]}
        bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
      >
        <div>
          <Transection />
        </div>
      </Modal>

      <Modal
        title="Config"
        open={isConfigOpen}
        onCancel={() => {
          setIsConfigOpen(false);
          window.location.reload(false);
        }}
        footer={[]}
        bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
      >
        <div>
          <Config />
        </div>
      </Modal>
    </div>
  );
}
