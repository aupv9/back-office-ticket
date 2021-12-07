import React, { useState, useEffect, useCallback, CSSProperties } from 'react';
import {useVersion, useDataProvider, usePermissions, useRefresh} from 'react-admin';
import {useMediaQuery, Theme} from '@material-ui/core';
import { format, subDays, addDays } from 'date-fns';
import {Area, CartesianGrid, XAxis, YAxis, AreaChart, ResponsiveContainer, Legend, Line,LineChart,Tooltip} from "recharts";
import OrderChart30Day from "./OrderChart30Day";
import MonthlyRevenue from "./MonthlyRevenue";
import PendingOrders from "./PendingOrders";
import CustomerCount from "./CustomerCount";
import OrdersPayment from "./OrderPayment";
import {OrdersChartMonth} from "./OrdersChartMonth";
import {RoomChart} from "./RoomChart";
import * as _ from "lodash";
import SockJsClient from "react-stomp";




const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' ,alignItems:"center",alignContent:"center"},
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em',alignItems:"center",alignContent:"center" },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const Dashboard = () => {
    const { loaded, permissions } = usePermissions();
    const [arrPermission,setArrPermission] = useState([]);
    const [state, setState] = useState({});
    const version = useVersion();
    const dataProvider = useDataProvider();

    const isXSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('md')
    );
    const isHavePermission = (permission) =>{
        return _.includes(arrPermission,permission);
    }
    useEffect(() => {
        setArrPermission(permissions);
    },[permissions])


    const processOrders = (order) =>{
        return order
            .reduce(
                (stats, order) => {
                    if (order.status === 'payment') {
                        stats.revenue += order.total;
                        stats.paymentOrders++;
                    }
                    if (order.status === 'non_payment') {
                        stats.pendingPayment++;
                    }
                    if (order.status === 'cancelled') {
                        stats.cancelledOrders.push(order);
                    }
                    return stats;
                },
                {
                    revenue: 0,
                    pendingPayment: 0,
                    nbNewPaymentOrders:0,
                    paymentOrders: 0,
                    cancelledOrders:[]
                }
            );
    }

    const fetchOrders = useCallback(async () => {
        const aMonthAgo = subDays(new Date(), 30);
        const { data: recentOrders } = await dataProvider.getList(
            'orders-room',
                {
                    filter: { date_gte: format(new Date(aMonthAgo),"yyyy-MM-dd") },
                    sort: { field: 'id', order: 'DESC' },
                    pagination: { page: 1, perPage: 10000 },
                }
        );
        const aggregations = processOrders(recentOrders);

        setState(state => ({
            ...state,
            recentOrders,
            revenue: aggregations.revenue.toLocaleString(undefined, {
                style: 'currency',
                currency: 'vnd',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            nbNewOrders: aggregations.nbNewOrders,
            pendingPayment: aggregations.pendingPayment,
            paymentOrders:aggregations.paymentOrders
        }));

    }, [dataProvider]);



    useEffect(() => {
        fetchOrders();
    }, [version]);

    const {
        recentOrders,revenue,pendingPayment,paymentOrders,ordersRoom
    } = state;

    const refresh = useRefresh();


    let onConnected = () => {
        console.log("Connected!!")
    }

    let onMessageReceived = (msg) => {
        if(msg && msg.payload){

            const aggregations = processOrders(msg.payload);
            setState(state => ({
                ...state,
                recentOrders,
                revenue: aggregations.revenue.toLocaleString(undefined, {
                    style: 'currency',
                    currency: 'vnd',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                }),
                nbNewOrders: aggregations.nbNewOrders,
                pendingPayment: aggregations.pendingPayment,
                paymentOrders:aggregations.paymentOrders
            }));
        }
    }


    return isXSmall ? (
        <div>
            <div style={styles.flexColumn }>
                {/*<Welcome />*/}
                {/*<MonthlyRevenue value={revenue} />*/}
                {/*<VerticalSpacer />*/}
                {/*<NbNewOrders value={nbNewOrders} />*/}
                {/*<VerticalSpacer />*/}
                {/*<PendingOrders*/}
                {/*    orders={pendingOrders}*/}
                {/*    customers={pendingOrdersCustomers}*/}
                {/*/>*/}
            </div>
        </div>
    ) : isSmall ? (
        <div style={styles.flexColumn }>
            <div style={styles.singleCol}>
                {/*<Welcome />*/}
            </div>
            <div style={styles.flex}>
                {/*<MonthlyRevenue value={revenue} />*/}
                {/*<Spacer />*/}
                {/*<NbNewOrders value={nbNewOrders} />*/}
            </div>
            <div style={styles.singleCol}>
                {/*<OrderChart30Day orders={recentOrders} />*/}
            </div>
            <div style={styles.singleCol}>
                {/*<OrdersChartMonth />*/}
            </div>
        </div>
    ) : (
        <>
            <SockJsClient
                url={'http://localhost:8080/real-time-service/'}
                topics={['/topic/chart']}
                onConnect={onConnected}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
            />
            {/*<div style={styles.flex}>*/}
            {/*    <div style={styles.leftCol}>*/}
            {/*        <div style={styles.singleCol}>*/}
            {/*            <OrderChart30Day orders={recentOrders} />*/}
            {/*        </div>*/}
            {/*        <div style={styles.singleCol}>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div style={styles.rightCol}>*/}
            {/*        <div style={styles.singleCol}>*/}
            {/*            <OrdersChartMonth />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div style={styles.flex}>*/}
            {/*    <div style={styles.leftCol}>*/}
            {/*        <div style={styles.singleCol}>*/}
            {/*            {*/}
            {/*                recentOrders ? <RoomChart orders={recentOrders}/> : null*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*        <div style={styles.singleCol}>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div style={styles.rightCol}>*/}
            {/*        <div style={styles.singleCol}>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {

                <div style={styles.flex}>
                    <div style={styles.leftCol}>
                        <div style={styles.flex}>
                            {
                                isHavePermission("READ_CHART_STAFF") && <MonthlyRevenue value={revenue} role={2}/>
                            }
                            {
                                isHavePermission("READ_CHART_MANAGER") &&
                                <MonthlyRevenue value={revenue} role={3}/>

                            }
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER") && <MonthlyRevenue value={revenue} role={1} />
                            }
                            <Spacer />
                            {
                                isHavePermission("READ_CHART_STAFF") && <PendingOrders value={pendingPayment} role={2}/>
                            }
                            {
                                isHavePermission("READ_CHART_MANAGER") && <PendingOrders value={pendingPayment} role={3}/>
                            }
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER") && <PendingOrders value={pendingPayment} role={1}/>
                            }
                            <Spacer />
                            {
                                isHavePermission("READ_CHART_STAFF") && <OrdersPayment value={paymentOrders} role={2}/>
                            }
                            {
                                isHavePermission("READ_CHART_MANAGER") && <OrdersPayment value={paymentOrders} role={3}/>
                            }
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER") && <OrdersPayment value={paymentOrders} role={1}/>
                            }

                        </div>
                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_STAFF") && <OrderChart30Day orders={recentOrders} role={2}/>
                            }
                            {
                                isHavePermission("READ_CHART_MANAGER") && <OrderChart30Day orders={recentOrders} role={3}/>
                            }
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER") && <OrderChart30Day orders={recentOrders} role={1}/>
                            }
                        </div>
                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_STAFF") && <OrdersChartMonth orders={recentOrders} role={2}/>
                            }
                            {
                                isHavePermission("READ_CHART_MANAGER") && <OrdersChartMonth orders={recentOrders} role={3}/>
                            }
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER") && <OrdersChartMonth orders={recentOrders} role={1}/>
                            }
                        </div>
                        {
                            isHavePermission("READ_CHART_MANAGER") &&
                            <div style={styles.singleCol}>
                                {
                                    recentOrders && <RoomChart orders={recentOrders}/>
                                }
                            </div>
                        }

                    </div>

                </div>
            }

        </>
    );
};


export default Dashboard;
