import * as React from 'react';
import { forwardRef } from 'react';
import {AppBar, UserMenu, MenuItemLink, useTranslate, Logout, useLogout} from 'react-admin';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';
import Logo from "./Logo";
import {useGoogleLogout} from "react-google-login";
import {PowerInput, PowerOff, PowerSettingsNew} from "@material-ui/icons";


const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
});

const ConfigurationMenu = forwardRef((props, ref) => {
    const translate = useTranslate();
    return (
        <MenuItemLink
            ref={ref}
            to="/configuration"
            primaryText={translate('Configuration')}
            leftIcon={<SettingsIcon />}
            onClick={props.onClick}
            sidebarIsOpen
        />
    );
});

const clientId = '765454672866-ogngmccn89t4b7nkf24glnk87e3mn5e5.apps.googleusercontent.com';

const LogoutCustom = forwardRef((props,ref) =>{
    const logout = useLogout();
    const onFailure = (res) =>{

    };
    const onLogoutSuccess = (res) => {
        console.log('Logged out Success');
    };

    const { signOut} = useGoogleLogout({
        onFailure,
        clientId,
        onLogoutSuccess
    })
    const logoutHandle =() =>{
        signOut();
        logout().then(r => console.log(r));
    }
    return (
        <MenuItemLink
            ref={ref}
            to="/"
            primaryText={'Logout'}
            leftIcon={<PowerSettingsNew />}
            onClick={logoutHandle}
            sidebarIsOpen
        />
    );
});

const CustomUserMenu = (props) => {

    return(
        <UserMenu {...props}
                  logout={<LogoutCustom />}
        >
            <ConfigurationMenu />
        </UserMenu>
    );
}



const CustomAppBar = (props) => {
    const classes = useStyles();
    return (
        <AppBar {...props} elevation={1} userMenu={<CustomUserMenu />}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            {/*<Logo />*/}

            <span className={classes.spacer} />
        </AppBar>
    );
};

export default CustomAppBar;
