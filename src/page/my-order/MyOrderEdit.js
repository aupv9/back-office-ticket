import * as React from 'react';
import {
    DateInput,
    Edit,
    NullableBooleanInput,
    TextInput,
    PasswordInput,
    Toolbar,
    useTranslate,
    FormWithRedirect,
    required,
    email,SelectInput, ReferenceField,ReferenceInput
} from 'react-admin';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

import FullNameField from "../room/TheaterNameField";


const MyOrderEdit = (props) => {
    return (
        <Edit
            title={<VisitorTitle />}
            // aside={<Aside />}
            component="div"
            {...props}
        >
            <UserForm />
        </Edit>
    );
};

const VisitorTitle = ({ record }) => record ? <FullNameField record={record} size="32" /> : null;

const UserForm = (props ) => {
    const translate = useTranslate();
    return (
        <FormWithRedirect
            {...props}
            // validate={validatePasswords}
            render={(formProps) => (
                <Card>
                    <form>
                        <CardContent>
                            <Box display={{ md: 'block', lg: 'flex' }}>
                                <Box flex={2} mr={{ md: 0, lg: '1em' }}>
                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'Identity'
                                        )}
                                    </Typography>
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                source="firstName"
                                                resource="users"
                                                // validate={requiredValidate}
                                                fullWidth
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                                            ml={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                source="lastName"
                                                resource="users"
                                                // validate={requiredValidate}
                                                fullWidth
                                            />
                                        </Box>
                                    </Box>
                                    <TextInput
                                        type="email"
                                        source="email"
                                        resource="users"
                                        validate={[email(), required()]}
                                        fullWidth
                                    />
                                    <Box mt="1em" />

                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'Address'
                                        )}
                                    </Typography>
                                    <TextInput
                                        source="address"
                                        resource="users"
                                        multiline
                                        fullWidth
                                        helperText={false}
                                    />
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                source="city"
                                                resource="users"
                                                fullWidth
                                                helperText={false}
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                source="state"
                                                resource="users"
                                                fullWidth
                                                helperText={false}
                                            />
                                        </Box>

                                    </Box>

                                    <Box mt="1em" />

                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'Change Password'
                                        )}
                                    </Typography>
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <PasswordInput
                                                source="password"
                                                resource="users"
                                                fullWidth
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                                            ml={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <PasswordInput
                                                source="confirm_password"
                                                resource="users"
                                                fullWidth
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                        <Toolbar
                            record={formProps.record}
                            basePath={formProps.basePath}
                            undoable={true}
                            invalid={formProps.invalid}
                            handleSubmit={formProps.handleSubmit}
                            saving={formProps.saving}
                            resource="my-orders"
                        />
                    </form>
                </Card>
            )}
        />
    );
};



const requiredValidate = [required()];

export default MyOrderEdit;
