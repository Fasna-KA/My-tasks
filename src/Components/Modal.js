import React,{ useState } from 'react'

function Modal() {

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});

  function handleClick() {
    setShowForm(!showForm);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch('http://18.208.183.190/api/tasks/', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(formData)
  }

  return (
    <>
      <button className="p-2 text-primary border-0" onClick={handleClick}>Add Task</button>
      {showForm && (
        
        <form className="col col-12 box" onSubmit={handleSubmit}>
            <input type="text" name="name" onChange={handleChange} placeholder="Title" />
          <br />
            <input type="date" name="email" onChange={handleChange} placeholder="Due"/>
          <br />
            <input type="number" name="task" onChange={handleChange} placeholder="Parent_task"/>
          <br />
          <button type="submit"onClick={handleClick} class="btn btn-primary m-2 ">Post</button>
        </form>
      )}
    </>    
  )
}

export default Modal