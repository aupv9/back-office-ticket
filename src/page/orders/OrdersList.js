import * as React from 'react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import {
    AutocompleteInput,
    BooleanField,
    Datagrid,
    DatagridProps,
    DateField,
    DateInput,
    Identifier,
    List,
    ListContextProvider,
    ListProps,
    NullableBooleanInput,
    NumberField,
    ReferenceInput,
    ReferenceField,
    SearchInput,
    TextField,
    TextInput,
    useGetList,
    useListContext, ChipField,
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

// import NbItemsField from './NbItemsField';
// import CustomerReferenceField from '../visitors/CustomerReferenceField';
// import AddressField from '../visitors/AddressField';
// import MobileGrid from './MobileGrid';

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
    { id: 'ordered', name: 'ordered' },
    { id: 'cancelled', name: 'cancelled' }
];


const useGetTotals = (filterValues) => {
    const { total: totalOrdered } = useGetList(
        'orders',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'ordered' }
    );
    const { total: totalCancelled } = useGetList(
        'orders',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'cancelled' }
    );
    return {
        ordered: totalOrdered,
        cancelled: totalCancelled,
    };
};

const TabbedDatagrid = (props) => {
    const listContext = useListContext();
    const { ids, filterValues, setFilters, displayedFilters } = listContext;
    const classes = useDatagridStyles();
    const isXSmall = useMediaQuery(theme =>
            theme.breakpoints.down('xs')
    );
    const [ordered, setOrdered] = useState([]);

    const [cancelled, setCancelled] = useState([]);
    const totals = useGetTotals(filterValues);

    useEffect(() => {
        if (ids && ids !== filterValues.status) {
            switch (filterValues.status) {
                case 'ordered':
                    setOrdered(ids);
                    break;
                case 'cancelled':
                    setCancelled(ids);
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
        filterValues.status === 'ordered'
            ? ordered
                : cancelled;

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
                    {filterValues.status === 'ordered' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: ordered }}
                        >
                            <Datagrid {...props} optimized rowClick="edit">
                                <DateField source="createDate" showTime />
                                <ChipField source="typeUser" />
                                <TextField source="note"/>
                                {/*<CustomerReferenceField />*/}
                                {/*<ReferenceField*/}
                                {/*    source="customer_id"*/}
                                {/*    reference="customers"*/}
                                {/*    link={false}*/}
                                {/*    label="resources.commands.fields.address"*/}
                                {/*>*/}
                                {/*    <AddressField />*/}
                                {/*</ReferenceField>*/}
                                {/*<NbItemsField />*/}

                                <NumberField
                                    source="tax"
                                    options={{
                                        style: 'currency',
                                        currency: 'VND',
                                    }}
                                    className={classes.total}
                                />
                                <NumberField
                                    source="total"
                                    options={{
                                        style: 'currency',
                                        currency: 'VND',
                                    }}
                                    className={classes.total}
                                />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                    {filterValues.status === 'cancelled' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: cancelled }}
                        >
                            <Datagrid {...props} rowClick="edit">
                                <DateField source="date" showTime />
                                <TextField source="reference" />
                                {/*<CustomerReferenceField />*/}
                                {/*<ReferenceField*/}
                                {/*    source="customer_id"*/}
                                {/*    reference="customers"*/}
                                {/*    link={false}*/}
                                {/*    label="resources.commands.fields.address"*/}
                                {/*>*/}
                                {/*    <AddressField />*/}
                                {/*</ReferenceField>*/}
                                {/*<NbItemsField />*/}
                                <NumberField
                                    source="total"
                                    options={{
                                        style: 'currency',
                                        currency: 'USD',
                                    }}
                                    className={classes.total}
                                />
                                <BooleanField source="returned" />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                </div>
            )}
        </Fragment>
    );
};

const OrderList = (props) => (
    <List
        {...props}
        filterDefaultValues={{ status: 'ordered' }}
        sort={{ field: 'create_date', order: 'DESC' }}
        perPage={25}
        filters={orderFilters}
        hasCreate={true}
    >
        <TabbedDatagrid />
    </List>
);

export default OrderList;
