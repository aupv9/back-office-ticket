import * as React from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {Box, Button, Card, CardContent, CardHeader, Link, useMediaQuery} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {
    downloadCSV,
    translate,
    useDataProvider,
    useGetList,
    usePermissions,
    useTranslate,
    useVersion,SelectInput
} from 'react-admin';
import {startOfMonth, format, getYear} from 'date-fns';
import { ResponsiveBar } from '@nivo/bar';
import * as _ from "lodash";
import jsonExport from 'jsonexport/dist';
import IconButton from "@material-ui/core/IconButton";
import {ArrowDownward, CodeRounded, Print} from "@material-ui/icons";
import ReactToPrint, {useReactToPrint} from "react-to-print";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";


const multiplier = {
    opportunity: 0.2,
    'proposal-sent': 0.5,
    'in-negociation': 0.8,
    delayed: 0.3,
};


export const OrdersChartMonth = (props) => {
    const { role } = props;
    const { permissions } = usePermissions();
    const [arrPermission,setArrPermission] = useState([]);
    const translate = useTranslate();
    const [selectedDate, handleDateChange] = useState(new Date());
    const dataProvider = useDataProvider();
    const version = useVersion();
    const [orders,setOrders] = useState([]);
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

    // const {data ,ids,loaded} = useGetList("orders-room",{
    //     page:1,perPage:1000
    // })

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
                pending: ordersByMonth[month]
                    .filter((order) => order.status === 'non_payment')
                    .reduce((acc, order) => {
                        acc += order.total;
                        return acc;
                    }, 0),
                payment: ordersByMonth[month]
                    .filter(
                        (order) => !['non_payment', 'cancelled'].includes(order.status)
                    )
                    .reduce((acc, order) => {
                        acc += order.total;
                        return acc;
                    }, 0),
                cancelled: ordersByMonth[month]
                    .filter((order) => order.status === 'cancelled')
                    .reduce((acc, order) => {
                        acc += order.total;
                        return acc;
                    }, 0),

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

    const componentRef = useRef(null);

    const [isPrint,setIsPrint] = useState(false);

    const onBeforeGetContentResolve = useRef(null);

    const [loading, setLoading] = React.useState(false);
    const [text, setText] = React.useState("old boring text");

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
        // setIsPrint(true)
        return (
            <IconButton aria-label="settings"
                        onClick={exportChart}
                        title={"Export To CSV"}
            >
                <Print />
            </IconButton>);
    }, []);

    return (
        <Card >
            <CardHeader title={ role === 2 ?  translate(`pos.dashboard.revenue_year_staff`)  : role === 1 ?
                            translate(`pos.dashboard.revenue_year_senior`):
                            translate(`pos.dashboard.revenue_year_manager`) + ` ` +`${orders[0] && orders[0].theaterName}`}
                        action={
                            <div style={{display:"flex"}}>
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
            <CardContent ref={componentRef} >
                <div style={{ width: '100%', height: 500 }}>
                    <ResponsiveBar
                        data={months}
                        valueFormat=" >-0,~r"
                        indexBy="date"
                        keys={['payment', 'pending', 'cancelled']}
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        padding={0.3}
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        colors={{ scheme: 'nivo' }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#38bcb2',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#eed312',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'fries'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'sandwich'
                                },
                                id: 'lines'
                            }
                        ]}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'month',
                            legendPosition: 'middle',
                            legendOffset: 32
                        }}
                        // axisLeft={{
                        //     format: value =>
                        //         `${Number(value).toLocaleString('ru-RU', {
                        //             minimumFractionDigits: 0,
                        //         })} đ`,
                        // }}
                        valueFormat={value =>
                            `${Number(value).toLocaleString('ru-RU', {
                                minimumFractionDigits: 0,
                            })} đ`
                        }
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 20,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                        role="application"
                        ariaLabel="Nivo bar chart demo"
                        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
                    />
                </div>
            </CardContent>
        </Card>

        //
        // <>
        //     <Box display="flex" alignItems="center">
        //         <Box ml={2} mr={2} display="flex">
        //             <AttachMoneyIcon color="disabled" fontSize="large" />
        //         </Box>
        //         <Link
        //             underline="none"
        //             variant="h5"
        //             color="textSecondary"
        //         >
        //             Upcoming Revenue This Year
        //         </Link>
        //     </Box>
        //     <Box height={500}>
        //         <ResponsiveBar
        //             data={months}
        //             indexBy="date"
        //             keys={['payment', 'pending', 'cancelled']}
        //             margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        //             padding={0.3}
        //             valueScale={{
        //                 type: 'linear',
        //                 min: range.min * 1.2,
        //                 max: range.max * 1.2,
        //             }}
        //             indexScale={{ type: 'band', round: true }}
        //             colors={{ scheme: 'dark2' }}
        //             // defs={[
        //             //     {
        //             //         id: 'dots',
        //             //         type: 'patternDots',
        //             //         background: 'inherit',
        //             //         color: '#38bcb2',
        //             //         size: 4,
        //             //         padding: 1,
        //             //         stagger: true
        //             //     },
        //             //     {
        //             //         id: 'lines',
        //             //         type: 'patternLines',
        //             //         background: 'inherit',
        //             //         color: '#eed312',
        //             //         rotation: -45,
        //             //         lineWidth: 6,
        //             //         spacing: 10
        //             //     }
        //             // ]}
        //             // fill={[
        //             //     {
        //             //         match: {
        //             //             id: 'fries'
        //             //         },
        //             //         id: 'dots'
        //             //     },
        //             //     {
        //             //         match: {
        //             //             id: 'sandwich'
        //             //         },
        //             //         id: 'lines'
        //             //     }
        //             // ]}
        //             borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        //             axisTop={null}
        //             axisRight={null}
        //             axisBottom={{
        //                 tickSize: 5,
        //                 tickPadding: 5,
        //                 tickRotation: 0,
        //                 legend: 'Month',
        //                 legendPosition: 'middle',
        //                 legendOffset: 32
        //             }}
        //             axisLeft={{
        //                 tickSize: 5,
        //                 tickPadding: 5,
        //                 tickRotation: 0,
        //                 legend: '',
        //                 legendPosition: 'middle',
        //                 legendOffset: -40
        //             }}
        //             labelSkipWidth={12}
        //             labelSkipHeight={12}
        //             labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        //             legends={[
        //                 {
        //                     dataFrom: 'keys',
        //                     anchor: 'bottom-right',
        //                     direction: 'column',
        //                     justify: false,
        //                     translateX: 120,
        //                     translateY: 0,
        //                     itemsSpacing: 2,
        //                     itemWidth: 100,
        //                     itemHeight: 20,
        //                     itemDirection: 'right-to-left',
        //                     itemOpacity: 0.85,
        //                     symbolSize: 20,
        //                     effects: [
        //                         {
        //                             on: 'hover',
        //                             style: {
        //                                 itemOpacity: 1
        //                             }
        //                         }
        //                     ]
        //                 }
        //             ]}
        //             role="application"
        //             // barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
        //         />
        //     </Box>
        // </>
    );
};
