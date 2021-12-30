
import { useState, useEffect } from "react";
import axios from "axios";


import './showTodoList.scss';
// import { UpdateTodo } from "../updateTodo"; // added


function TodoCard({data, handleDelete }) {
    const { _id, done } = data; //props
    const [todo, setData] = useState(data); //state
    
    
    let classDone, classCheck, classActive;

    function handleChange(e) {
        console.log("e.target.value", e.target.value)
        setData({ ...data, title: e.target.value});
    }


    // function handleSubmit(e) {
    //     e.preventDefault();
    //     axios
    //         .put(`http://localhost:8000/api/todo/${_id}`, {title: todo.title} )       
    //         .then((res) => {
    //             setData({ ...res});
    //             console.log(res.data.message);
    //         })
    //         .catch((err) => {
    //             console.log("Failed to update todo");
    //             console.log(err.message);
    //     });
    // }

    function handleSubmit(e) {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/todo/${_id}`, {title: todo.title} )       
            .then((res) => {
                setData({ ...res});
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Failed to update todo");
                console.log(err.message);
        });
    }


    // function handleDelete(e) { // added
    //     axios.delete(`http://localhost:8000/api/todo/${e.target.name}`);
    //     setTodo((data) => {
    //         return data.filter((todo) => todo._id !== e.target.name);
    //     });
    // }

    function onFocus(e) {
        e.currentTarget.classList.add("to-do__text-active")
    }

    function onBlur(e) {
        e.currentTarget.classList.remove("to-do__text-active");     
    }

    function handleKeyDown(e){
        if(e.keyCode === 13){
            e.currentTarget.setAttribute("readonly", "true")
            e.currentTarget.classList.remove("to-do__text-active");
        }        
    }


    function removeAttribute(e) {
        e.currentTarget.classList.add("to-do__text-active");
        e.currentTarget.removeAttribute("readonly", "true")
    }

    
      
    if(done){
      classDone = "to-do__text to-do__done";
      classCheck = "to-do__checkbox to-do__checkbox-actve";
      classActive = "to-do__checkbox-check to-do__checkbox-check-active";
    } else {
        classDone = "to-do__text";
        classCheck = "to-do__checkbox";
        classActive = "to-do__checkbox-check";
    }  

    return (
        <li className="to-do__list-li" key={_id} >
            <label className={classCheck} htmlFor="checkItem"></label>
            <input id="checkItem"
                className="to-do__checkbox-input" 
                type="checkbox"
            />
            <img className={classActive} src="/img/check.svg" alt="check" />
            <form action="" onSubmit={handleSubmit}>
            <input className={classDone}
                type="text"
                onChange={handleChange}
                onClick={removeAttribute}
                onKeyDown={handleKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
                done={done}
                value={todo.title}
                name={_id}
                id={_id}  
            />   
            </form>
            <button className="to-do__checkbox-btn">
                <img className="to-do__checkbox-cross"
                done={done} 
                name={_id} 
                id={_id}  
                onClick={handleDelete} 
                src="/img/cross.svg" alt="delete"/>
            </button>
        </li>      
    );  
}

export function ShowTodoList() {
    const [todo, setTodo] = useState([]);
    // const [open, setOpen] = useState(false); // added
    // const [id, setId] = useState(""); // added
    // const [update] = useState(true); // added


    useEffect(() => {
        axios
            .get("http://localhost:8000/api/todo")
            .then((res) => {
                console.log(res.data);
                setTodo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    // function handleEdit(e) { // added
    //     setId(e.target.name); 
    //     setOpen(true);
    // }

    // function handleUpdate() { // added
    //     console.log("update:", update, !update);
    //     setUpdate(!update);
    // }

    function handleDelete(e) { // added
        axios.delete(`http://localhost:8000/api/todo/${e.target.name}`);
        setTodo((data) => {
            return data.filter((todo) => todo._id !== e.target.name);
        });
    }

    

    return (
        <section className="contents">
                <ul className="list-container">
                    {todo.map((data) => (
                        <TodoCard 
                            data={data}
                            // handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />   
                    ))}
                </ul>
        </section>
    );
}