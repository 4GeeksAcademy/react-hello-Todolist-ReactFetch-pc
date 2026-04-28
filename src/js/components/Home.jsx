import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

const Home = () => {
    const API_URL = "https://playground.4geeks.com/todo/todos/patcarrasco";

    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");
    const [loading, setLoading] = useState(true);


    const getTodos = () => {
        fetch(API_URL)
             .then((resp) => resp.json())
             .then((data) => {
                 const todos = Array.isArray(data) ? data : data.todos;
                 setTareas(todos || []);
              })
              .catch(console.log)
              .finally(() => setLoading(false));
    };

    useEffect(() => {
        getTodos();
    }, []);


    const updateTodos = (updatedList) => {
        fetch(API_URL, {
           method: "PUT",
           body: JSON.stringify(updatedList),
           headers: {
              "Content-Type": "application/json"
           }
        })
           .then(() => {
               setTareas(updatedList);
           })
           .catch(console.log);
    };


    const addTask = () => {
       if (nuevaTarea.trim() === "") return;

       const updatedList = [
           ...tareas,
           {
              label: nuevaTarea,
              is_done: false
           }
       ];

       updateTodos(updatedList);
       setNuevaTarea("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") addTask();
    };


    const eliminar = (index) => {
        const updatedList = tareas.filter((_, i) => i !== index);
        updateTodos(updatedList);
    };

    return (
        <div className="container">
             <h1>Lista de tareas</h1>

                <input
                   value={nuevaTarea}
                   onChange={(e) => setNuevaTarea(e.target.value)}
                   onKeyDown={handleKeyDown}
                   className="input"
                   type="text"
                   placeholder="Agrega una tarea"
               />

               {loading ? (
                   <p>Cargando...</p>
               ) : tareas.length === 0 ? (
                   <p>No hay tareas</p>
               ) : (
                   tareas.map((tarea, index) => (
                       <p key={index} className="task">
                           {tarea.label}
                           <span
                               className="delete-btn"
                               onClick={() => eliminar(index)}
                           >
                             X
                           </span>
                       </p>
                   ))
               )}

               <p>
                   Quedan {tareas.length} tarea{tareas.length !== 1 ? "s" : ""}
               </p>
         </div>
    );
};

export default Home;
