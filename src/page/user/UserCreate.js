import * as React from 'react';
import {
    Create, SimpleForm, TextInput, useTranslate, PasswordInput, required, email,
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const styles = {
    first_name: { display: 'inline-block' },
    last_name: { display: 'inline-block', marginLeft: 32 },
    email: { width: 544 },
    address: { maxWidth: 544 },
    zipcode: { display: 'inline-block' },
    city: { display: 'inline-block', marginLeft: 32 },
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    password: { display: 'inline-block' },
    confirm_password: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);

export const validatePasswords = ({password, confirm_password}) => {
    const errors = {};

    if (password && confirm_password && password !== confirm_password) {
        errors.confirm_password = [
            'Password Mismatch',
        ];
    }

    return errors;
};

export const UserCreate = (props) => {
    const classes = useStyles(props);

    return (
        <Create {...props}>
            <SimpleForm validate={validatePasswords}>
                <SectionTitle label="Identity" />
                <TextInput
                    autoFocus
                    source="firstName"
                    formClassName={classes.first_name}
                    validate={requiredValidate}
                />
                <TextInput
                    source="lastName"
                    formClassName={classes.last_name}
                    validate={requiredValidate}
                />
                <TextInput
                    type="email"
                    source="email"
                    validation={{ email: true }}
                    fullWidth
                    formClassName={classes.email}
                    validate={[required(), email()]}
                />
                <Separator />
                <SectionTitle label="Address" />
                <TextInput
                    source="address"
                    formClassName={classes.address}
                    multiline
                    fullWidth
                    helperText={false}
                />
                <TextInput
                    source="state"
                    formClassName={classes.zipcode}
                    helperText={false}
                />
                <TextInput
                    source="city"
                    formClassName={classes.city}
                    helperText={false}
                />
                <Separator />
                <SectionTitle label="Password" />
                <PasswordInput
                    source="password"
                    formClassName={classes.password}
                    validate={required()}
                />
                <PasswordInput
                    source="confirm_password"
                    formClassName={classes.confirm_password}
                    validate={required()}

                />
            </SimpleForm>
        </Create>
    );
};

const requiredValidate = [required()];

const SectionTitle = ({ label }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label)}
        </Typography>
    );
};

const Separator = () => <Box pt="1em" />;

