import { combineReducers } from "redux";
import listsReducer from "./listsReducer";
import cardsReducer from "./cardsReducer";
import boardsReducer from "./boardsReducer";

export default combineReducers({
  lists: listsReducer,
  cards: cardsReducer,
  boards: boardsReducer,
});
