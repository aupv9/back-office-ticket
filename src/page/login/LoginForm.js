import * as React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import {
    Button,
    CardActions,
    CircularProgress,
    TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useTranslate, useLogin, useNotify, useSafeSetState, useRedirect} from 'react-admin';
import GoogleLogin, {useGoogleLogin} from "react-google-login";
import {refreshTokenSetup} from "./refreshTokenSetup";




const useStyles = makeStyles(
    (theme) => ({
        form: {
            padding: '0 1em 1em 1em',
        },
        input: {
            marginTop: '1em',
        },
        button: {
            width: '100%',
        },
        icon: {
            marginRight: theme.spacing(1),
        },
        btnForget:{
            width:"60%"
        },
        btnSocial:{
            width:'100px'
        }
    }),
    { name: 'RaLoginForm' }
);

const Input = ({
                   meta: { touched, error }, // eslint-disable-line react/prop-types
                   input: inputProps, // eslint-disable-line react/prop-types
                   ...props
               }) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />
);

const clientId = '765454672866-ogngmccn89t4b7nkf24glnk87e3mn5e5.apps.googleusercontent.com';

const LoginForm = (props) => {
    const { redirectTo } = props;
    const [loading, setLoading] = useSafeSetState(false);
    const login = useLogin();
    const translate = useTranslate();
    const notify = useNotify();
    const classes = useStyles(props);

    const validate = (values) => {
        const errors = { username: undefined, password: undefined };

        if (!values.username) {
            errors.username = translate('ra.validation.required');
        }
        if (!values.password) {
            errors.password = translate('ra.validation.required');
        }
        return errors;
    };


    const submit = values => {
        let valueParams = {...values,isSocial:false};
        setLoading(true);
        login(valueParams, redirectTo)
            .then(() => {
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                notify(
                    typeof error === 'string'
                        ? error
                        : typeof error === 'undefined' || !error.message
                            ? 'ra.auth.sign_in_error'
                            : error.message,
                    'warning',
                    {
                        _:
                            typeof error === 'string'
                                ? error
                                : error && error.message
                                    ? error.message
                                    : undefined,
                    }
                );
            });
    };

    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj);
        refreshTokenSetup(res);
        login({isSocial:true,body:res.profileObj}).then(res =>{

            // localStorage.setItem("avatar",res.profileObj["imageUrl"]);
        }).catch((res) =>{
                notify("Invalid")
                console.log(res)
            }
        );
        return Promise.resolve()
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    };

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline'
    });

    return (
        <Form
            onSubmit={submit}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.form}>
                        <div className={classes.input}>
                            <Field
                                autoFocus
                                id="username"
                                name="username"
                                component={Input}
                                label={translate('ra.auth.username')}
                                disabled={loading}
                            />
                        </div>
                        <div className={classes.input}>
                            <Field
                                id="password"
                                name="password"
                                component={Input}
                                label={translate('ra.auth.password')}
                                type="password"
                                disabled={loading}
                                autoComplete="current-password"
                            />
                        </div>

                    </div>
                    <CardActions>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            disabled={loading}
                            className={classes.button}
                        >
                            {loading && (
                                <CircularProgress
                                    className={classes.icon}
                                    size={18}
                                    thickness={2}
                                />
                            )}
                            {translate('ra.auth.sign_in')}
                        </Button>
                    </CardActions>
                    <div>
                        <CardActions>



                            {/*<Button*/}
                            {/*    className={classes.button}*/}
                            {/*    variant="contained"*/}
                            {/*    type="button"*/}
                            {/*    color="primary"*/}
                            {/*    onClick={signIn}*/}
                            {/*    disabled={loading}*/}
                            {/*>*/}
                            {/*    {loading && (*/}
                            {/*        <CircularProgress*/}
                            {/*            className={classes.icon}*/}
                            {/*            size={18}*/}
                            {/*            thickness={2}*/}
                            {/*        />*/}
                            {/*    )}*/}
                            {/*    Login With Google*/}
                            {/*</Button>*/}

                            <GoogleLogin
                                clientId={clientId}
                                buttonText="Login"
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                            />
                        </CardActions>
                    </div>

                </form>
            )}
        />
    );
};




LoginForm.propTypes = {
    redirectTo: PropTypes.string,
};





export default LoginForm;



