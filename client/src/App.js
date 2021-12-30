import { BrowserRouter, Route } from "react-router-dom";
import { ShowTodoList } from "./components//showTodoList/showTodoList";
import { CreateTodo } from "./components/createTodo/createTodo";
// import Footer  from "./components/footer/footer";
import "./App.scss";

function App() {
    return (
        <div className="App">   
          <div className="wrapper">
            <div className="to-do">
              <h1 className="to-do__title">todos</h1>     
              <div className="to-do__block">
              <BrowserRouter>
                <Route path="/" component={CreateTodo} />
                <Route exact path="/" component={ShowTodoList} />
                {/* <Route path="/" component={Footer} /> */}
              </BrowserRouter>
              </div>
            </div>   
          </div>
      </div> 
    );
}

export default App;