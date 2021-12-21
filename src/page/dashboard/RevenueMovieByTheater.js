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



export const RevenueMovieByTheater = (props) => {
    const { orders ,role ,dataTheater} = props;
    const translate = useTranslate();
    const {data:dataMovies,ids:idsMovie} = useGetList("movies-nowPlaying", { page: 1, perPage: 10000 });

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

        const movies = idsMovie.map(id => dataMovies[id]);
        setMovies(movies);

        const aggregateOrdersByMovieTotalByTheater = (orders,theater,movie) => {

            return   orders
                .filter((order) => order.status === 'payment' && order["theaterName"] === theater && order["movieName"] === movie)
                .reduce((acc, curr) => {
                    acc += curr["totalSeats"];
                    return acc;
                }, 0);
        }


        const totalTicketPerTheater =  (orders,movie) =>{
            return dataTheater.map((theaters) => {
                const value = aggregateOrdersByMovieTotalByTheater(orders,theaters.name,movie);
                return {
                    x:theaters.name,
                    y:value || 0
                }
            })
        }

        const getRevenuePerRoom = (orders) => {
            const dataChart = movies.map(movie => {
                const data = totalTicketPerTheater(orders,movie["name"])
                return {
                    id:movie["name"],
                    data:data
                }
            });
            return dataChart
        };

        setDataChart(getRevenuePerRoom(orders));
    },[idsMovie,dataMovies]);



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
                            legend: 'Theater',
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
                        pointSize={10}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        enablePointLabel={true}
                        pointLabelYOffset={-12}
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
