 import axios from 'axios';
  import { loadState } from '../localStorage';
const genid = () => Math.random().toString(34).slice(2);
  const persistedState = loadState();
 // console.log(persistedState);
 // let nextTodoId = persistedState.todos.length || 0;
// console.log(persistedState.todos.length);
  let nextTodoId =  0;
export const addTodo = text => {
  return {
    type: 'ADD_TODO',
    id: genid(),
    text,
    no: nextTodoId++,
  };
}

export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
}

export const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
}

export const getCompletedTasks = () => {
  return {
    type: 'GET_COMPLETED_TASKS'
  };
}

export const handleTasks = () => {
  // return dispatch=>{
    return axios.post('api/users',persistedState);
  // }
}
