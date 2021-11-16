import * as React from 'react';
import { Layout } from 'react-admin';
import AppBar from './AppBar';
import Menu from './Menu';
import {useSelector} from "react-redux";
import { darkTheme, lightTheme } from './themes';

export default (props) => {
    // const theme = useSelector((state) =>
    //     state.theme === 'dark' ? darkTheme : lightTheme
    // );
    return <Layout {...props} appBar={AppBar} menu={Menu}  />;



};
