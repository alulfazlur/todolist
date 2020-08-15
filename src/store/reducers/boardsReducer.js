import { CONSTANTS } from "../actions";

const initialState = {
    lists: ["list-0", "list-1"]
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST: {
      const { id } = action.payload;
      const newListID = `list-${id}`;
      const newLists = [...state.lists, newListID];
      return { ...state, lists: newLists };
    }

    case CONSTANTS.DRAG_HAPPENED: {
      const lists = state.lists;
      const {
        droppableIndexEnd,
        droppableIndexStart,

        type
      } = action.payload;

      // draggin lists around
      if (type === "list") {
        const pulledOutList = lists.splice(droppableIndexStart, 1);
        lists.splice(droppableIndexEnd, 0, ...pulledOutList);
        state.lists = lists;

        return { ...state, [lists]: lists };
      }
      return state;
    }
    case CONSTANTS.DELETE_LIST: {
      const { listID } = action.payload;
      const lists = state.lists;
      const newLists = lists.filter(id => id !== listID);
      state.lists = newLists;
      return { ...state, lists };
    }

    default:
      return state;
  }
};

export default boardsReducer;
