import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader} from '@material-ui/core';
import {
    downloadCSV, useGetList,
    useTranslate,
} from 'react-admin';

import jsonExport from 'jsonexport/dist';
import IconButton from "@material-ui/core/IconButton";
import {ArrowDownward} from "@material-ui/icons";
// import {CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis,Tooltip,Line,LineChart} from "recharts";
import {ResponsiveLine} from "@nivo/line";



export const RevenueMovieByRoom = (props) => {
    const { orders ,role} = props;
    const translate = useTranslate();
    const {data:dataMovies,ids:idsMovie} = useGetList("movies-nowPlaying", { page: 1, perPage: 10000 });

    const {data,ids,loaded} = useGetList("rooms", { page: 1, perPage: 10000 });
    const [rooms,setRoom] = useState([]);

    const [movies,setMovies] = useState([]);
    const [theaters,setTheaters] = useState([]);

    const [dataChart,setDataChart] = useState([]);

    const exportChart = () => {
        const nameCSV = role === 1 ?  translate(`Revenue Movie Now Playing All Theater`) :
            translate(`Revenue Movie Now Playing ${orders[0] && orders[0].theaterName}`);
        jsonExport(dataChart, {
            headers: ['name', 'ticket','concession','total'],
        }, (err, csv) => {
            downloadCSV(csv, nameCSV);
        });
    }

    useEffect(() =>{
        const rooms = ids.map(id => data[id]);
        setRoom(rooms);
    },[ids,data])

    useEffect(() =>{
        const movies = idsMovie.map(id => dataMovies[id]);
        setMovies(movies);
        const aggregateOrdersByMovieTotal = (orders) =>
            orders
                .filter((order) => order.status === 'payment')
                .reduce((acc, curr) => {
                    const movie = curr["movieName"];
                    if (!acc[movie]) {
                        acc[movie] = 0;
                    }
                    acc[movie] += curr.total;
                    return acc;
                }, {});

        const aggregateOrdersByMovieTotalByRoom = (orders,room,movie) => {
            return orders
                .filter((order) => order.status === 'payment' && order["movieName"] === movie && order["roomName"]  === room)
                .reduce((acc, curr) => {
                    acc += curr["totalSeats"];
                    return acc;
                }, 0);
        }

        const totalTicketPerRoom =  (orders,movie) =>{
            return rooms.map((room) => {
                const value = aggregateOrdersByMovieTotalByRoom(orders,room["name"],movie);
                return {
                    x:room.name,
                    y:value || 0
                }
            })
        }

        const getRevenuePerRoom = (orders) => {
            const dataChart = movies.map(movie => {
                const data = totalTicketPerRoom(orders,movie["name"])
                return {
                    id:movie["name"],
                    data:data
                }
            });
            console.log(dataChart)
            return dataChart
        };

        setDataChart(getRevenuePerRoom(orders));
    },[idsMovie,dataMovies,rooms]);



    if (!orders) return null;

    return (
        <Card>
            <CardHeader title={role === 1 ?  translate(`Revenue Movie Now Playing All Theater`) :
                translate(`Revenue Movie Now Playing ${orders[0] && orders[0].theaterName}`)}
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
                    <ResponsiveLine
                        data={dataChart}
                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                        xScale={{ type: 'point' }}
                        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                        yFormat=" >-.2f"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'transportation',
                            legendOffset: 36,
                            legendPosition: 'middle'
                        }}
                        axisLeft={{
                            orient: 'left',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'count',
                            legendOffset: -40,
                            legendPosition: 'middle'
                        }}
                        colors={{ scheme: 'paired' }}
                        pointSize={10}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        enablePointLabel={true}
                        pointLabelYOffset={-12}
                        enableArea={true}
                        useMesh={true}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 100,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemBackground: 'rgba(0, 0, 0, .03)',
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
            </CardContent>
        </Card>

    );
};
