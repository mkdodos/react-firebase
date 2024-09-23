export const detailReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const today = new Date().toISOString().substring(0, 10);
      return {
        ...state,
        open: true,
        row: { ...state.defaultRow, transDate: today },
      };
    case 'EDIT':
      const { row, index } = action.payload;
      return { ...state, open: true, row, rowIndex: index };

    case 'CHANGE':
      return {
        ...state,
        row: { ...state.row, [action.payload.name]: action.payload.value },
      };
    case 'CREATE':
      return {
        ...state,
        open: false,
        rowIndex: -1,
      };

    case 'UPDATE':
      return {
        ...state,
        open: false,
        // row: action.payload.row,
        rowIndex: -1,
      };

    case 'DELETE':
      return {
        ...state,
        open: false,
        rowIndex: -1,
      };

    case 'CLOSE':
      return { ...state, open: false };
  }
};
