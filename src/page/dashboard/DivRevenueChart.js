import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader} from '@material-ui/core';
import {
    downloadCSV,
    usePermissions,
    useTranslate,
} from 'react-admin';
import { startOfMonth, format } from 'date-fns';
import { ResponsiveBar } from '@nivo/bar';
import * as _ from "lodash";
import jsonExport from 'jsonexport/dist';
import IconButton from "@material-ui/core/IconButton";
import {ArrowDownward} from "@material-ui/icons";
import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar,Tooltip} from "recharts";


const multiplier = {
    opportunity: 0.2,
    'proposal-sent': 0.5,
    'in-negociation': 0.8,
    delayed: 0.3,
};


export const DivRevenueChart = (props) => {
    const { orders ,role } = props;
    const { permissions } = usePermissions();
    const [arrPermission,setArrPermission] = useState([]);
    const translate = useTranslate();

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
                            <IconButton aria-label="settings"
                                        onClick={exportChart}
                                        title={"Export To CSV"}
                            >
                                <ArrowDownward />
                            </IconButton>
                        }

            />
            <CardContent>
                <div style={{ width: '100%', height: 500 }}>
                    {/*<ResponsiveBar*/}
                    {/*    data={months}*/}
                    {/*    indexBy="date"*/}
                    {/*    keys={['ticket', 'concession']}*/}
                    {/*    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}*/}
                    {/*    padding={0.3}*/}
                    {/*    valueScale={{*/}
                    {/*        type: 'linear',*/}
                    {/*        min: range.min * 1.2,*/}
                    {/*        max: range.max * 1.2,*/}
                    {/*    }}*/}
                    {/*    indexScale={{ type: 'band', round: true }}*/}
                    {/*    colors={{ scheme: 'dark2' }}*/}
                    {/*    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}*/}
                    {/*    axisTop={null}*/}
                    {/*    axisRight={null}*/}
                    {/*    axisBottom={{*/}
                    {/*        tickSize: 5,*/}
                    {/*        tickPadding: 5,*/}
                    {/*        tickRotation: 0,*/}
                    {/*        legend: 'Month',*/}
                    {/*        legendPosition: 'middle',*/}
                    {/*        legendOffset: 32*/}
                    {/*    }}*/}
                    {/*    axisLeft={{*/}
                    {/*        tickSize: 5,*/}
                    {/*        tickPadding: 5,*/}
                    {/*        tickRotation: 0,*/}
                    {/*        legend: '',*/}
                    {/*        legendPosition: 'middle',*/}
                    {/*        legendOffset: -40*/}
                    {/*    }}*/}
                    {/*    labelSkipWidth={12}*/}
                    {/*    labelSkipHeight={12}*/}
                    {/*    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}*/}
                    {/*    legends={[*/}
                    {/*        {*/}
                    {/*            dataFrom: 'keys',*/}
                    {/*            anchor: 'bottom-right',*/}
                    {/*            direction: 'column',*/}
                    {/*            justify: false,*/}
                    {/*            translateX: 120,*/}
                    {/*            translateY: 0,*/}
                    {/*            itemsSpacing: 2,*/}
                    {/*            itemWidth: 100,*/}
                    {/*            itemHeight: 20,*/}
                    {/*            itemDirection: 'right-to-left',*/}
                    {/*            itemOpacity: 0.85,*/}
                    {/*            symbolSize: 20,*/}
                    {/*            effects: [*/}
                    {/*                {*/}
                    {/*                    on: 'hover',*/}
                    {/*                    style: {*/}
                    {/*                        itemOpacity: 1*/}
                    {/*                    }*/}
                    {/*                }*/}
                    {/*            ]*/}
                    {/*        }*/}
                    {/*    ]}*/}
                    {/*    role="application"*/}
                    {/*    // barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}*/}
                    {/*/>*/}
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
