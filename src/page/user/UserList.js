import {List, Datagrid, TextField, EmailField, ReferenceField} from 'react-admin';



export const UserList = props => (
    <List {...props}
          filter={{role:0}}>
        <Datagrid rowClick="edit">
            <EmailField source="email" />
            <TextField source="fullName" />
            {/*<ReferenceField reference="roles" source="">*/}
            {/*    */}
            {/*</ReferenceField>*/}

        </Datagrid>
    </List>
);
