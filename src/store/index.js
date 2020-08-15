import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import listsReducer from "./reducers/listsReducer";
import cardReducer from "./reducers/cardsReducer";
import boardReducer from "./reducers/boardsReducer";

const rootReducer = combineReducers({
  cards: cardReducer,
  lists: listsReducer,
  boards: boardReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => console.warn("cek state store", store.getState()));

export default store;
