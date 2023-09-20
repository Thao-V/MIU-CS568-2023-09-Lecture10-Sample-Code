import { useContext } from "react"
import context from "./Context"

function Employee({employee}){
  return <p>{employee.name}</p>
}
export default function EmployeeList(){
  const {state} = useContext(context)
  return(
    <div>
      {state.employees.map((e, i) => <Employee key={i} employee={e}/>)}
    </div>
  )
}