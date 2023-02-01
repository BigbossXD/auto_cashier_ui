import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Alert, Button, Input } from "antd";
import {
  getMachine,
  getMachineFull,
  getMachineEmpty,
  createMachine,
  updateMachine,
  deleteMachine,
} from "../services/machine.service";
const { Text } = Typography;
export default function Home() {
  const [machine, setMachine] = useState([]);
  const [machineFull, setMachineFull] = useState([]);
  const [machineEmpty, setMachineEmpty] = useState([]);
  const [nameNewMachine, setNameNewMachine] = useState("");

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const res = await getMachine();
    if (!res._error) {
      setMachine(res.data);
    }
    const resf = await getMachineFull();
    if (!resf._error) {
      setMachineFull(resf.data);
    }
    const rese = await getMachineEmpty();
    if (!rese._error) {
      setMachineEmpty(rese.data);
    }
  };

  const checkFull = (machineId) => {
    const check = machineFull.filter((v) => v.machine_id === machineId);
    if (check.length > 0) {
      return true;
    }
    return false;
  };

  const checkEmpty = (machineId) => {
    const check = machineEmpty.filter((v) => v.machine_id === machineId);
    if (check.length > 0) {
      return true;
    }
    return false;
  };

  const selectMachine = async (machineId) => {
    localStorage.setItem("machineId", machineId);
    window.location.href = "/v1";
  };

  const createNewMachine = async () => {
    const data = {
      name: nameNewMachine,
    };
    const res = await createMachine(data);
    if (!res._error) {
      initData();
      setNameNewMachine("");
    }
  };

  const onChangeEditName = (value, id) => {
    const updateData = machine.map((item) => {
      if (id === item.ID) {
        return { ...item, name: value };
      }
      return { ...item };
    });
    setMachine(updateData);
  };

  const editName = async (id) => {
    const select = machine.filter((v) => v.ID === id)[0];
    const data = {
      machine_id: select.ID,
      name: select.name,
    };
    const res = await updateMachine(data);
    if (!res._error) {
      initData();
    }
  };

  const deleteThisMachine = async (id) => {
    const res = await deleteMachine(id);
    if (!res._error) {
      initData();
    }
  };

  return (
    <div style={{ backgroundColor: "#F7FAFF", padding: 20 }}>
      <h1>เครื่องทั้งหมด </h1>
      <Row style={{ marginBottom: 20 }}>
        <Input.Group compact>
          <Input
            onChange={(e) => setNameNewMachine(e.target.value)}
            style={{
              width: "calc(100% - 90px)",
            }}
            placeholder="ตั้งชื่อเครื่องใหม่ที่จะเพิ่ม"
          />
          <Button onClick={() => createNewMachine()} type="primary">
            เพิ่มเครื่อง
          </Button>
        </Input.Group>
      </Row>

      <Row>
        {machine.map((v) => (
          <Col span={6} key={v.ID}>
            <Card
              style={{
                backgroundColor: "#AAD6FF",
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
              >
                <Button
                  onClick={() => selectMachine(v.ID)}
                  style={{ marginBottom: 4 }}
                >
                  เข้าเครื่อง
                </Button>
                <Button
                  onClick={() => editName(v.ID)}
                  style={{ marginBottom: 4 }}
                >
                  แก้ไขชื่อ
                </Button>
                <Button
                  onClick={() => deleteThisMachine(v.ID)}
                  style={{ marginBottom: 4 }}
                >
                  ลบเครื่อง
                </Button>
              </div>

              <div>
                <Text strong>เครื่องรหัสที่ : {v.ID}</Text>
              </div>
              <div>
                <Text>ชื่อ : </Text>
                <Input
                  onChange={(e) => onChangeEditName(e.target.value, v.ID)}
                  style={{
                    width: "calc(100% - 90px)",
                  }}
                  value={v.name}
                />
              </div>
              <Row>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {!checkFull(v.ID) && !checkEmpty(v.ID) && (
                    <Alert
                      message="สถานะปกติ"
                      type="success"
                      style={{ margin: 10 }}
                    />
                  )}
                  {checkFull(v.ID) && (
                    <Alert
                      message="มีช่องเต็ม"
                      type="error"
                      style={{ margin: 10 }}
                    />
                  )}
                  {checkEmpty(v.ID) && (
                    <Alert
                      message="มีช่องว่าง"
                      type="error"
                      style={{ margin: 10 }}
                    />
                  )}
                </div>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
