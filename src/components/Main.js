import React,{useState} from 'react'
import {Typography,message} from 'antd'
import Header from './Header'
import TotalTodo from './TotalTodo'
 const {Title}=Typography


function Main() {
     const [Visible, setVisible] = useState(false)
    const [status, setStatus] = useState('Select Status');
    const [NewTodo, setNewTodo] = useState('');
    const [Todo, setTodo] = useState([]);
    const [newTodoText, setNewTodoText] = useState('');
    const [okText, setOkText] = useState("Add Todo")
    const [editTodo, setEditTodo] = useState('');
    const [filterStatus, setFilterStatus] = useState('all')
    const handleAddTodo = () => {
      setOkText("Add Todo");
if(newTodoText !==''){
  if(editTodo !==''){ //Its coming from TotalTodo component
    const updatedTodo=[...Todo];
    updatedTodo[editTodo]={title:newTodoText,status:status};
    setTodo(updatedTodo);
    setEditTodo('');
    message.success('Todo has been updated');
  }
  else{
    setNewTodoText('');
    setTodo([...Todo,{title:newTodoText,status:status}]);
    message.success('Todo has been added');
  }
  setNewTodoText('');
  setStatus('');
  setVisible(false);
}

    };
    const handleCancel=()=>{
      setVisible(false);
    }
  return (
    <div >
        <Title className='my-4' style={{color:'lightgrey',textAlign:'center'}}>TodoList</Title> 
        <Header filterStatus={filterStatus} setFilterStatus={setFilterStatus}  handleAddTodo={ handleAddTodo} handleCancel={handleCancel} setOkText={setOkText} okText={okText} newTodoText={newTodoText} setNewTodoText={setNewTodoText} Visible={Visible} setVisible={setVisible} status={status} setStatus={setStatus} NewTodo={NewTodo} setNewTodo={setNewTodo}  Todo={Todo} setTodo={setTodo}/>
        
    
     <div className="container " style={{alignItems:'center',padding:'3rem'}}>
     {Todo.length < 1 ? <Title className='text-center' level={3}>No todo to show....</Title>: <Title className='text-center' level={3}>Your Recent Todo</Title>}
     <TotalTodo setStatus={setStatus} filterStatus={filterStatus} setFilterStatus={setFilterStatus}  handleAddTodo={ handleAddTodo} handleCancel={handleCancel} editTodo={editTodo} setEditTodo={setEditTodo} status={status}  setOkText={setOkText}  newTodoText={newTodoText} setNewTodoText={setNewTodoText} Visible={Visible} setVisible={setVisible} setNewTodo={setNewTodo} setTodo={setNewTodo} Todo={Todo}/>
     
     </div>
     
     
    </div>
  )
}

export default Main