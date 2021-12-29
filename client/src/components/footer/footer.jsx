// import React from "react";

// import './footer.scss'

// const Footer = (props) => {
//     const {allDelete, data, countTask, counterFalse} = props;
//     const buttonsData = [
//         {name: 'all', label: 'All'},
//         {name: 'active', label: 'Active'},
//         {name: 'compleated', label: 'Completed'}
//     ];
//         const buttons = buttonsData.map(({name, label}) => {
//         const active = props.filter === name;
//         const clazz = active ? "to-do__btn-active" : "to-do__board-btn";

//         return (
//             <button 
//                 className={clazz}
//                 type="button"
//                 onClick={() => props.onFilterSelect(name)}
//                 key={name}>
//                 {label}
//             </button>
//         )
//     })

//     if  (countTask) { 
//         const checkS = data.filter(item => !item.done).length !== 1 ? "s" : ""
//         const trueItems = data.filter(item => item.done).length ? "to-do__board-btn-clear to-do__board-btn-active" : "to-do__board-btn-clear";

//         return (
//             <div className="to-do__board">
//                 <p className="to-do__board-list-items">{counterFalse} item{checkS} left</p>
//                 <ul className="to-do__board-check">
//                     <li className="to-do__board-li">
//                         {buttons}
//                     </li>
//                 </ul>
//                 <div className="to-do__board-list-btn">
//                     <button className={trueItems}  
//                         onClick={allDelete}
//                     >
//                     Clear completed
//                     </button>
//                 </div>
//             </div>   
//         ) 
//     } 
//     else
//         return (<></>) 
// }

// export default Footer;