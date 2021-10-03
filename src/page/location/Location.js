import { List, Datagrid, TextField, EditButton,ReferenceInput, TextInput,SelectInput } from 'react-admin';


const locationFilters = [
    <TextInput source="q" label="Search name" alwaysOn />,
    // <ReferenceInput source="userId" label="User" reference="users" allowEmpty>
    //     <SelectInput optionText="name" />
    // </ReferenceInput>,
];


export const Location = (props) =>{

    return (
        <List {...props} filters={locationFilters} >
            <Datagrid >
                {/*<TextField source="id" />*/}
                <TextField source="name" />
                <TextField source="zipcode" />
                <EditButton />
            </Datagrid>
        </List>
    );
}
