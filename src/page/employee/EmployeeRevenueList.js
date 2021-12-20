import {
    List,
    Datagrid,
    TextField,
    EmailField,
    ReferenceField,
    DateField,
    ChipField,
    BooleanField,
    SearchInput,
    EditButton,
    AutocompleteInput,
    ReferenceInput,
    SingleFieldList,
    ReferenceArrayField,
    NumberField,DateInput
} from 'react-admin';
import * as React from "react";
import UserLinkField from "../user/UserLinkField";
import {format} from "date-fns";

const usersFilters = [
    // <SearchInput source="q" alwaysOn />,
    // <ReferenceInput source="createBy" reference="users" filter={{role:0}}>
    //     <AutocompleteInput
    //         optionText={(choice) =>
    //             choice.id ? `${choice.fullName}` : ''
    //         }
    //     />
    // </ReferenceInput>,
    <DateInput source={"date"}/>
];


export const EmployeeRevenueList = props => {


    return   (

        <List {...props}
              filters={usersFilters}
              filterDefaultValues={{date:format(new Date(),"yyyy-MM-dd") }}
              bulkActionButtons={false}
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
                <DateField source="createdAt" showTime/>
                {/*<DateField source="updatedAt" showTime/>*/}
                <DateField source="startsAt" />
                <DateField source="endsAt"/>
                <ChipField source="status" />
                <NumberField
                    source="revenue"
                    options={{
                        style: 'currency',
                        currency: 'VND',
                    }}
                    label={"Revenue"}
                />
            </Datagrid>
        </List>
    );
}


