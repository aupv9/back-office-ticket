import * as React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import {downloadCSV, useDataProvider, useTranslate} from 'react-admin';
import {format, subDays, addDays, startOfMonth} from 'date-fns';
import IconButton from "@material-ui/core/IconButton";
import {ArrowDownward} from "@material-ui/icons";
import jsonExport from 'jsonexport/dist';

const lastDay = new Date();
const lastMonthDays = Array.from({ length: 30 }, (_, i) => subDays(lastDay, i));
const aMonthAgo = subDays(new Date(), 30);

const dateFormatter = (date) =>
    new Date(date).toLocaleDateString();

const aggregateOrdersByDay = (orders) =>
    orders
    .filter((order) => order.status === 'payment' )
    .reduce((acc, curr) => {
        const createdDate = new Date(curr.createdDate);
        const day = format(createdDate, 'yyyy-MM-dd');
        if (!acc[day]) {
            acc[day] = 0;
        }
        acc[day] += curr.total;
        return acc;
    }, {});

const getRevenuePerDay = (orders) => {
    const daysWithRevenue = aggregateOrdersByDay(orders);
    return lastMonthDays.map(date => ({
        date: date.getTime(),
        total: daysWithRevenue[format(date, 'yyyy-MM-dd')] || 0,
    }));
};

const getExportRevenuePerDay = (orders) => {
    const daysWithRevenue = aggregateOrdersByDay(orders);
    return lastMonthDays.map(date => ({
        date: date,
        total: daysWithRevenue[format(date, 'yyyy-MM-dd')] || 0,
    }));
};

const OrderChart30Day = (props) => {

    const { orders ,role } = props;
    const translate = useTranslate();
    const dataProvider = useDataProvider();
    if (!orders) return null;
    const exportChart = () =>{
        const nameCSV = role === 1 ?  translate(`30 Day Revenue History All Theater`)  : role === 2 ?
            translate(`30 Day Revenue History`):
            translate(`30 Day Revenue History ${orders[0] && orders[0].theaterName}`);
        jsonExport(getExportRevenuePerDay(orders), {
            headers: ['date', 'total'],
        }, (err, csv) => {
            downloadCSV(csv, nameCSV);
        });
    }

    return (
        <Card>
            <CardHeader title={ role === 1 ?  translate(`30 Day Revenue History All Theater`)  : role === 2 ?
                        translate(`30 Day Revenue History `):
                        translate(`30 Day Revenue History ${orders[0] && orders[0].theaterName}`) }
                        action={
                            <div className={{display:"flex"}}>
                                <IconButton aria-label="settings"
                                            onClick={exportChart}
                                            title={"Export To CSV"}
                                >
                                    <ArrowDownward />
                                </IconButton>
                            </div>
                        }
            />
            <CardContent>
                <div style={{ width: '100%', height: 500 }}>
                    <ResponsiveContainer>
                        <AreaChart data={getRevenuePerDay(orders)}>
                            <defs>
                                <linearGradient
                                    id="colorUv"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#8884d8"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#8884d8"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="date"
                                name="Date"
                                type="number"
                                scale="time"
                                domain={[
                                    addDays(aMonthAgo, 1).getTime(),
                                    new Date().getTime(),
                                ]}
                                tickFormatter={dateFormatter}
                            />
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip
                                cursor={{ strokeDasharray: '3 3' }}
                                formatter={value =>
                                    new Intl.NumberFormat(undefined, {
                                        style: 'currency',
                                        currency: 'vnd',
                                    }).format(value)
                                }
                                labelFormatter={(label) =>
                                    dateFormatter(label)
                                }
                            />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#8884d8"
                                strokeWidth={2}
                                fill="url(#colorUv)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};


export default OrderChart30Day;




// const ordersByMonth = (orders) => {
//     return orders.reduce((acc, order) => {
//         const month = startOfMonth(new Date(order.createdDate)).toISOString();
//         if (!acc[month]) {
//             acc[month] = [];
//         }
//         acc[month].push(order);
//         return acc;
//     }, {});
// }
//
// const  amountByMonth = (orders) => {
//     return Object.keys(ordersByMonth(orders)).map(month => {
//         return {
//             date: format(new Date(month), 'MMM'),
//             pending: ordersByMonth[month]
//                 .filter((order) => order.status === 'non_payment')
//                 .reduce((acc, order) => {
//                     acc += order.total;
//                     return acc;
//                 }, 0),
//             payment: ordersByMonth[month]
//                 .filter(
//                     (order) => !['non_payment', 'cancelled'].includes(order.status)
//                 )
//                 .reduce((acc, order) => {
//                     acc += order.total;
//                     return acc;
//                 }, 0),
//             cancelled: ordersByMonth[month]
//                 .filter((order) => order.status === 'cancelled')
//                 .reduce((acc, order) => {
//                     acc += order.total;
//                     return acc;
//                 }, 0),
//
//         };
//     });
// }

