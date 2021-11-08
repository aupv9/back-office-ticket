import * as React from 'react';
import {
    BooleanInput,
    DateField,
    Edit,
    FormWithRedirect,
    Labeled,
    ReferenceField,
    SelectInput,
    TextField,
    Toolbar, useEditContext,
    useTranslate,ReferenceInput,AutocompleteInput,Loading
} from 'react-admin';
import {Link as RouterLink, Route} from 'react-router-dom';
import {
    Card,
    CardContent,
    Box,
    Grid,
    Typography,
    Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useEffect, useState} from "react";

import Basket from "./Basket";
import {MyOrderAside} from "./MyOrderAside";
import Totals from "./Totals";
import SeatTotals from "./SeatTotal";
import RichTextInput from "ra-input-rich-text";



const OrderTitle = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('My Order', {
                reference: record.id,
            })}
        </span>
    ) : null;
};

const CustomerDetails = ({ record }) => (
    <Box display="flex" flexDirection="column">
        <Typography
            component={RouterLink}
            color="primary"
            to={`/users/${record?.id}`}
            style={{ textDecoration: 'none' }}
        >
            {record?.fullName}
        </Typography>
        <Typography
            component={Link}
            color="primary"
            href={`mailto:${record?.email}`}
            style={{ textDecoration: 'none' }}
        >
            {record?.email}
        </Typography>
    </Box>
);

const ShowTimeDetail = ({ record }) => {
    return   (
        <Box>
            <Labeled source="theaterId"
                     resource="theaters" >
                <ReferenceField reference={"theaters"} source={"theaterId"}>
                    <TextField source={"name"}/>
                </ReferenceField>
            </Labeled>
            <Typography>
                <Labeled source="roomId"
                         resource="rooms" >
                    <ReferenceField reference={"rooms"} source={"roomId"}>
                        <TextField source={"name"}/>
                    </ReferenceField>
                </Labeled>
            </Typography>
            <Typography>
                <Labeled source="movieId"
                         resource="movies" >
                    <ReferenceField reference={"movies"} source={"movieId"}>
                        <TextField source={"name"}/>
                    </ReferenceField>
                </Labeled>
            </Typography>
            <Typography>
                    {
                        new Date(record["timeStart"]).toLocaleString()
                    }

            </Typography>

            {/*<Typography>{record?.address}</Typography>*/}
            {/*<Typography>*/}
            {/*    {record?.city}, {record?.stateAbbr} {record?.zipcode}*/}
            {/*</Typography>*/}
        </Box>
    );

}

const useEditStyles = makeStyles({
    root: { alignItems: 'flex-start' },
});



const Spacer = () => <Box m={1}>&nbsp;</Box>;

const OrderForm = (props) => {
    const translate = useTranslate();
    const {record,loaded} = useEditContext();
    const [isUser, setIsUser] = useState(false);

    const amountCallBack = (amount) =>{
        props.amountCallBack(amount);
    }

    const handleChangeIsUser = value =>{
        setIsUser(value);
    }
    useEffect(()=>{
        setIsUser(record.typeUser);
    },[record])

    return (
        <FormWithRedirect
            {...props}
            render={(formProps) => (
                <Box maxWidth="50em">
                    <Card  style={{borderRadius:"10px"}}>
                        <CardContent >
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={8}>
                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'Order'
                                        )}
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Labeled
                                                source="createdDate"
                                                resource="my-orders"
                                            >
                                                <DateField
                                                    source="createdDate"
                                                    resource="my-orders"
                                                    record={formProps.record}
                                                />
                                            </Labeled>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Labeled
                                                source="creation"
                                                resource="my-orders"
                                            >
                                                <ReferenceField reference={"users"} source={"creation"}>
                                                    <TextField source={"email"}/>
                                                </ReferenceField>
                                            </Labeled>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <SelectInput
                                                resource="my-orders"
                                                source="status"
                                                choices={[
                                                    {
                                                        id: 'non_payment',
                                                        name: 'None Payment',
                                                    },
                                                    {
                                                        id: 'ordered',
                                                        name: 'Ordered',
                                                    },
                                                    {
                                                        id: 'payment',
                                                        name: 'Payment',
                                                    },
                                                    {
                                                        id: 'cancelled',
                                                        name: 'Cancelled',
                                                    },
                                                    {
                                                        id: 'edit',
                                                        name: 'Edit'
                                                    },
                                                ]}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Box mt={2}>
                                                <BooleanInput
                                                    row={true}
                                                    resource="my-orders"
                                                    source="typeUser"
                                                    label={"Is User"}
                                                    onChange={handleChangeIsUser}
                                                />
                                            </Box>
                                            <Box>

                                                {
                                                    isUser ?
                                                    <>
                                                        <ReferenceInput source={"userId"} reference={"users"} filter={{role:0}}>
                                                            <AutocompleteInput optionText={(choice => choice.id ? choice.email :"")}/>
                                                        </ReferenceInput>
                                                    </>
                                                        :null

                                                }
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>

                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'Information'
                                        )}
                                    </Typography>
                                    <ReferenceField
                                        source="showTimesDetailId"
                                        resource="showTimesDetails"
                                        reference="showTimesDetails"
                                        basePath="/showTimesDetails"
                                        record={formProps.record}
                                        link={false}
                                    >
                                        <ShowTimeDetail />
                                    </ReferenceField>
                                    <Spacer />

                                </Grid>
                            </Grid>
                            <Box>
                                <RichTextInput source={"note"} />
                            </Box>
                            <Spacer />

                            <Typography variant="h6" gutterBottom>
                                {translate('Concessions')}
                            </Typography>
                            <Box>
                                <Basket record={formProps.record} />
                            </Box>
                            <Spacer />
                            <Typography variant="h6" gutterBottom>
                                {translate('Seats')}
                            </Typography>
                            <Box>
                                {
                                    loaded ? <SeatTotals record={formProps.record} /> :
                                        <Loading />

                                }
                            </Box>
                            <Spacer />

                            <Typography variant="h6" gutterBottom>
                                {translate('Total')}
                            </Typography>
                            <Box>
                                {
                                    loaded ?  <Totals record={formProps.record} totalAmountCallBack={(amount) => amountCallBack(amount)}/>
                                        :<Loading />
                                }
                            </Box>
                        </CardContent>
                        <Toolbar
                            record={formProps.record}
                            basePath={formProps.basePath}
                            undoable={true}
                            invalid={formProps.invalid}
                            handleSubmit={formProps.handleSubmit}
                            saving={formProps.saving}
                            resource="commands"
                        />
                    </Card>
                </Box>
            )}
        />
    );
};


const OrderEdit = (props) => {
    const classes = useEditStyles();
    const [totalAmount,setTotalAmount] = useState(0);

    const amountCallBack = amount =>{
        setTotalAmount(amount);
    }
    console.log(props)
    return (
        <>
            <Edit
                title={<OrderTitle />}
                aside={<MyOrderAside amount={totalAmount}/>}
                classes={classes}
                {...props}
                component="div"
            >
                <OrderForm amountCallBack ={(amount) => amountCallBack(amount)}/>
            </Edit>
        </>
    );
};

export default OrderEdit;
