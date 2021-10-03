import { List, Datagrid, TextField, EmailField , UrlField} from 'react-admin';



export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <TextField source="website" />
            <TextField source="company.name" />
            <UrlField source="website" />
        </Datagrid>
    </List>
);
