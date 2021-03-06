import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link, useGetOne, useTranslate} from 'react-admin';
import {useEffect, useState} from "react";


const useStyles = makeStyles({
    rightAlignedCell: { textAlign: 'right' },
    centerAlignedCell:{textAlign:'center'},
    leftAlignedCell:{textAlign:'left'}

});

const SeatTotals = (props) => {
    const { record, show } = props;
    const classes = useStyles();
    const translate = useTranslate();

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.leftAlignedCell}>
                        {translate(
                            'Name'
                        )}
                    </TableCell>
                    <TableCell className={classes.leftAlignedCell}>
                        {translate(
                            'Type'
                        )}
                    </TableCell>
                    <TableCell className={classes.rightAlignedCell}>
                        {translate(
                            'Price'
                        )}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    record.seats && record.seats.map(
                        (item) =>
                            item["seatId"] && (
                                <TableRow key={item.concessionId}>
                                    <TableCell className={classes.leftAlignedCell}>
                                            {
                                                item["tier"]
                                            }
                                            {
                                                item["numbers"]
                                            }
                                    </TableCell>
                                    <TableCell className={classes.leftAlignedCell}>
                                        {
                                            item["seatType"]
                                        }
                                    </TableCell>
                                    <TableCell className={classes.rightAlignedCell}>
                                        {show["price"].toLocaleString(undefined, {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </TableCell>

                                </TableRow>
                            )
                    )}
            </TableBody>
        </Table>
    );
};

export default SeatTotals;
