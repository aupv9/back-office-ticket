import {
    List,
    Datagrid,
    TextField,
    EmailField,
    ReferenceField,
    DateField,
    ChipField,
    BooleanField, SearchInput, EditButton, AutocompleteInput, ReferenceInput, SingleFieldList, ReferenceArrayField
} from 'react-admin';
import * as React from "react";
import UserLinkField from "../user/UserLinkField";

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


export const EmployeeList = props => {


    return   (

        <List {...props}
              filter={{role_id:0,theater_id:0}}
              filters={usersFilters}
        >
            <Datagrid rowClick="show">
                <ReferenceField reference="users" source="userId" label="User Account">
                    <UserLinkField />
                </ReferenceField>
                <ReferenceField reference="users" source="userId" label="Email">
                    <EmailField source={"email"} />
                </ReferenceField>

                <ReferenceArrayField label="Roles" reference="roles" source="roleIds">
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
                <ReferenceField reference="users" source="createdBy" label="Created By">
                    <UserLinkField />
                </ReferenceField>
                <ReferenceField reference="theaters" source="theaterId" label="Theater">
                    <TextField source="name" />
                </ReferenceField>
                {/*<ReferenceField reference="employees" source="theaterId" label="Theater">*/}
                {/*    <TextField source="name" />*/}
                {/*</ReferenceField>*/}
                <DateField source="createdAt" showTime/>
                <DateField source="updatedAt" showTime/>
                <DateField source="startsAt" />
                <DateField source="endsAt"/>
                <ChipField source="status" />

                <EditButton />
            </Datagrid>
        </List>
    );
}


