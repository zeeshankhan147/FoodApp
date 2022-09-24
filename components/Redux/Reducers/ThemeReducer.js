import { DARK_THEME, LIGHT_THEME } from "../Actions/types"

const INIT_STATE = {
    currentTheme: {},
}

export default function theme(state = INIT_STATE, action) {
    switch (action.type) {
        case DARK_THEME: {
            return {
                ...state,
                currentTheme: action.data,
            }
        }
        case LIGHT_THEME: {
            return {
                ...state,
                currentTheme: action.data,
            }
        }


        default:
            return state
    }
}