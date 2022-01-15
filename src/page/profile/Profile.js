import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {useTranslate, useLocale, useSetLocale, Title, SimpleForm, useDataProvider, useVersion,FormWithRedirect,Edit} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Checkbox, FormControlLabel, Input, TextField} from "@material-ui/core";
import {useCallback, useEffect, useState} from "react";
import {getYear} from "date-fns";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles({
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
});


const Profile = ({ staticContext, ...props }) => {
    const translate = useTranslate();
    const locale = useLocale();
    const setLocale = useSetLocale();
    const classes = useStyles();
    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const version = useVersion();
    const dataProvider = useDataProvider();
    const [profile,setProfile] = useState();

    const fetchOrder = useCallback(async () => {
        const { data: profile } = await dataProvider.getOne(
            'profile',
            {
                id:0
            }
        );
        console.log(profile)
        setProfile(profile)
    },[dataProvider]);

    useEffect(() =>{
        fetchOrder().then(r => console.log(r));
    },[version]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };


    return (
       <>
           {
               profile &&
               <Box display={"flex"}>
                   <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
                       <Box display={"flex"}>
                           <TextField
                               margin="normal"
                               required
                               fullWidth
                               label="First Name"
                               name="firstName"
                               autoComplete="email"
                               autoFocus
                               value={profile.firstName}
                               style={{marginRight:10}}
                           />
                           <TextField
                               margin="normal"
                               required
                               fullWidth
                               label="Last Name"
                               name="lastName"
                               autoComplete="email"
                               autoFocus
                               value={profile.lastName}
                           />
                       </Box>

                       <TextField
                           margin="normal"
                           required
                           fullWidth
                           id="email"
                            label="Email"
                           name="email"
                           autoComplete="email"
                           autoFocus
                           value={profile.email}
                       />
                       <TextField
                           margin="normal"
                           required
                           fullWidth
                           name="password"
                           label="Password"
                           type="password"
                           id="password"
                           autoComplete="current-password"
                           value={profile.password}
                       />
                       <TextField
                           margin="normal"
                           required
                           fullWidth
                           label="Password"
                           type="password"
                           id="password"
                           autoComplete="current-password"
                           value={profile.password}
                       />
                       <Button
                           type="submit"
                           fullWidth
                           variant="contained"
                           sx={{ mt: 3, mb: 2 }}
                       >
                           Save
                       </Button>
                   </Box>
               </Box>
           }



           </>

    );

};

export default Profile;
