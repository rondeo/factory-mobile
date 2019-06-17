import React, { useReducer } from 'react'

const initialState = { user: {id: -1} }
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
    return <AppDataContext.Provider value={{ appState: state, appDispatch: dispatch }}>{children}</AppDataContext.Provider>
}