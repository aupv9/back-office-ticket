import * as React from 'react';
import { Layout } from 'react-admin';
import AppBar from './AppBar';
import Menu from './Menu';

export default (props) => {
    // const theme = useSelector((state) =>
    //     state.theme === 'dark' ? darkTheme : lightTheme
    // );
    return <Layout {...props} appBar={AppBar} menu={Menu}  />;



};
