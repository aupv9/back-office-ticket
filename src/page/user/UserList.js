import {
    List,
    Datagrid,
    TextField,
    EmailField,
    ReferenceField,
    DateField,
    ChipField,
    BooleanField,
    ReferenceManyField, SingleFieldList, SearchInput, EditButton, AutocompleteInput, ReferenceInput
} from 'react-admin';
import UserLinkField from "./UserLinkField";
import * as React from "react";

const usersFilters = [
    <SearchInput source="q" alwaysOn />,
    <ReferenceInput source="createBy" reference="users" filter={{role:0}}>
        <AutocompleteInput
            optionText={(choice) =>
                choice.id ? `${choice.fullName}` : ''
            }
        />
    </ReferenceInput>,
];


export const UserList = props => (
    <List {...props}
          filter={{role:0}}
          filters={usersFilters}
          >
        <Datagrid rowClick="show">
            <EmailField source="email" />
            <TextField source="fullName" />
            <TextField source="address"/>
            <TextField source="state"/>
            <TextField source="city"/>
            <DateField source="registeredAt"/>
            <UserLinkField />
            <DateField source="lastLogin"/>
            <BooleanField  source="currentLogged" />
            <ReferenceField reference="roles" source="roleId">
                <ChipField source="code" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);
