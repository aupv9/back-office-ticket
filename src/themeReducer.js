import {CHANGE_THEME} from "./page/configuration/actions";
import themes from '../src/page/theme'

const defaultTheme = () => {
    return (
        Object.keys(themes).find(
            (t) => themes[t].themeName === 'Dark'
        ) || 'DarkTheme'
    )
}

const themeReducer = (
    previousState = defaultTheme(),
    { type, payload }
) => {
    if (type === CHANGE_THEME) {
        return payload
    }
    return previousState
}
export default themeReducer;
