
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DARK_THEME, LIGHT_THEME } from './types';

export const darkTheme = () => {
    AsyncStorage.setItem('DARK_THEME', 'false');
    let dark = {
        background: '#373737',
        textDark: '#eee',
        primary: '#eee',
        secondary: '#000',
        textLight: '#eee',
        price: '#eee',
        white: '#fff',
        black: '#000',
        theme: '#373737',
        secondTheme:'#4f4f4f',
        textTheme:'#eee',
        black_white:'#000'
    }
    return (dispatch) => {
        dispatch({
            type: DARK_THEME,
            data: dark
        })


    }
}
export const lightTheme = () => {
    AsyncStorage.setItem('DARK_THEME', 'true');
    let light = {
        background: '#eeae',
        textDark: '#313234',
        primary: '#F26C68',
        secondary: '#F26C68',
        textLight: '#919191',
        price: '#E4723C',
        white: '#fff',
        black: '#000',
        theme: '#fff',
        secondTheme:'#d7d7d7',
        textTheme:'#3d3e40',
        black_white:'#e4e4e4f5'
    }
    return (dispatch) => {
        dispatch({
            type: LIGHT_THEME,
            data: light
        })


    }
}



