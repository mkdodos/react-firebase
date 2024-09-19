import { Flag } from 'semantic-ui-react';

export const detailReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { ...state, open: true };
    case 'EDIT':
      const { row, index } = action.payload;
      return { ...state, open: true, row, index };

    case 'CHANGE':
      return {
        ...state,
        row: { ...state.row, [action.payload.name]: action.payload.value },
      };

    case 'UPDATE':
      return {
        ...state,
        open: false,
        row: action.payload.row,
        index: -1,
      };
    case 'CLOSE':
      return { ...state, open: false };
  }
};
