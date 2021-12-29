import { useState } from "react";

import './createTodo.scss';

import axios from "axios";

export function CreateTodo() {
    const [data, setData] = useState({ title: "", done: false });

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const todo = {
            title: data.title,
            done: data.done,
        };

        console.log({ todo });
        axios
            .post("http://localhost:8000/api/todo", data)
            .then((res) => {
                setData({ title: "", done: false });
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Error couldn't create TODO");
                console.log(err.message);
            });
    }


    let classArrow = data.length ? "to-do__list-btn-arrow to-do__list-btn-arrow-active" : " to-do__list-btn-arrow";
    let classCheck = data.length ? "to-do__list-btn to-do__list-btn-active" : "to-do__list-btn"

    // if(data.every(item => item.done)) {classArrow += " to-do__fading"}

    return ( 
        <div className="to-do__task-input">
        <input className={classCheck}  
            // onClick={allCompleated} 
            type="checkbox">    
        </input>
        <img className={classArrow} 
            src="/img/arrow.svg" 
            alt="arrow"/>
        <form className="add" onSubmit={handleSubmit}>                
            <input className="to-do__task"
                type="text"
                name="title"
                value={data.title} 
                // onChange={this.inputChange} 
                onChange={handleChange}
                placeholder="What needs to be done?">                   
            </input>
        </form>
        </div>  
    )
}