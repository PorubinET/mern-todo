
import { useState, useEffect } from "react";
import axios from "axios";


import './showTodoList.scss';
import { UpdateTodo } from "../updateTodo"; // added


function TodoCard({data, handleDelete, handleChange, handleEdit }) {
    const { _id, title, done } = data; //props
    const [todo, setData] = useState(data); //state
    
    
    
    let classDone, classCheck, classActive;

    function handleChange(e) {
        console.log("e.target.value", e.target.value)
        setData({ ...data, title: e.target.value});
    }

    function handleSubmit(e) {
        console.log("data +++", data.title);
        e.preventDefault(); 
        console.log({ _id }, { data } + `id, data`);
        axios
            .put(`http://localhost:8000/api/todo/${_id}`, data)
            .then((res) => {
                setData({ ...data, title: e.target.value});
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Failed to update todo");
                console.log(err.message);
            });
    }

    // function inputChange(e) {
    //     console.log(title)
    //     this.setState({title: e.target.value}.replace (/ +/g, ' '))
    // }

    // function onFocus(e) {
    //     e.currentTarget.classList.add("to-do__text-active")
    // }

    // function onBlur(e) {
    //     e.currentTarget.classList.remove("to-do__text-active"); 
    //     this.setState({ 
    //         title: this.props.title      
    //     })      
    // }

    // function handleKeyDown(e){
    //     if(e.keyCode === 13){
    //         e.preventDefault();
    //         e.currentTarget.setAttribute("readonly", "true")
    //         e.currentTarget.classList.remove("to-do__text-active");
    //         this.props.updateData(
    //             this.state.id,
    //             this.state.title,
    //             console.log(this.state.title + ` AAAAAAA`)
    //         );
    //         if(!this.state.title.length) {
    //             this.setState({ 
    //                 title: this.props.title      
    //             })
    //         } 
    //     }        
    // }


    // function removeAttribute(e) {
    //     e.currentTarget.classList.add("to-do__text-active");
    //     e.currentTarget.removeAttribute("readonly", "true")
    // }

    
      
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
            <input className={classDone}
                type="text"
                onDoubleClick={handleSubmit}
                // onClick={handleUpdate}
                onChange={handleChange}
                // onKeyDown={handleKeyDown}
                // onFocus={onFocus}
                // onBlur={onBlur}
                done={done}
                value={todo.title}
                name={_id}
                id={_id}  
            />   
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
    const [open, setOpen] = useState(false); // added
    const [id, setId] = useState(""); // added
    const [update, setUpdate] = useState(false); // added
    // const [data, setData] = useState({});


    // function handleChange(e) {
    //     console.log("data", data);
    //     // console.log(e.target.value)
    //     setData({ id: 1, done: false, title: e.target.value});
    // }


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
    }, [update]);


    function handleEdit(e) { // added
        setId(e.target.name); 
        setOpen(true);
    }

    function handleUpdate() { // added
        console.log("update:", update, !update);
        setUpdate(!update);
    }

    function handleDelete(e) { // added
        axios.delete(`http://localhost:8000/api/todo/${e.target.name}`);

        setTodo((data) => {
            return data.filter((todo) => todo._id !== e.target.name);
        });
    }

    function handleClose() { // added
        setId("");
        setOpen(false);
    }
    

    return (
        <section className="container">
            <section className="contents">
                <ul className="list-container">
                    {todo.map((data) => (
                        <TodoCard 
                            data={data}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            // handleChange={handleChange}
                        />   
                    ))}
                </ul>
            </section>
            {open ? (
                <section className="update-container">
                    <div className="update-contents">
                        <p onClick={handleClose} className="close">
                            &times;
                        </p>
                        <UpdateTodo
                            _id={id}
                            handleClose={handleClose}
                            handleUpdate={handleUpdate}
                            handleEdit={handleEdit}
                        />
                    </div>
                </section>
            ) : (
                ""
            )}
        </section>
        
    );
}