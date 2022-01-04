import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import { Card, CardContent, CardHeader} from '@material-ui/core';
import {
    downloadCSV, useDataProvider,
    usePermissions,
    useTranslate, useVersion,
} from 'react-admin';
import {startOfMonth, format, subDays, getYear} from 'date-fns';
import { ResponsiveBar } from '@nivo/bar';
import * as _ from "lodash";
import jsonExport from 'jsonexport/dist';
import IconButton from "@material-ui/core/IconButton";
import {ArrowDownward} from "@material-ui/icons";
import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar,Tooltip} from "recharts";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";


const multiplier = {
    opportunity: 0.2,
    'proposal-sent': 0.5,
    'in-negociation': 0.8,
    delayed: 0.3,
};


export const DivRevenueChart = (props) => {
    const { role } = props;
    const { permissions } = usePermissions();
    const [arrPermission,setArrPermission] = useState([]);
    const translate = useTranslate();
    const [selectedDate, handleDateChange] = useState(new Date());
    const [orders,setOrders] = useState([]);
    const dataProvider = useDataProvider();
    const version = useVersion();


    const fetchOrder = useCallback(async () => {
        const { data: orders } = await dataProvider.getList(
            'orders-room',
            {
                filter: {
                    year:getYear(selectedDate).toString()
                } ,
                sort: { field: 'id', order: 'DESC' },
                pagination: { page: 1, perPage: 1000000 },
            }
        );
        setOrders(orders)
    },[dataProvider,selectedDate]);

    useEffect(() =>{
        fetchOrder().then(r => console.log(r));
    },[selectedDate,version]);
    const exportChart = () => {
        const nameCSV = role === 1 ?  translate(`Revenue History This Year All Theater`)  : role === 2 ?
            translate(`Revenue History This Year`):
            translate(`Revenue History This Year ${orders[0] && orders[0].theaterName}`);
        jsonExport(months, {
            headers: ['date', 'pending','payment','cancelled'],
        }, (err, csv) => {
            downloadCSV(csv, nameCSV);
        });
    }
    const isHavePermission = (permission) =>{
        return _.includes(arrPermission,permission);
    }
    useEffect(() =>{
        setArrPermission(permissions);
    },[permissions])

    const [months, setMonths] = useState([]);

    useEffect(() => {

        const ordersByMonth = orders.reduce((acc, order) => {
            const month = startOfMonth(new Date(order.createdDate)).toISOString();
            if (!acc[month]) {
                acc[month] = [];
            }
            acc[month].push(order);
            return acc;
        }, {});

        const amountByMonth = Object.keys(ordersByMonth).map(month => {
            return {
                date: format(new Date(month), 'MMM'),
                ticket: ordersByMonth[month]
                    .filter((order) => order.status === 'payment')
                    .reduce((acc, order) => {
                        acc += order["totalSeats"];
                        return acc;
                    }, 0),
                concession: ordersByMonth[month]
                    .filter((order) => order.status === 'payment')
                    .reduce((acc, order) => {
                        acc += order["totalConcessions"];
                        return acc;
                    }, 0)
            };
        });
        setMonths(amountByMonth);

    }, [orders]);

    const range = months.reduce(
        (acc, month) => {
            acc.min = Math.min(acc.min, month.cancelled);
            acc.max = Math.max(acc.max, month.payment + month.pending);
            return acc;
        },
        { min: 0, max: 0 }
    );

    return (
        <Card>
            <CardHeader title={ role === 1 ?  translate(`Revenue  History Ticket And Concession     This Year All Theater`)  : translate(`Revenue History Ticket And Concession This Year ${orders[0] && orders[0].theaterName}`) }
                        action={
                            <>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        autoOk
                                        variant="inline"
                                        inputVariant="outlined"
                                        label="Year"
                                        format="yyyy"
                                        views={["year"]}
                                        value={selectedDate}
                                        InputAdornmentProps={{ position: "end" }}
                                        onChange={date => handleDateChange(date)}
                                    />
                                </MuiPickersUtilsProvider>
                                <IconButton aria-label="settings"
                                            onClick={exportChart}
                                            title={"Export To CSV"}
                                >
                                    <ArrowDownward />
                                </IconButton>
                            </>

                        }

            />
            <CardContent>
                <div style={{ width: '100%', height: 500 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={months}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="ticket" fill="#8884d8" stackId={"a"}/>
                            <Bar dataKey="concession" fill="#82ca9d" stackId={"a"}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

    );
};
