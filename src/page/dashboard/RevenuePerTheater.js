import * as React from 'react';
import {
    Avatar,
    Box,
    Button, Card, CardContent, CardHeader, Chip,
    List,
    ListItem,
    ListItemAvatar, ListItemSecondaryAction,
    ListItemText, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useTranslate, useQueryWithStore, ReferenceField, useGetList} from 'react-admin';

import {ResponsivePieCanvas} from "@nivo/pie";
import {format, isToday} from "date-fns";
import {useEffect, useState} from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


const RevenuePerTheater = () => {
    const translate = useTranslate();
    const classes = useStyles();
    const {data,ids} = useGetList("theaters", { page: 1, perPage: 10000 });
    const [selectedDate, handleDateChange] = useState(new Date());
    const {data:dataOrder,ids:dataOrderIds,loaded} = useGetList("order-dashboard", {},{},{
        date:format(selectedDate,"yyyy-MM-dd")
    });
    const [theaters,setTheater] = useState([]);
    const [orders,setOrders] = useState([]);

    const [dataChart,setDataChart] = useState([]);



    useEffect(() =>{
        const theaters = ids.map(id => data[id]);
        const orders = dataOrderIds.map(id =>  dataOrder[id]);
        setOrders(orders);
        setTheater(theaters);

        const aggregateOrdersByTheaters= (orders) =>
            orders
                .filter((order) =>  order.status === 'payment')
                .reduce((acc, curr) => {
                    const room = curr["theaterName"];
                    if (!acc[room]) {
                        acc[room] = 0;
                    }
                    acc[room] += curr.total;
                    return acc;
                }, {});

        const getRevenuePerTheater = (orders) => {
            const theatersWithRevenue = aggregateOrdersByTheaters(orders);
            return theaters.map(theater => ({
                id: theater["name"],
                label:theater["name"],
                value: theatersWithRevenue[theater["name"]] || 0

            }));
        };
        setDataChart(getRevenuePerTheater(orders));
    },[ids,data,dataOrder,dataOrderIds]);


    return (
        <Card>
            <CardHeader title={translate('pos.dashboard.revenue_theater')}
                        action={
                            <>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        autoOk
                                        variant="inline"
                                        inputVariant="outlined"
                                        label="Date"
                                        format="yyyy-MM-dd"
                                        value={selectedDate}
                                        InputAdornmentProps={{ position: "end" }}
                                        onChange={date => handleDateChange(date)}
                                    />
                                </MuiPickersUtilsProvider>
                            </>
                        }
            />
            <CardContent>
                <div style={{ width: '100%', height: 500 }}>
                    <ResponsivePieCanvas
                        data={dataChart}
                        valueFormat=" >-0,~r"
                        margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        colors={{ scheme: 'paired' }}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.6 ] ] }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor="#333333"
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'ruby'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'c'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'go'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'python'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'scala'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'lisp'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'elixir'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'javascript'
                                },
                                id: 'lines'
                            }
                        ]}
                        legends={[
                            {
                                anchor: 'right',
                                direction: 'column',
                                justify: false,
                                translateX: 140,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 60,
                                itemHeight: 14,
                                itemTextColor: '#999',
                                itemDirection: 'left-to-right',
                                itemOpacity: 1,
                                symbolSize: 14,
                                symbolShape: 'circle'
                            }
                        ]}
                     />
                </div>
            </CardContent>
        </Card>
    );
};

const useStyles = makeStyles(theme => ({
    link: {
        borderRadius: 0,
    },
    linkContent: {
        color: theme.palette.primary.main,
    },
}));

export default RevenuePerTheater;
