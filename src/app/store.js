import userReducer from "../features/user/userSlice";
import chatReducer from "../features/user/chatSlice";

import { Iterable } from "immutable";
import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  isPlain,
} from "@reduxjs/toolkit";

const isSerializable = (value) => Iterable.isIterable(value) || isPlain(value);

const getEntries = (value) =>
  Iterable.isIterable(value) ? value.entries() : Object.entries(value);

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
  getEntries,
});
export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    middleware: [serializableMiddleware],
  },
});

// Augment middleware to consider Immutable.JS iterables serializable

// const store = configureStore({
//   reducer,
//   middleware: [serializableMiddleware],
// })
