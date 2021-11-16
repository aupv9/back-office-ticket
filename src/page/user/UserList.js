// import {
//     List,
//     Datagrid,
//     TextField,
//     EmailField,
//     ReferenceField,
//     DateField,
//     ChipField,
//     BooleanField,
//     ReferenceManyField, SingleFieldList, SearchInput, EditButton, AutocompleteInput, ReferenceInput
// } from 'react-admin';
// import UserLinkField from "./UserLinkField";
// import * as React from "react";
//
// const usersFilters = [
//     <SearchInput source="q" alwaysOn />,
//     <ReferenceInput source="createBy" reference="users" filter={{role:0}}>
//         <AutocompleteInput
//             optionText={(choice) =>
//                 choice.id ? `${choice.fullName}` : ''
//             }
//         />
//     </ReferenceInput>,
// ];
//
//
// export const UserList = props => (
//     <List {...props}
//           filter={{role:0}}
//           filters={usersFilters}
//           >
//         <Datagrid rowClick="show">
//             <EmailField source="email" />
//             <TextField source="fullName" />
//             <TextField source="address"/>
//             <TextField source="state"/>
//             <TextField source="city"/>
//             <DateField source="registeredAt"/>
//             <UserLinkField />
//             <DateField source="lastLogin"/>
//             <BooleanField  source="currentLogged" />
//             <ReferenceField reference="roles" source="roleId">
//                 <ChipField source="code" />
//             </ReferenceField>
//
//             <ReferenceField reference="uas" source="uasId" label="Status">
//                 <ChipField source="name" />
//             </ReferenceField>
//             <EditButton />
//         </Datagrid>
//     </List>
// );

import * as React from 'react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import {
    AutocompleteInput,
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    List,
    ListContextProvider,
    NullableBooleanInput,
    ReferenceInput,
    ReferenceField,
    SearchInput,
    TextField,
    TextInput,
    useGetList,
    useListContext, ChipField, EmailField, EditButton, ReferenceManyField,SingleFieldList
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import UserLinkField from "./UserLinkField";


const orderFilters = [
    <SearchInput source="q" alwaysOn />,
    <ReferenceInput source="customer_id" reference="customers">
        <AutocompleteInput
            optionText={(choice) =>
                choice.id // the empty choice is { id: '' }
                    ? `${choice.first_name} ${choice.last_name}`
                    : ''
            }
        />
    </ReferenceInput>,
    <DateInput source="date_gte" />,
    <DateInput source="date_lte" />,
    <TextInput source="total_gte" />,
    <NullableBooleanInput source="returned" />,
];

const useDatagridStyles = makeStyles({
    total: { fontWeight: 'bold' },
});

const tabs = [
    { id: 'userRegister', name: 'User Register' },
    { id: 'userSocial', name: 'User Social' }
];


const useGetTotals = (filterValues) => {
    const { total: userRegister } = useGetList(
        'users',
        { perPage: 25, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues }
    );
    const { total: userSocial } = useGetList(
        'users',
        { perPage: 25, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues }
    );
    return {
        userRegister: userRegister,
        userSocial: userSocial,
    };
};

const TabbedDatagrid = (props) => {
    const listContext = useListContext();
    const { ids, filterValues, setFilters, displayedFilters } = listContext;
    const classes = useDatagridStyles();
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    );
    const [userRegister, setUserRegister] = useState([]);

    const [userSocial, setUserSocial] = useState([]);
    const totals = useGetTotals(filterValues);

    useEffect(() => {
        if (ids && ids !== filterValues.status) {
            switch (filterValues.status) {
                case 'userRegister':
                    setUserRegister(ids);
                    break;
                case 'userSocial':
                    setUserSocial(ids);
                    break;
            }
        }
    }, [ids, filterValues.status]);

    const handleChange = useCallback(
        (event, value) => {
            setFilters &&
            setFilters(
                { ...filterValues, status: value },
                displayedFilters
            );
        },
        [displayedFilters, filterValues, setFilters]
    );

    const selectedIds =
        filterValues.status === 'userRegister'
            ? userRegister
            : userSocial;

    return (
        <Fragment>
            <Tabs
                variant="fullWidth"
                centered
                value={filterValues.status}
                indicatorColor="primary"
                onChange={handleChange}
            >
                {tabs.map(choice => (
                    <Tab
                        key={choice.id}
                        label={
                            totals[choice.name]
                                ? `${choice.name} (${totals[choice.name]})`
                                : choice.name
                        }
                        value={choice.id}
                    />
                ))}
            </Tabs>
            <Divider />
            {isXSmall ? (
                <ListContextProvider
                    value={{ ...listContext, ids: selectedIds }}
                >
                    {/*<MobileGrid {...props} ids={selectedIds} />*/}
                </ListContextProvider>
            ) : (
                <div>
                    {filterValues.status === 'userRegister' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: userRegister }}
                        >
                            <Datagrid {...props} optimized rowClick="show">
                                <EmailField source="email" />
                                <TextField source="fullName" />
                                <TextField source="address"/>
                                <TextField source="state"/>
                                <TextField source="city"/>
                                <DateField source="registeredAt"/>

                                {/*<ReferenceField reference="users" source="createdBy">*/}
                                {/*    <TextField source="firstName" />*/}
                                {/*</ReferenceField>*/}
                                {/*<UserLinkField />*/}

                                <DateField source="lastLogin"/>
                                <BooleanField  source="currentLogged" />

                                <ReferenceManyField label="Role" reference="roles" target="roleIds">
                                    <SingleFieldList>
                                        <ChipField source="name" />
                                    </SingleFieldList>
                                </ReferenceManyField>

                                <ReferenceManyField reference="roles" source="roleIds">
                                    <ChipField source="code" />
                                </ReferenceManyField>

                                <ReferenceField reference="uas" source="uasId" label="Status">
                                    <ChipField source="name" />
                                </ReferenceField>
                                <EditButton />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                    {filterValues.status === 'userSocial' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: userSocial }}
                        >
                            <Datagrid {...props} rowClick="show">
                                <EmailField source="email" />
                                <TextField source="fullName" />
                                <DateField source="lastLogin"/>
                                <ReferenceField reference="roles" source="roleId">
                                    <ChipField source="code" />
                                </ReferenceField>
                                <BooleanField  source="currentLogged" />
                                <EditButton />

                            </Datagrid>
                        </ListContextProvider>
                    )}
                </div>
            )}
        </Fragment>
    );
};

const UserList = (props) => (
    <List
        {...props}
        filterDefaultValues={{ role:0 ,status:'userRegister'}}
        sort={{ field: 'id', order: 'DESC' }}
        perPage={25}
        filters={orderFilters}
        hasCreate={true}
    >
        <TabbedDatagrid />
    </List>
);

export default UserList;
