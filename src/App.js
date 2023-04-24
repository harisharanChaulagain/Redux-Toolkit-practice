import { useSelector, useDispatch } from "react-redux"
import { actions } from "./store/index"; 

const App = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const increment = () => {
    dispatch(actions.increment());
  }
  const decrement = () => {
    dispatch(actions.decrement());
  }
  const addBy = () => {

    dispatch(actions.addBy(10))
  }
  return (
    <div>
      <h1>Counter</h1>
      <h2>{counter}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={addBy}>AddBy10</button>
    </div>
  )
}

export default App