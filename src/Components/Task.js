import React, { useEffect, useState } from "react";
import Modal from "./Modal";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  // const [showDiv, setShowDiv] = useState("");
  const imageUrl = "https://www.svgrepo.com/show/345451/arrow-drop-right.svg";
  const [image, setImage] = useState(imageUrl);
  const changeImage = () => {
    if (image === imageUrl) {
      setImage(
        "https://icons.veryicon.com/png/o/miscellaneous/docs/dropdown-2.png"
      );
    } else {
      setImage(imageUrl);
    }
  };

  useEffect(() => {
    const url = "http://18.208.183.190/api/tasks/";
    fetch(url)
      .then((res) => res.json())
      .then((res) => setTasks(res));
  }, []);

  return (
    <>
      <div className="d-flex justify-content-around mt-3 cd-md-6">
        <h2 className="p-2 fw-bold">My Tasks</h2>
        <Modal />
      </div>

      <div className="container mt-4">
        <div className="row ">
          <div className="d-flex justify-content-around">
            <span className="p-2 fw-bold">Task Title</span>
            <span className="p-2 text-primary">Due</span>
          </div>

          <div className="row">
            <div className="col">
              {tasks.map((task) => {
                if (task.parent_task === null)
                  return (
                    <>
                      <img
                        src={image}
                        alt="drop"
                        className="image"
                        onClick={() => {
                          changeImage();
                          // setShowDiv(true);
                        }}
                      />
                      Parent Task:- {task.id}

                      <div className="d-flex justify-content-around border border-danger m-5 mt-2 p-4 rounded ">
                        <span className="p-2 fw-bold" key={task}>
                          {task.title}
                        </span>
                        <div className="d-flex flex-column">
                          <span className="p-2 text-primary" key={task}>
                            {task.due}
                          </span>
                          <Modal />
                        </div>
                      </div>

                      {/* {showDiv && (
                        <div className="row">
                          <span className="p-2 fw-bold text-center">
                            {" "}
                            Child tasks:-
                            {tasks.map((task, index) => {
                              if (task.parent_task == !null) {
                                return (
                                  <>
                                    <div className="d-flex justify-content-between  border border-danger m-5 mt-2 p-4">
                                      <span
                                        className="p-2 fw-bold "
                                        key={`${task.id}-${index}`}
                                      >
                                        Child task {task.id} is :- {task.title}
                                      </span>
                                      <span
                                        className="p-2 text-primary"
                                        key={task.id}
                                      >
                                        {task.due}
                                      </span>
                                    </div>
                                  </>
                                );
                              }
                            })}
                          </span>
                        </div>
                      )} */}
                    </>
                  );
              })}
            </div>
          </div>

          <div className="row">
            <span className="p-2 fw-bold text-center"> Child tasks:-
              {tasks.map((task,index) => {if (task.parent_task != null ) { 
                  return <>
                      <div className="d-flex justify-content-between  border border-danger m-5 mt-2 p-4">
                        <span className="p-2 fw-bold " key={`${task.id}-${index}`}>
                          Child task {task.id} is :- {task.title}
                        </span>
                          <span className="p-2 text-primary" key={task.id}>
                            {task.due}
                          </span>
                      </div>
                  
                  </>;
                }
            })}
            </span>
        </div>  
        </div>
      </div>
    </>
  );
}

export default TaskList;
