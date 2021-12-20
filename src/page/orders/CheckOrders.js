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
    NumberField,
    ReferenceInput,
    SearchInput,
    TextField,
    TextInput,
    useGetList,
    useListContext,
    ChipField,
    ReferenceField,
    useGetOne,
    EmailField,
    TopToolbar,
    FilterButton,
    CreateButton,
    ExportButton,
} from 'react-admin';
import {useMediaQuery, Divider, Tabs, Tab, Typography} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import NumberFormat from "react-number-format";
import CustomizableDatagrid from 'ra-customizable-datagrid';

const orderFilters = [
    <SearchInput source="q" alwaysOn />,
    // <ReferenceInput source="customer_id" reference="customers">
    //     <AutocompleteInput
    //         optionText={(choice) =>
    //             choice.id // the empty choice is { id: '' }
    //                 ? `${choice.first_name} ${choice.last_name}`
    //                 : ''
    //         }
    //     />
    // </ReferenceInput>,
    // <DateInput source="created_" />,
    // <DateInput source="date_lte" />,
    // <TextInput source="total_gte" />,
    // <NullableBooleanInput source="returned" />,
];

const useDatagridStyles = makeStyles({
    total: { fontWeight: 'bold' },
});

const tabs = [
    { id: 'non_payment', name: 'None Payment' },
    { id: 'payment', name: 'payment' },
    { id: 'cancelled', name: 'cancelled' }

];


const useGetTotals = (filterValues) => {
    const { total: totalPayment,loaded : loadedTotalPayment } = useGetList(
        'orders',
        { perPage: 1, page: 25 },
        { field: 'createdDate', order: 'DESC' },
        { ...filterValues, status: 'payment' }
    );
    const { total: totalCancelled ,loaded : loadedTotalCancelled} = useGetList(
        'orders',
        { perPage: 1, page: 25 },
        { field: 'createdDate', order: 'DESC' },
        { ...filterValues, status: 'cancelled' }
    );
    const { total: totalNonePayment ,loaded : loadedTotalNonePayment} = useGetList(
        'orders',
        { perPage: 1, page: 25 },
        { field: 'createdDate', order: 'DESC' },
        { ...filterValues, status: 'non_payment' }
    );



    return {
        cancelled: totalCancelled,
        nonePayment:totalNonePayment,
        payment:totalPayment
    };
};

const TabbedDatagrid = (props) => {
    const listContext = useListContext();


};

const ListActions = (props) => (
    <TopToolbar>
        <FilterButton/>
        <ExportButton/>
    </TopToolbar>
);

const OrderList = (props) => (
    <List
        {...props}
        filters={orderFilters}
        actions={<ListActions />}
    >
        <TabbedDatagrid />
    </List>
);

const UserDetail = ({record}) =>{
    if(!record) return null;
    return record.profile ? (
        <ReferenceField reference={"users"} source={"userId"}>
            <TextField source={"email"}/>
        </ReferenceField>
    ) :(
        <Typography>
            {""}
        </Typography>
    )
}




export default OrderList;
