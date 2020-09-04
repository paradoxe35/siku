import { EVENT_VALUE } from "./vars";
import { createContext } from "react";

export const EventContext = createContext({
    ...EVENT_VALUE,
    updateEvent: (event) => null
})
