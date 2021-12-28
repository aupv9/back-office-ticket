import * as React from 'react';
import {
    DateInput, Edit, Toolbar, useTranslate, FormWithRedirect, required,SelectInput,ReferenceInput,TextInput
} from 'react-admin';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

import FullNameField from "../room/TheaterNameField";
import {validatePasswords} from "../user/UserCreate";


const EmployeeEdit = (props) => {
    return (
        <Edit
            title={<VisitorTitle />}
            // aside={<Aside />}
            component="div"
            {...props}
        >
            <EmployeeForm />
        </Edit>
    );
};

const VisitorTitle = ({ record }) => record ? <FullNameField record={record} size="32" /> : null;

const EmployeeForm = (props ) => {
    const translate = useTranslate();
    return (
        <FormWithRedirect
            {...props}
            validate={validatePasswords}
            render={(formProps) => (
                <Card>
                    <form>
                        <CardContent>
                            <Box display={{ md: 'block', lg: 'flex' }}>
                                <Box flex={1} mr={{ md: 0, lg: '1em' }}>
                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'Information Employee'
                                        )}
                                    </Typography>

                                    <Box mt="1em" />
                                        <ReferenceInput
                                            source="theaterId"
                                            reference="theaters"
                                            validate={requiredValidate}
                                        >
                                            <SelectInput source="name" />
                                        </ReferenceInput>


                                    <Box mt="1em" />
                                    <Box mt="1em" />

                                       <DateInput source={"startsAt"} />


                                    <Box mt="1em" />
                                    <Box mt="1em" />

                                        <DateInput source={"endsAt"} />

                                    <Box mt="1em" />
                                </Box>
                                <Box
                                    flex={2}
                                    ml={{ xs: 0, lg: '1em' }}
                                    mt={{ xs: '1em', lg: 0 }}
                                >
                                   <TextInput source={"notes"}/>

                                    <Box mt="1em" />

                                        <SelectInput source="status" choices={[
                                            { id: 'New', name: 'New' },
                                            { id: 'Active', name: 'Active' },
                                            { id: 'Blocked', name: 'Blocked' },
                                        ]} />

                                    <Box mt="1em" />

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
                            resource="users"
                        />
                    </form>
                </Card>
            )}
        />
    );
};



const requiredValidate = [required()];

export default EmployeeEdit;
