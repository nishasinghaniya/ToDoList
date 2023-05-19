import React, { useEffect, useState } from "react";

function ToDoList() {
  const [todo, setTodo] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else return [];
  });
  const [newTask, setNewtask] = useState("");
  const [updateList, setupdateList] = useState("");

  const incompleteCount = todo.filter((task) => task.status === false).length;

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const addActivity = () => {
    if (newTask) {
      let num = todo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setTodo([...todo, newEntry]);
      setNewtask("");
    }
  };
  const deleteActivity = (id) => {
    let newTasks = todo.filter((task) => task.id !== id);
    setTodo(newTasks);
  };

  const doneActivity = (e, activity) => {
    console.log(e.target.checked);
    let filterData = todo.filter((task) => task.id !== activity.id);

    let newActivity = { ...activity };
    newActivity.status = e.target.checked;
    const newToDo = [...filterData, newActivity];
    setTodo(newToDo);
  };
  const cancelUpdate = () => {
    setupdateList("");
  };
  const changeActivity = (e) => {
    //console.log(e);
    let newEntry = {
      id: updateList.id,
      title: e.target.value,
      status: updateList.status ? true : false,
    };
    setupdateList(newEntry);
  };
  const updateTask = () => {
    let filterData = todo.filter((task) => task.id !== updateList.id);

    let updateObject = [...filterData, updateList];
    setTodo(updateObject);
    console.log(setTodo);
    setupdateList("");
  };

  return (
    <div className="contanair">
      <div>
        <h1 className="header"> To Do List</h1>
        <h2>Count of Incomplete Task : {incompleteCount}</h2>
        <br></br>
        {updateList ? (
          <>
            <div className="row">
              <div className="col">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  value={updateList.title}
                  onChange={changeActivity}
                ></input>
              </div>
              <div className="col-auto">
                <button
                  onClick={updateTask}
                  className="btn btn-primary edit-btn"
                >
                  Update
                </button>
                <button onClick={cancelUpdate} className="btn btn-primary">
                  Cancel
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <div className="col">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewtask(e.target.value)}
                ></input>
              </div>
              <div className="col-auto">
                <button onClick={addActivity} className="btn btn-primary">
                  Add Activity
                </button>
              </div>
            </div>
          </>
        )}

        <br></br>
        {todo && todo.length ? "" : "No Task added...."}

        {todo &&
          todo.map((activity, index) => {
            return (
              <React.Fragment key={activity.id}>
                <div className="col taskBg">
                  <div className={activity.status ? "done" : ""}>
                    <span className="taskNumber"> {index + 1}</span>
                    <span className="taskText"> {activity.title}</span>
                    <input
                      type="checkbox"
                      className="input-contanair"
                      onChange={(e) => doneActivity(e, activity)}
                    ></input>
                    <button
                      className="btn btn-primary edit-btn"
                      onClick={() =>
                        setupdateList({
                          id: activity.id,
                          title: activity.title,
                          status: activity.status ? true : false,
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteActivity(activity.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
}

export default ToDoList;
