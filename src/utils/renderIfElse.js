const isFunction = input => typeof input === 'function';
const render = elementOrThunk => isFunction(elementOrThunk) ? elementOrThunk() : elementOrThunk;
export default predicate =>
  elementOrThunkIfTrue =>
    elementOrThunkIfFalse =>
      predicate ? render(elementOrThunkIfTrue) : render(elementOrThunkIfFalse);
