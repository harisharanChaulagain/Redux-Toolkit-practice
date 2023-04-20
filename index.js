import { createStore } from 'redux';

//Store
const store = createStore(reducer);

const history = [];

//Reducer
function reducer(state={amount:1}, action){
    if(action.type==='increment'){
        return{amount: state.amount+1};
    }
    return state
}

//Global state
store.subscribe(() => {
    history.push(store.getState());
    console.log(history);
})

setInterval(() => {
store.dispatch({type:'increment'});
},2000)