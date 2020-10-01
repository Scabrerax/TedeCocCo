import { useReducer } from "react";

const reducer = (oldState = {}, currentState = {}) => ({
  ...oldState,
  ...currentState,
});

export const useSetState = (initialState = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setState = (newState) => dispatch(newState);

  return [state, setState];
};
