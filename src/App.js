import "./index.scss";
import { useReducer } from "react";

function App() {
  const [count, dispatch] = useReducer(onClickFunc, 0);

  function onClickFunc(state, action) {
    switch (action.type) {
      case "increment":
        return state + action.payload;
      case "decrement":
        return state - action.payload;
      default:
        return state;
    }
  }
  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{count}</h1>
        <button
          className="minus"
          onClick={() => dispatch({ type: "decrement", payload: 1 })}
        >
          - Минус
        </button>
        <button
          className="plus"
          onClick={() => dispatch({ type: "increment", payload: 1 })}
        >
          Плюс +
        </button>
      </div>
    </div>
  );
}

export default App;
