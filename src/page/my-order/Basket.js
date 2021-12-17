import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, FieldProps, useTranslate, useQueryWithStore } from 'react-admin';


const useStyles = makeStyles({
    rightAlignedCell: { textAlign: 'right' },
    centerAlignedCell:{textAlign:'center'},
    leftAlignedCell:{textAlign:'left'}

});

const Basket = (props) => {
    const { record } = props;
    console.log(record)
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
                    <TableCell className={classes.rightAlignedCell}>
                        {translate(
                            'Unit Price'
                        )}
                    </TableCell>
                    <TableCell className={classes.rightAlignedCell}>
                        {translate('Quantity')}
                    </TableCell>
                    <TableCell className={classes.rightAlignedCell}>
                        {translate('Total')}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    record.concessions && record.concessions.map(
                        (item) =>
                            item["concessionId"] && (
                                <TableRow key={item.concessionId}>
                                    <TableCell className={classes.leftAlignedCell}>
                                        <Link to={`/concessions/${item.concessionId}`}>
                                            {
                                                item["name"]
                                            }
                                        </Link>
                                    </TableCell>
                                    <TableCell className={classes.rightAlignedCell}>
                                        {item["price"].toLocaleString(undefined, {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </TableCell>
                                    <TableCell className={classes.rightAlignedCell}>
                                        {item.quantity}
                                    </TableCell>
                                    <TableCell className={classes.rightAlignedCell}>
                                        {(
                                            item.price *
                                            item.quantity
                                        ).toLocaleString(undefined, {
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

export default Basket;
