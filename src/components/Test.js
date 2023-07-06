import { Button, Checkbox, Form, message } from "antd";
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [status, setStatus] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
const [editTodo, setEditTodo] = useState("");
const [filter, setFilter] = useState("all");
const [editStatus, setEditStatus] = useState("");

const FilterValues=(e) => {
  setFilter(e.target.value)
}
  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditTodo(todos[index].title);
    setEditStatus(todos[index].status);
  };
  
  const FilterStatus = (e) => {
    setStatus(e.target.value);
  }

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { title: newTodo, status: status }]);
      setNewTodo("");
      setStatus("");
      message.success('Your Todo has been added');
    }
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
  
  const SetDate= () => {
const date=new Date()
const format={year:'numeric',month:'long',day:'numeric'}
return date.toLocaleDateString(undefined,format);
  };
  return (
    <div>
      <h1 className="text-center my-4">Todo List</h1>
      <div className="container d-flex">
        <div className="container">
        <button style={{float:'left'}} class="btn btn-success  text-light " type="button" data-bs-toggle="modal" data-bs-target="#signupModal">Add Your Todo</button>
        <select style={{float:'right'}}  onClick={FilterValues}>
           <option value="all">All</option> 
           <option value="incomplete">Incomplete</option>
           <option value="complete">Complete</option>
           
       </select>

                </div>
      </div>
{/* Modal for adding the todos */}
      <div class="modal fade" id="signupModal" tabindex="-1" aria-labelledby="signupModal" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="signupModal">Add Your Todo</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <label>Enter Your Todo</label>
                <TextArea type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}></TextArea>
                <label >Status</label>
                <select key={"index"} className="my-3 mx-4" onChange={FilterStatus}>
                  <option value="complete">Complete</option>
                  <option value="incomplete">Incomplete</option>
                </select>
                <div class="modal-footer">
                  <Button className="mx-4" style={{ float: 'left' }} type="primary" onClick={handleAddTodo}>Add Todo</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>



      <div className="container my-3" style={{ border: '.2rem solid gray', backgroundColor: '#cccccc' }}>
        <h2 className="text-center">Your ToDo</h2>
        {/* Display when todos lenght is less then 1 */}
         {todos.length < 1 ? (
          <p className="text-center " >Add your todo</p>
        ) : null}
        <div className="container" >
          <ul style={{ listStyle: 'none'}}>
            {/* Filter todos on the bases of the options */}
          {todos.filter((todo) => {
  if (filter === "complete") {
    return todo.status === "complete";
  } else if (filter === "incomplete") {
    return todo.status === "incomplete";
  } else {
    return true; // Filter is set to "All", show all todos
  }
}).map((todo, index) => (
  <li key={index} className="my-4" style={{backgroundColor:'white',padding:'2rem'}}>
    {/* Updateing todo if condition true */}
   {editIndex === index ? (
    <Form>
      <Form.Item>
        <TextArea type="text" value={editTodo} onChange={(e) => setEditTodo(e.target.value)}/>
      </Form.Item>
      <Form.Item>
      <label>Status</label>
      <select value={editStatus} className="my-3 mx-4" onChange={(e) => setEditStatus(e.target.value)}>
       <option value="complete">Complete</option>
      <option value="incomplete">Incomplete</option> 
    
    </select>
      </Form.Item>
</Form>
   ) : (
   <span className="d-flex">
    {/* check box to show which todo is complete or not */}
    <Checkbox checked={todo.status === 'incomplete' ? false : true}></Checkbox>
  <p style={{ fontWeight: 'bold' }} className="mx-3">Title:</p>
  <p className="mx-3" style={{ textDecoration: todo.status === 'incomplete' ? '' : 'line-through' }}>
    {todo.title}</p>
</span>)}
<p>Updated On: {SetDate()}</p>
<div className="container p-2">
{editIndex === index ? (<Button type="primary" onClick={() => {message.success('Your Todo Has Been Updated');
  handleStatusChange(index);
  const updatedTodos = [...todos];
  updatedTodos[index].title = editTodo;
  setTodos(updatedTodos);
  setEditIndex(-1);
}}>
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
