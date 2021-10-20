import {
    List,
    Datagrid,
    TextField,
    EmailField,
    ReferenceField,
    DateField,
    ChipField,
    BooleanField,
    ReferenceManyField,SingleFieldList
} from 'react-admin';



export const UserList = props => (
    <List {...props}
          filter={{role:0}}>
        <Datagrid rowClick="edit">
            <EmailField source="email" />
            <TextField source="fullName" />
            <TextField source="address"/>
            <TextField source="state"/>
            <TextField source="city"/>
            <DateField source="registeredAt"/>
            <ReferenceField reference="users" source="createdBy" >
                <TextField source="fullName"/>
            </ReferenceField>
            <DateField source="lastLogin"/>
            <BooleanField  source="currentLogged" />
            {/*<ReferenceManyField reference="roles" target="roleId">*/}
            {/*    <SingleFieldList>*/}
            {/*        <ChipField source="name" />*/}
            {/*    </SingleFieldList>*/}
            {/*</ReferenceManyField>*/}

        </Datagrid>
    </List>
);
