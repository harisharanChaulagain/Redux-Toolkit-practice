import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import axios from "axios";
import thunk from "redux-thunk";

//action name constant
// const init = "account/init";
const inc = "account/increment";
const dec = "account/decrement";
const incByAmount = "account/incrementByAmount";
const getAccUserPending = "account/getUser/pending";
const getAccUserFulFilled = "account/getUser/fulfilled";
const getAccUserRejected = "account/getUser/rejected";


const incBonus = "bonus/increment";


//Store
const store = createStore(
  combineReducers({
    account: accountReducer,
    bonus: bonusReducer,
  }),
  applyMiddleware(logger.default, thunk.default)
);

const history = [];

//Reducer
function reducer(state = { amount: 1 }, action) {
  switch (action.type) {
    case init:
      return { amount: action.payload };
    case inc:
      return { amount: state.amount + 1 };
    case dec:
      return { amount: state.amount - 1 };
    case incByAmount:
      return { amount: state.amount + action.payload };
    default:
      return state;
  }
}

function bonusReducer(state = { points: 0 }, action) {
  switch (action.type) {
    case incBonus:
      return { points: state.points + 1 };
    case incByAmount:
      if (action.payload >= 100) return { points: state.points + 1 };
    default:
      return state;
  }
}
//Global state
// store.subscribe(() => {
//     history.push(store.getState());
//     console.log(history);
// })

//Action creator
function getUserAccouunt(id) {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
    dispatch(initUser(data.amount));
  };
}
function initUser(value) {
  return { type: init, payload: value };
}
function increment() {
  return { type: inc };
}
function decrement() {
    return { type: dec };
  }
function incrementByAmount(value) {
  return { type: incByAmount, payload: value };
}
function incrementBonus(value){
    return {type: incBonus};
}

setTimeout(() => {
    store.dispatch(getUserAccouunt(2));
//   store.dispatch(incrementBonus());
}, 2000);
