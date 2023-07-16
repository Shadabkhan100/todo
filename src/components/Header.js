import React from 'react'
import { Button, Select } from 'antd'
import AddModal from './Modal';
const{Option}=Select;
function Header(props) {
    const{NewTodo,setNewTodo,Todo,setTodo,status,setStatus,Visible, setVisible,newTodoText,setNewTodoText,okText,setOkText,handleCancel, handleAddTodo,setFilterStatus,filterStatus}=props
   

  const handleFilterStatus=(statusValue)=>{
      setFilterStatus(statusValue);
     }
    const AddTodo=()=>{
      setNewTodoText('')
      setOkText('Add Todo');
       setVisible(true);
    }
  return (
    <div>
        <AddModal  handleAddTodo={ handleAddTodo} handleCancel={handleCancel} setOkText={setOkText} okText={okText}   newTodoText={newTodoText} setNewTodoText={setNewTodoText} status={status} setStatus={setStatus} Todo={Todo} setTodo={setTodo} setNewTodo={setNewTodo} NewTodo={NewTodo} Visible={Visible} setVisible={setVisible}></AddModal>
        <div className="container" style={{padding: '3rem'}}>
          <Button onClick={AddTodo} style={{width:'10rem',float:'left'}} type='primary'>Add Todo</Button>
          <Select value={filterStatus} style={{width:'10rem',float:'right'}} onChange={(statusValue)=>handleFilterStatus(statusValue)}>
          <Option value="all">All</Option>
            <Option value="complete">Complete</Option>
            <Option value="incomplete">InComplete</Option>
          </Select>
        </div>
    </div>
  )
}

export default Header