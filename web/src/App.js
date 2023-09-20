import "./App.css";
import Login from "./Login";
import context from "./Context";
import { useEffect, useState } from "react";
import EmployeeList from "./EmployeeList";
import { getEmployees } from "./network";
function App() {
  const [state, setState] = useState({ employees: [], user: null });
  useEffect(() => {
    async function getData(){
      if(state.user){
        const res = await getEmployees(state.user);
        if(res && res.success){
          setState({...state, employees: res.data})
        }else{
          setState({...state, employees: []})
        }
      }
    }
    getData();
  }, [state.user])
  return (
    <context.Provider value={{ state, setState }}>
      <div className="App">
        {state.user ? <EmployeeList /> : <Login />}
      </div>
    </context.Provider>
  );
}

export default App;
