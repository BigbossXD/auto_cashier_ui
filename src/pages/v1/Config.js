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

import {
  getAllConfigs,
  createConfig,
  deleteConfig,
  updateConfig,
} from "../../services/config.service";

export default function Config() {
  const machineId = Number(localStorage.getItem("machineId"));
  const [messageApi] = message.useMessage();
  const [configs, setConfigs] = useState([]);
  const [addMoneyValue, setAddMoneyValue] = useState(0);
  const [addMaximumAmount, setAddMaximumAmount] = useState(0);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const res = await getAllConfigs(machineId);
    if (!res._error) {
      setConfigs(res.data);
    }
  };

  const onChangeAddMoneyValue = (value) => {
    setAddMoneyValue(value);
  };

  const onChangeAddMaximumAmount = (value) => {
    setAddMaximumAmount(value);
  };

  const onSuccess = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const addConfig = async () => {
    if (addMoneyValue !== 0 && addMaximumAmount !== 0) {
      const data = {
        machine_id: machineId,
        money_value: addMoneyValue,
        maximum_amount: addMaximumAmount,
      };
      const res = await createConfig(data);
      if (!res._error) {
        onSuccess();
        setAddMoneyValue(0);
        setAddMaximumAmount(0);
        initData();
      }
    }
  };

  const delConfig = async (id) => {
    const res = await deleteConfig(id);
    if (!res._error) {
      onSuccess();
      setAddMoneyValue(0);
      setAddMaximumAmount(0);
      initData();
    }
  };

  const editConfig = async (id) => {
    console.log(id);
    const select = configs.filter((v) => v.ID === id)[0];
    console.log(select);
    const data = {
      config_id: select.ID,
      maximum_amount: select.maximum_amount,
    };
    console.log(data);
    const res = await updateConfig(data);
    if (!res._error) {
      onSuccess();
      setAddMoneyValue(0);
      setAddMaximumAmount(0);
      initData();
    }
  };

  const onChangeEditMaximum = (value, id) => {
    const updateData = configs.map((item) => {
      if (id === item.ID) {
        return { ...item, maximum_amount: value };
      }
      return { ...item };
    });
    console.log(updateData);
    setConfigs(updateData);
  };

  return (
    <div>
      <Row>
        <Col span={24} style={{ padding: 10 }}>
          <Row style={{ margin: 4, padding: 4, backgroundColor: "#F7FAFF" }}>
            <Col span={8}>
              <b>Money Value</b>
            </Col>
            <Col span={8}>
              <b>Maximum Amount</b>
            </Col>
            <Col span={4}>
              <b>Edit</b>
            </Col>
            <Col span={4}>
              <b>Del</b>
            </Col>
          </Row>
          {configs.length === 0 && <div>---ยังไม่มีประวัติรายการ---</div>}
          {configs.map((v) => (
            <Row
              style={{ margin: 4, padding: 4, backgroundColor: "#F7FAFF" }}
              key={v.ID}
            >
              <Col span={8}>{v.money_value}</Col>
              <Col span={8}>
                {" "}
                <InputNumber
                  value={v.maximum_amount}
                  onChange={(value) => onChangeEditMaximum(value, v.ID)}
                />
              </Col>
              <Col span={4}>
                <Button onClick={() => editConfig(v.ID)}>Edit</Button>
              </Col>
              <Col span={4}>
                <Button onClick={() => delConfig(v.ID)}>Del</Button>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ padding: 10 }}>
          <Row style={{ margin: 4, padding: 4, backgroundColor: "#F7FAFF" }}>
            <Col span={10}>
              <b>Money Value</b>
            </Col>
            <Col span={10}>
              <b>Maximum Amount</b>
            </Col>
            <Col span={4}>
              <b>Add</b>
            </Col>
          </Row>

          <Row style={{ margin: 4, padding: 4, backgroundColor: "#F7FAFF" }}>
            <Col span={10}>
              <InputNumber
                value={addMoneyValue}
                onChange={onChangeAddMoneyValue}
              />
            </Col>
            <Col span={10}>
              <InputNumber
                value={addMaximumAmount}
                onChange={onChangeAddMaximumAmount}
              />
            </Col>
            <Col span={4}>
              <Button onClick={addConfig}>Add</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
