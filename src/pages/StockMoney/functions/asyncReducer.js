import { useState } from 'react';

// 此函數為參考網路,功能為讓 reducer 可以處理 async function
export default function useAsyncReducer(reducer, initState) {
  const [state, setState] = useState(initState),
    dispatchState = async (action) => setState(await reducer(state, action));
  return [state, dispatchState];
}
