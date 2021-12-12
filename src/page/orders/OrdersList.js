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
    useListContext, ChipField, ReferenceField, useGetOne, EmailField,
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
    const { ids, filterValues, setFilters, displayedFilters } = listContext;
    const classes = useDatagridStyles();
    const isXSmall = useMediaQuery(theme =>
            theme.breakpoints.down('xs')
    );
    const [ordered, setOrdered] = useState([]);

    const [cancelled, setCancelled] = useState([]);

    const [nonePayment, setNonePayment] = useState([]);

    const [payment, setPayment] = useState([]);

    const totals = useGetTotals(filterValues);

    useEffect(() => {
        if (ids && ids !== filterValues.status) {
            switch (filterValues.status) {
                case 'cancelled':
                    setCancelled(ids);
                case 'non_payment':
                    setNonePayment(ids);
                case 'payment':
                    setPayment(ids);
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
         filterValues.status === 'cancelled' ?
                    cancelled : filterValues.status === 'nonePayment' ?
                        nonePayment : payment;

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
                    {filterValues.status === 'non_payment' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: nonePayment }}
                        >
                            <CustomizableDatagrid>
                                <DateField source="createdDate" showTime />
                                <DateField source="expirePayment" showTime />

                                <ReferenceField
                                    source="showTimesDetailId"
                                    reference="showTimesDetails"
                                    label="Show Time"
                                >
                                    <TextField source={"id"}/>
                                </ReferenceField>

                                <ReferenceField
                                    source="creation"
                                    reference="users"
                                >
                                    <TextField source={"email"}/>
                                </ReferenceField>

                                {

                                }
                                <UserDetail />
                                <BooleanField source={"profile"} label={"Is User"}/>
                                <TextField source={"note"} />
                                <ReferenceField
                                    source="id"
                                    reference="orders"
                                    label={"Total"}
                                >
                                    <NumberField
                                        source="totalAmount"
                                        options={{
                                            style: 'currency',
                                            currency: 'VND',
                                        }}
                                        className={classes.total}
                                    />
                                </ReferenceField>
                            </CustomizableDatagrid>
                        </ListContextProvider>
                    )}
                    {filterValues.status === 'payment' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: payment }}
                        >
                            <CustomizableDatagrid>
                                <DateField source="createdDate" showTime />

                                <ReferenceField
                                    source="showTimesDetailId"
                                    reference="showTimesDetails"
                                    label="Show Time"
                                >
                                    <TextField source={"id"}/>
                                </ReferenceField>

                                <ReferenceField
                                    source="creation"
                                    reference="users"
                                >
                                    <EmailField source={"email"}/>
                                </ReferenceField>

                                <UserDetail />
                                <BooleanField source={"profile"} label={"Is User"}/>
                                <TextField source={"note"} />
                                <NumberField
                                    source="total"
                                    options={{
                                        style: 'currency',
                                        currency: 'VND',
                                    }}
                                    className={classes.total}
                                />

                            </CustomizableDatagrid>
                        </ListContextProvider>
                    )}

                    {filterValues.status === 'cancelled' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: cancelled }}
                        >
                            <CustomizableDatagrid>
                                <DateField source="createdDate" showTime />
                                <ReferenceField
                                    source="showTimesDetailId"
                                    reference="showTimesDetails"
                                    label="Show Time"
                                >
                                    <TextField source={"id"}/>
                                </ReferenceField>

                                <ReferenceField
                                    source="creation"
                                    reference="users"
                                >
                                    <TextField source={"email"}/>
                                </ReferenceField>

                                <UserDetail />
                                <BooleanField source={"profile"} label={"Is User"}/>
                                <TextField source={"note"} />
                                <NumberField
                                    source="total"
                                    options={{
                                        style: 'currency',
                                        currency: 'VND',
                                    }}
                                    className={classes.total}
                                />
                                {/*<ReferenceField*/}
                                {/*    source="id"*/}
                                {/*    reference="orders"*/}
                                {/*    label={"Total"}*/}
                                {/*>*/}
                                {/*    <NumberField*/}
                                {/*        source="totalAmount"*/}
                                {/*        options={{*/}
                                {/*            style: 'currency',*/}
                                {/*            currency: 'VND',*/}
                                {/*        }}*/}
                                {/*        className={classes.total}*/}
                                {/*    />*/}
                                {/*</ReferenceField>*/}
                            </CustomizableDatagrid>
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
        filters={orderFilters}
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
