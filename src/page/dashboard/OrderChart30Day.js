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
import {downloadCSV, useDataProvider, useTranslate, useVersion} from 'react-admin';
import {format, subDays, addDays, startOfMonth, getYear} from 'date-fns';
import IconButton from "@material-ui/core/IconButton";
import {ArrowDownward, Print} from "@material-ui/icons";
import jsonExport from 'jsonexport/dist';
import ReactToPrint, {useReactToPrint} from "react-to-print";
import {useCallback, useEffect, useRef, useState} from "react";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";



const Spacer = () => <span style={{ margin:"0 5px" }} />;

const dateFormatter = (date) =>
    format(new Date(date),"dd-MM-yyyy");

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

const getRevenuePerDay = (lastMonthDays,orders) => {
    const daysWithRevenue = aggregateOrdersByDay(orders);
    return lastMonthDays.map(date => ({
        date: date.getTime(),
        total: daysWithRevenue[format(date, 'yyyy-MM-dd')] || 0,
    }));
};

const getExportRevenuePerDay = (lastMonthDays,orders) => {
    const daysWithRevenue = aggregateOrdersByDay(orders);
    return lastMonthDays.map(date => ({
        date: date,
        total: daysWithRevenue[format(date, 'yyyy-MM-dd')] || 0,
    }));
};
const countDay = (start,end) =>{
    return (end.getTime() - subDays(start,1).getTime()) / (1000 * 3600 * 24);
}
const OrderChart30Day = (props) => {
    const { role } = props;
    const componentRef = useRef(null);
    const translate = useTranslate();
    const dataProvider = useDataProvider();
    const [selectedStartDate, handleStartDateChange] = useState(subDays(new Date(),30));

    const [selectedEndDate, handleEndDateChange] = useState(new Date());

    const rangeDays = Array.from({ length: countDay(selectedStartDate,selectedEndDate) }, (_, i) => subDays(selectedEndDate, i  ));
    const aMonthAgo = subDays(selectedEndDate, countDay(selectedStartDate,selectedEndDate));
    const onBeforeGetContentResolve = useRef(null);

    const [loading, setLoading] = React.useState(false);
    const [text, setText] = React.useState("old boring text");
    const version = useVersion();

    const [orders,setOrders] = useState([]);
    const fetchOrder = useCallback(async () => {
        const { data: orders } = await dataProvider.getList(
            'orders-room',
            {
                filter: {
                    startDate:format(selectedStartDate,"yyyy-MM-dd"),
                    endDate:format(selectedEndDate,"yyyy-MM-dd")
                } ,
                sort: { field: 'id', order: 'DESC' },
                pagination: { page: 1, perPage: 1000000 },
            }
        );
        setOrders(orders)
    },[dataProvider,selectedStartDate,selectedEndDate]);

    useEffect(() =>{
        fetchOrder().then(r => console.log(r));
    },[selectedStartDate,selectedEndDate,version]);



    const handleAfterPrint = React.useCallback(() => {
        console.log("`onAfterPrint` called"); // tslint:disable-line no-console
    }, []);

    const handleBeforePrint = React.useCallback(() => {
        console.log("`onBeforePrint` called"); // tslint:disable-line no-console
    }, []);

    const handleOnBeforeGetContent = React.useCallback(() => {
        console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
        setLoading(true);
        setText("Loading new text...");

        return new Promise((resolve) => {
            onBeforeGetContentResolve.current = resolve;

            setTimeout(() => {
                setLoading(false);
                setText("New, Updated Text!");
                resolve();
            }, 2000);
        });
    }, [setLoading, setText]);

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: "AwesomeFileName",
        onBeforeGetContent: handleOnBeforeGetContent,
        onBeforePrint: handleBeforePrint,
        onAfterPrint: handleAfterPrint,
        removeAfterPrint: true
    });

    React.useEffect(() => {
        if (
            text === "New, Updated Text!" &&
            typeof onBeforeGetContentResolve.current === "function"
        ) {
            onBeforeGetContentResolve.current();
        }
    }, [onBeforeGetContentResolve.current, text]);

    const reactToPrintTrigger = React.useCallback(() => {
        return (
            <IconButton aria-label="settings"
                        onClick={exportChart}
                        title={"Export To CSV"}
            >
                <Print />
            </IconButton>);
    }, []);

    if (!orders) return null;
    const exportChart = () => {
        const nameCSV = role === 1 ?  translate(`pos.dashboard.rangeChartStaff`)  : role === 2 ?
            translate(`pos.dashboard.rangeChartManager`):
            translate(`pos.dashboard.rangeChartSenior` + orders[0] && orders[0].theaterName);
        jsonExport(getExportRevenuePerDay(orders), {
            headers: ['date', 'total'],
        }, (err, csv) => {
            downloadCSV(csv, nameCSV);
        });
    };


    return (
        <Card>
            <CardHeader title={ role === 1 ?  translate(`pos.dashboard.rangeChartStaff`)  : role === 2 ?
                        translate(`pos.dashboard.rangeChartSenior`):
                        translate(`pos.dashboard.rangeChartManager ${orders[0] && orders[0].theaterName || ""}`) }
                        action={
                            <div className={{display:"flex"}}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        autoOk
                                        variant="inline"
                                        inputVariant="outlined"
                                        label="Start Date"
                                        format="dd-MM-yyyy"
                                        value={selectedStartDate}
                                        InputAdornmentProps={{ position: "end" }}
                                        onChange={date => handleStartDateChange(date)}
                                    />
                                </MuiPickersUtilsProvider>
                                <Spacer />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        autoOk
                                        variant="inline"
                                        inputVariant="outlined"
                                        label="End Date"
                                        format="dd-MM-yyyy"
                                        value={selectedEndDate}
                                        InputAdornmentProps={{ position: "end" }}
                                        onChange={date => handleEndDateChange(date)}
                                    />
                                </MuiPickersUtilsProvider>
                                <IconButton aria-label="settings"
                                            onClick={exportChart}
                                            title={"Export To CSV"}
                                >
                                    <ArrowDownward />
                                </IconButton>
                                <ReactToPrint
                                    content={reactToPrintContent}
                                    documentTitle="AwesomeFileName"
                                    onAfterPrint={handleAfterPrint}
                                    onBeforeGetContent={handleOnBeforeGetContent}
                                    onBeforePrint={handleBeforePrint}
                                    removeAfterPrint
                                    trigger={reactToPrintTrigger}
                                />
                            </div>
                        }
            />
            <CardContent ref={componentRef}>
                <div style={{ width: '100%', height: 500 }}>
                    <ResponsiveContainer>
                        <AreaChart data={getRevenuePerDay(rangeDays,orders)}>
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

