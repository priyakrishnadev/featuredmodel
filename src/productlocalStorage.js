export const loadproductState=()=>{
  try{
    const serializedState=localStorage.getItem('products');
    if(serializedState === null){
      return undefined;
    }
    return JSON.parse(serializedState);
  }
  catch(err){
    return undefined;
  }
};

export const saveproductState=(state)=>{
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem('products',serializedState);
  }
  catch(err){
  }
};
