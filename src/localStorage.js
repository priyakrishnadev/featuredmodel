export const loadState=()=>{
  try{
    const serializedState=localStorage.getItem('productComments');
    if(serializedState === null){
      return undefined;
    }
    return JSON.parse(serializedState);
  }
  catch(err){
    return undefined;
  }
};

export const saveState=(key,state)=>{
  try{
    const serializedState = JSON.stringify(state);
    // localStorage.setItem('productComments',serializedState);
    localStorage.setItem(key,serializedState);
  }
  catch(err){
  }
};
