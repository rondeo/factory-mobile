import React, { useReducer } from 'react'

const initialState = {};
function reducer(state, action) {
    console.log('reducer', state, action)
    switch (action.type) {
        case 'login': return { ...state, user: action.data }
        default: return state;
    }
}

export const AppDataContext = React.createContext(null)

export default function AppData({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <AppDataContext.Provider value={{ state, dispatch }}>{children}</AppDataContext.Provider>
}