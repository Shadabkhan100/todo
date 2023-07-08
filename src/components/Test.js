

import React, { useState } from 'react';
import { Button, Checkbox, Form, message,Typography } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import Mymodal from './Mymodal';

const { Title } = Typography;

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [status, setStatus] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editTodo, setEditTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [editStatus, setEditStatus] = useState('');
  const [visible, setVisible] = useState(false);

  const handleFilterStatus = (value) => {
    setStatus(value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { title: newTodo, status: status }]);
      setNewTodo('');
      setStatus('');
      message.success('Your Todo has been added');
      setVisible(false);
    }
  };

  const FilterValues = (e) => {
    setFilter(e.target.value);
  };
  
  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditTodo(todos[index].title);
    setEditStatus(todos[index].status);
  };
  
  const FilterStatus = (e) => {
  
    setStatus(e.target.value);
  };
  

  
  const handleDeleteTodo = (index) => {
    const deletedTodo = todos[index].title;
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    message.success('Your Todo has been deleted');
  };
  
  const handleStatusChange = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].status = editStatus;
    setTodos(updatedTodos);
  };
  
  const SetDate = () => {
    const date = new Date();
    const format = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, format);
  };
  

  return (
    <div>
      <Title className="text-center my-4" level={1} style={{color:'Lightgray'}}>Todo List</Title>
      <div className="container d-flex">
        <div className="container">
          <Mymodal
            handleAddTodo={handleAddTodo}
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            setVisible={setVisible}
            Visible={visible}
            handleFilterStatus={handleFilterStatus}
            selectedStatus={status}
          />
          <select style={{ float: 'right' }} onClick={FilterValues}>
            <option value="all">All</option>
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
          </select>
        </div>
      </div>

     


      <div className="container my-3" style={{ border: '.2rem solid gray', backgroundColor: '#cccccc' }}>
        <Title level={2} style={{color:'black'}} className="text-center">Your ToDo</Title>
        {todos.length < 1 ? <p className="text-center ">Add your todo</p> : null}
        <div className="container">
          <ul style={{ listStyle: 'none' }}>
            {todos
              .filter((todo) => {
                if (filter === 'complete') {
                  return todo.status === 'complete';
                } else if (filter === 'incomplete') {
                  return todo.status === 'incomplete';
                } else {
                  return true;
                }
              })
              .map((todo, index) => (
                <li key={index} className="my-4" style={{ backgroundColor: 'white', padding: '2rem' }}>
                  {editIndex === index ? (
                    <Form>
                      <Form.Item>
                        <TextArea type="text" value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />
                      </Form.Item>
                      <Form.Item>
                        <label>Status</label>
                        <select
                          value={editStatus}
                          className="my-3 mx-4"
                          onChange={(e) => setEditStatus(e.target.value)}
                        >
                          <option value="complete">Complete</option>
                          <option value="incomplete">Incomplete</option>
                        </select>
                      </Form.Item>
                    </Form>
                  ) : (
                    <span className="d-flex">
                      <Checkbox checked={todo.status === 'incomplete' ? false : true}></Checkbox>
                      <p style={{ fontWeight: 'bold' }} className="mx-3">
                        Title:
                      </p>
                      <p className="mx-3" style={{ textDecoration: todo.status === 'incomplete' ? '' : 'line-through' }}>
                        {todo.title}
                      </p>
                    </span>
                  )}
                  <p>Updated On: {SetDate()}</p>
                  <div className="container p-2">
                    {editIndex === index ? (
                      <Button
                        type="primary"
                        onClick={() => {
                          message.success('Your Todo Has Been Updated');
                          handleStatusChange(index);
                          const updatedTodos = [...todos];
                          updatedTodos[index].title = editTodo;
                          setTodos(updatedTodos);
                          setEditIndex(-1);
                        }}
                      >
                        Save Update
                      </Button>
                    ) : (
                      <>
                        <DeleteFilled
                          type="button"
                          style={{ color: 'blue', float: 'right' }}
                          className="mx-4"
                          onClick={() => handleDeleteTodo(index)}
                        >
                          Delete
                        </DeleteFilled>
                        <EditFilled
                          style={{ color: 'blue', float: 'right', cursor: 'pointer' }}
                          onClick={() => handleEditTodo(index)}
                        />
                      </>
                    )}
                  </div>
                  <hr style={{ color: 'black' }} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
