import React from 'react';
import { Modal, Select, Typography} from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;
const { Option } = Select;

function AddModal(props) {
  const { Visible,handleCancel,status, setStatus,newTodoText,setNewTodoText,okText,handleAddTodo} = props
  



  const handleStatus = (value) => {
    setStatus(value);
  };

  const onChange = (e) => {
    setNewTodoText(e.target.value);
  };

  return (
    <div>
      <Modal open={Visible} okText={okText} onOk={handleAddTodo} onCancel={handleCancel}>
        <Title style={{ color: 'lightgray' }} className="text-center" level={1}>
          Create Your Todo
        </Title>
        <label>Enter Your Todo</label>
        <TextArea type="text" value={newTodoText} onChange={onChange} required />
        
        <label className="my-2">Status</label><br></br>
        <Select style={{ width: '100%' }} value={status} onChange={handleStatus} >
          <Option value="complete">Complete</Option>
          <Option value="incomplete">Incomplete</Option>
        </Select>
      </Modal>
    </div>
  );
}

export default AddModal;
