import React from 'react';
import { Modal, Select, Button,Typography } from 'antd';
import TextArea from "antd/es/input/TextArea";

const { Title } = Typography;
const { Option } = Select;

const Mymodal = ({ handleAddTodo, newTodo, setNewTodo, setVisible, Visible, handleFilterStatus, selectedStatus }) => {
  const showModal = () => {
    setVisible(true);
  };

  return (
    <div>
      <Button style={{ width: '8rem' }} type='primary' onClick={showModal}>Add Todo</Button>
      <Modal open={Visible} okText={'Add'} onOk={handleAddTodo} onCancel={() => setVisible(false)}>
        <Title style={{ color: 'lightgray' }} className="text-center" level={1}>Create Your Todo</Title>
        <label>Enter Your Todo</label>
        <TextArea type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />

        <label>Status</label>
        <Select style={{ width: '7rem' }} value={selectedStatus} className="my-3 mx-4" onChange={handleFilterStatus}>
          <Option value="complete">Complete</Option>
          <Option value="incomplete">Incomplete</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default Mymodal;
