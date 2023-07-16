import React from 'react';
import { Typography, Divider, Button, message, Checkbox } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

const { Title } = Typography;

function TotalTodo(props) {
  const { setTodo, Todo, setVisible, setNewTodoText, setStatus, setOkText, setEditTodo, filterStatus} = props;

  const handleDelete = (index) => {
    const deleteTodo = Todo.splice(index, 1);
    console.log(deleteTodo);
    setTodo(deleteTodo);
    message.success('Todo has been deleted');
  };

  const handleUpdate = (index) => {
    setOkText('Update Todo');
    setVisible(true);
    const myTitle = Todo[index].title;
    const myStatus = Todo[index].status;
    setNewTodoText(myTitle);
    setStatus(myStatus);
    setEditTodo(index); // Store the index of the todo being edited
  };

const handleChangeStatus=(index,checked)=>{
      //  console.log(checked);
      //  console.log(index);
       const checkedValue=[...Todo];
      checkedValue[index].status=checked?'complete':'incomplete';
       setTodo(checkedValue);
}
  return (
    <div>
     
      <br />
      {Todo.filter((Todo) => {
        if (filterStatus === 'complete') {
          return Todo.status === 'complete';
        } else if (filterStatus === 'incomplete') {
          return Todo.status === 'incomplete';
        } else {
          return true;
        }
      }).map((Todo, index) => (
        <li key={index} style={{ listStyle: 'none' }}>
          <div style={{ border: 'black', background: '#eeee' }}>
            <div style={{ padding: '1rem' }}>
              <Button onClick={() => handleDelete(index)} 
              style={{ float: 'right', color: 'blue', cursor: 'pointer' }} className="mx-4"> <DeleteFilled />
              </Button>
              <Button onClick={() => handleUpdate(index)}
               style={{ float: 'right', color: 'blue', cursor: 'pointer', backgroundColor: '#eeee' }} className="mx-4"><EditFilled />
              </Button>
            </div>
            <div className="container" style={{ display: 'flex' }}>
              <Checkbox  checked={Todo.status==='complete'} onChange={(e)=>handleChangeStatus(index,e.target.checked)}/>
              <Title style={{ padding: '1rem' }} level={4}>Title:</Title>
              <Title level={5} style={{ color: 'black', textDecoration: Todo.status === 'incomplete' ? '' : 'line-through' }}>{Todo.title}</Title>
            </div>
            <div className="container" style={{ display: 'flex' }}>
              <Title style={{ padding: '1rem' }} level={4}>Status:</Title>
              <Title level={5} style={{ color: 'black' }}>{Todo.status}</Title>
            </div>
          </div>
          <Divider style={{ fontStyle: 'oblique' }}>Add More Todo</Divider>
        </li>
      ))}
    </div>
  );
}

export default TotalTodo;
