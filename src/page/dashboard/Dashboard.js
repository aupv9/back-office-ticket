import React, { useState, useEffect, useCallback, CSSProperties } from 'react';
import {useVersion, useDataProvider, usePermissions, useRefresh, useGetList} from 'react-admin';
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
import {RevenueMonthTheater} from "./RevenueMonthTheater";
import {DivRevenueChart} from "./DivRevenueChart";
import {MovieRevenue} from "./MovieRevenue";
import {RevenueMovieByTheater} from "./RevenueMovieByTheater";
import {RevenueMovieByRoom} from "./RevenueMovieByRoom";




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
                    if (order.status === 'non_payment' || order.status === "ordered") {
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

        const { data: ordersAll } = await dataProvider.getList(
            'orders-room',
            {
                filter: {} ,
                sort: { field: 'id', order: 'DESC' },
                pagination: { page: 1, perPage: 1000000 },
            }
        );

        const { data: recentOrders } = await dataProvider.getList(
            'orders-room',
                {
                    filter: { date_gte: format(new Date(aMonthAgo),"yyyy-MM-dd") },
                    sort: { field: 'id', order: 'DESC' },
                    pagination: { page: 1, perPage: 1000000 },
                }
        );

        const {data: dataTheater} = await dataProvider.getList("theaters",
            {
                filter: {},
                sort: { field: 'id', order: 'DESC' },
                pagination: { page: 1, perPage: 1000000 },
            }
        );
        const aggregations = processOrders(recentOrders);
        setState(state => ({
            ...state,
            ordersAll,
            recentOrders,
            dataTheater,
            revenue: aggregations.revenue.toLocaleString(undefined, {
                style: 'currency',
                currency: 'vnd',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            nbNewOrders: aggregations.nbNewOrders,
            pendingPayment: aggregations.pendingPayment,
            paymentOrders:aggregations.paymentOrders,
            ordered:aggregations.ordered
        }));

    }, [dataProvider]);



    useEffect(() => {
        fetchOrders();
    }, [version]);

    const {
        ordersAll,recentOrders,revenue,pendingPayment,paymentOrders,dataTheater
    } = state;

    const refresh = useRefresh();


    let onConnected = () => {
        console.log("Connected!!")
    }

    let onMessageReceived = (msg) => {
        if(msg && msg.payload && msg.domain === "order"){
            const aggregations = processOrders(msg.payload[0]);

            setState(state => ({
                ...state,
                ordersAll:msg.payload[1],
                recentOrders:msg.payload[0],
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
                topics={['/topic/notification']}
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
                                isHavePermission("READ_CHART_STAFF") && recentOrders && <OrderChart30Day orders={recentOrders} role={2}/>
                            }
                            {
                                isHavePermission("READ_CHART_MANAGER")  && recentOrders && <OrderChart30Day orders={recentOrders} role={3}/>
                            }
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER")  && recentOrders && <OrderChart30Day orders={recentOrders} role={1}/>
                            }
                        </div>
                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_STAFF") && ordersAll && <OrdersChartMonth orders={ordersAll} role={2}/>
                            }
                            {
                                isHavePermission("READ_CHART_MANAGER") && ordersAll && <OrdersChartMonth  orders={ordersAll} role={3}/>
                            }
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER")&& ordersAll && <OrdersChartMonth orders={ordersAll} role={1}/>
                            }
                        </div>
                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_MANAGER") &&
                                <div style={styles.singleCol}>
                                    {
                                        ordersAll && <DivRevenueChart orders={ordersAll}  orders={ordersAll} role={3}/>
                                    }
                                </div>
                            }
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER") &&
                                <div style={styles.singleCol}>
                                    {
                                        ordersAll && <DivRevenueChart orders={ordersAll} role={1}/>
                                    }
                                </div>
                            }


                        </div>
                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER") &&
                                <div style={styles.singleCol}>
                                    {
                                        ordersAll && dataTheater && <RevenueMovieByTheater orders={ordersAll} dataTheater={dataTheater} role={1}/>
                                    }
                                </div>
                            }
                            {
                                isHavePermission("READ_CHART_MANAGER") &&
                                <div style={styles.singleCol}>
                                    {
                                        ordersAll && <RevenueMovieByRoom orders={ordersAll}  role={2}/>
                                    }
                                </div>
                            }
                        </div>


                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_MANAGER") &&
                                <div style={styles.singleCol}>
                                    {
                                        ordersAll && <MovieRevenue orders={ordersAll } role={2}/>
                                    }
                                </div>
                            }
                            {
                                isHavePermission("READ_CHART_SENIOR_MANAGER") &&
                                <div style={styles.singleCol}>
                                    {
                                        ordersAll && <MovieRevenue orders={ordersAll} role={1}/>
                                    }
                                </div>
                            }
                        </div>
                        <div style={styles.singleCol}>
                            {
                                isHavePermission("READ_CHART_MANAGER") &&
                                <div style={styles.singleCol}>
                                    {
                                        recentOrders && <RoomChart orders={recentOrders}/>
                                    }
                                </div>
                            }
                        </div>


                        {
                            isHavePermission("READ_CHART_SENIOR_MANAGER") &&
                            <div style={styles.singleCol}>
                                {
                                    recentOrders && <RevenueMonthTheater orders={recentOrders}/>
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
