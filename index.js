import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import axios from 'axios';
import thunk from 'redux-thunk';

//action name constant
const init = 'init';
const inc = 'increment';
const dec = 'decrement';
const incByAmount = 'incrementByAmount';

//Store
const store = createStore(reducer, applyMiddleware(logger.default, thunk.default));

const history = [];


//Reducer
function reducer(state={amount:1}, action){
    switch(action.type){
        case init:
            return{amount: action.payload};
        case inc:
            return{amount: state.amount+1};
        case dec:
            return{amount: state.amount-1};
        case incByAmount:
            return{amount: state.amount+action.payload};
        default:
            return state
    }
}

//Global state
// store.subscribe(() => {
//     history.push(store.getState());
//     console.log(history);
// })

//Async API call
async function getUser(){
  const {data} = await axios.get('http://localhost:3000/accounts/1');
  console.log(data);
}
getUser();

//Action creator
async function getUser(dispatch, getState){
  const {data} = await axios.get('http://localhost:3000/accounts/1');
  dispatch(initUser(data.amount));
}
function initUser(){
    return {type: init, payload:value}  
}
function decrement(){
    return {type: dec}
}
function incrementByAmount(value){
    return {type: incByAmount, payload:value}
}

setTimeout(() => {
// store.dispatch({type:'decrement'});
// store.dispatch({type:'increment'});
// store.dispatch({type:'incrementByAmount',payload:5});
store.dispatch(initUser);

},2000)