import * as React from 'react';
import classnames from 'classnames';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useRefresh, useTranslate} from 'react-admin';
import {useEffect, useState} from "react";


const useStyles = makeStyles({
    container: { minWidth: '35em' },
    rightAlignedCell: { textAlign: 'right' },
    boldCell: { fontWeight: 'bold' },
});

const Totals = (props) => {
    const { record,offer } = props;
    const classes = useStyles();
    const translate = useTranslate();
    const [totalSeats,setTotalSeats] = useState(0);
    const [totalConcessions,setTotalConcessions] = useState(0);
    const [tax,setTax] = useState(0);
    const [total,setTotal] = useState(0);
    const [discount,setDiscount] = useState( 0);
    const refresh = useRefresh();
    const calSeat = () => {
        return record["seats"] ? record["seats"].reduce(((previousValue, currentValue) => {
            return previousValue + currentValue["price"]
        }),0) : 0
    }

    const calConcession = () =>{
        return  record["concessions"] ? record["concessions"].reduce(((previousValue, currentValue) => {
            return previousValue + currentValue["price"] * currentValue["quantity"]
        }),0) : 0 ;
    }

    const percentage = (num, per) => {
        return (num/100) * per;
    }

    const calDiscount = () => {
        if(offer && offer.type === "Flat"){
            return offer["discountAmount"];
        }else if(offer && offer.type === "Percentage"){
            const total = totalSeats + totalConcessions;
            return  percentage(total,offer["percentage"]);
        }else
        return 0;
    }

    useEffect(() =>{
        setTotalSeats(calSeat());
        setTotalConcessions(calConcession());
        setTax(percentage(totalConcessions + totalSeats,10));
        setDiscount(calDiscount ? calDiscount : discount);
        setTotal(totalSeats + totalConcessions + tax - discount);
    },[record,totalSeats,totalConcessions,tax,discount]);

    useEffect(() =>{
        props.totalAmountCallBack(total);
    },[total])



    return (
        <Table className={classes.container}>
            <TableBody>
                <TableRow>
                    <TableCell>
                        {translate('Sum Seats')}
                    </TableCell>
                    <TableCell className={classes.rightAlignedCell}>
                        {totalSeats.toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        {translate('Concessions')}
                    </TableCell>
                    <TableCell className={classes.rightAlignedCell}>
                        {totalConcessions.toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        {translate('Tax')} (
                        {"10%".toLocaleString(undefined, {
                            style: 'percent',
                        })}
                        )
                    </TableCell>
                    <TableCell className={classes.rightAlignedCell}>
                        {tax.toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </TableCell>
                </TableRow>
                {
                    record["discountAmount"] ? (
                        <TableRow>
                            <TableCell>
                                {translate('Discount')}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {record["discountAmount"].toLocaleString(undefined, {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </TableCell>
                        </TableRow>
                    ) :(
                        <TableRow>
                            <TableCell>
                                {translate('Discount')}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {discount.toLocaleString(undefined, {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </TableCell>
                        </TableRow>
                    )
                }

                {
                    record["discountAmount"] ? (
                        <TableRow>
                            <TableCell className={classes.boldCell}>
                                {translate('Total')}
                            </TableCell>
                            <TableCell
                                className={classnames(
                                    classes.boldCell,
                                    classes.rightAlignedCell
                                )}
                            >
                                {(total - record["discountAmount"]).toLocaleString(undefined, {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </TableCell>
                        </TableRow>
                    ) : (
                        <TableRow>
                            <TableCell className={classes.boldCell}>
                                {translate('Total')}
                            </TableCell>
                            <TableCell
                                className={classnames(
                                    classes.boldCell,
                                    classes.rightAlignedCell
                                )}
                            >
                                {total.toLocaleString(undefined, {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </TableCell>
                        </TableRow>
                    )
                }

            </TableBody>
        </Table>
    );
};

export default Totals;
