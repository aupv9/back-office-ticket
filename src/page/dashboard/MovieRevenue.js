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
import {CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis,Tooltip,Line,LineChart} from "recharts";



export const MovieRevenue = (props) => {
    const { orders ,role } = props;
    const translate = useTranslate();
    const {data,ids,loaded} = useGetList("movies-showHaveOfWeek", { page: 1, perPage: 10000 });
    const [movies,setMovies] = useState([]);
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

        const movies = ids.map(id => data[id]);
        setMovies(movies);
        const aggregateOrdersByMovieTotal = (orders) =>
            orders
                .filter((order) => order.status === 'payment')
                .reduce((acc, curr) => {
                    const room = curr["movieName"];
                    if (!acc[room]) {
                        acc[room] = 0;
                    }
                    acc[room] += curr.total;
                    return acc;
                }, {});
        const aggregateOrdersByMovieTotalSeats = (orders) =>
            orders
                .filter((order) => order.status === 'payment')
                .reduce((acc, curr) => {
                    const room = curr["movieName"];
                    if (!acc[room]) {
                        acc[room] = 0;
                    }
                    acc[room] += curr["totalSeats"];
                    return acc;
                }, {});
        const aggregateOrdersByMovieTotalConcession = (orders) =>
            orders
                .filter((order) => order.status === 'payment')
                .reduce((acc, curr) => {
                    const room = curr["movieName"];
                    if (!acc[room]) {
                        acc[room] = 0;
                    }
                    acc[room] += curr["totalConcessions"];
                    return acc;
                }, {});

        const getRevenuePerRoom = (orders) => {
            const roomsWithRevenueTotal = aggregateOrdersByMovieTotal(orders);
            const roomsWithRevenueTotalSeats = aggregateOrdersByMovieTotalSeats(orders);
            const roomsWithRevenueTotalConcession = aggregateOrdersByMovieTotalConcession(orders);

            return movies.map(movie => ({
                name:movie["name"],
                total: roomsWithRevenueTotal[movie["name"]] || 0,
                ticket:roomsWithRevenueTotalSeats[movie["name"]] || 0,
                concession:roomsWithRevenueTotalConcession[movie["name"]] || 0

            }));
        };
        setDataChart(getRevenuePerRoom(orders));
    },[ids,data]);

    if (!orders) return null;


    return (
        <Card>
            <CardHeader title={role === 1 ?  translate(`Total Revenue Movie Now Playing All Theater`) :
                translate(`Total Revenue Movie Now Playing ${orders[0] && orders[0].theaterName}`) }
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
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={dataChart}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="ticket" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="concession" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>

                    {/*<ResponsiveLine*/}
                    {/*    data={*/}
                    {/*        [{*/}
                    {/*            "id": "japan",*/}
                    {/*            "color": "hsl(179, 70%, 50%)",*/}
                    {/*            "data": [*/}
                    {/*                {*/}
                    {/*                    "x": "plane",*/}
                    {/*                    "y": 52*/}
                    {/*                },*/}
                    {/*                {*/}
                    {/*                    "x": "helicopter",*/}
                    {/*                    "y": 5*/}
                    {/*                },*/}
                    {/*                {*/}
                    {/*                    "x": "boat",*/}
                    {/*                    "y": 67*/}
                    {/*                },*/}
                    {/*                {*/}
                    {/*                    "x": "train",*/}
                    {/*                    "y": 129*/}
                    {/*                },*/}
                    {/*                {*/}
                    {/*                    "x": "subway",*/}
                    {/*                    "y": 234*/}
                    {/*                },*/}
                    {/*                {*/}
                    {/*                    "x": "bus",*/}
                    {/*                    "y": 40*/}
                    {/*                },*/}
                    {/*                {*/}
                    {/*                    "x": "car",*/}
                    {/*                    "y": 29*/}
                    {/*                },*/}
                    {/*                {*/}
                    {/*                    "x": "moto",*/}
                    {/*                    "y": 48*/}
                    {/*                },*/}
                    {/*                {*/}
                    {/*                    "x": "bicycle",*/}
                    {/*                    "y": 215*/}
                    {/*                },*/}
                    {/*                {*/}
                    {/*                    "x": "horse",*/}
                    {/*                    "y": 15*/}
                    {/*                },*/}
                    {/*                {*/}
                    {/*                    "x": "skateboard",*/}
                    {/*                    "y": 147*/}
                    {/*                },*/}
                    {/*                {*/}
                    {/*                    "x": "others",*/}
                    {/*                    "y": 103*/}
                    {/*                }*/}
                    {/*            ]*/}
                    {/*        },*/}
                    {/*    {*/}
                    {/*        "id": "france",*/}
                    {/*        "color": "hsl(228, 70%, 50%)",*/}
                    {/*        "data": [*/}
                    {/*    {*/}
                    {/*        "x": "plane",*/}
                    {/*        "y": 104*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "helicopter",*/}
                    {/*        "y": 227*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "boat",*/}
                    {/*        "y": 270*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "train",*/}
                    {/*        "y": 281*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "subway",*/}
                    {/*        "y": 281*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "bus",*/}
                    {/*        "y": 199*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "car",*/}
                    {/*        "y": 138*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "moto",*/}
                    {/*        "y": 272*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "bicycle",*/}
                    {/*        "y": 200*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "horse",*/}
                    {/*        "y": 194*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "skateboard",*/}
                    {/*        "y": 120*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "others",*/}
                    {/*        "y": 117*/}
                    {/*    }*/}
                    {/*        ]*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "id": "us",*/}
                    {/*        "color": "hsl(260, 70%, 50%)",*/}
                    {/*        "data": [*/}
                    {/*    {*/}
                    {/*        "x": "plane",*/}
                    {/*        "y": 201*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "helicopter",*/}
                    {/*        "y": 208*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "boat",*/}
                    {/*        "y": 121*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "train",*/}
                    {/*        "y": 220*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "subway",*/}
                    {/*        "y": 191*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "bus",*/}
                    {/*        "y": 88*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "car",*/}
                    {/*        "y": 135*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "moto",*/}
                    {/*        "y": 20*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "bicycle",*/}
                    {/*        "y": 188*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "horse",*/}
                    {/*        "y": 266*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "skateboard",*/}
                    {/*        "y": 168*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "others",*/}
                    {/*        "y": 64*/}
                    {/*    }*/}
                    {/*        ]*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "id": "germany",*/}
                    {/*        "color": "hsl(325, 70%, 50%)",*/}
                    {/*        "data": [*/}
                    {/*    {*/}
                    {/*        "x": "plane",*/}
                    {/*        "y": 50*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "helicopter",*/}
                    {/*        "y": 133*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "boat",*/}
                    {/*        "y": 236*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "train",*/}
                    {/*        "y": 26*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "subway",*/}
                    {/*        "y": 206*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "bus",*/}
                    {/*        "y": 204*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "car",*/}
                    {/*        "y": 92*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "moto",*/}
                    {/*        "y": 118*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "bicycle",*/}
                    {/*        "y": 69*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "horse",*/}
                    {/*        "y": 205*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "skateboard",*/}
                    {/*        "y": 258*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "others",*/}
                    {/*        "y": 34*/}
                    {/*    }*/}
                    {/*        ]*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "id": "norway",*/}
                    {/*        "color": "hsl(97, 70%, 50%)",*/}
                    {/*        "data": [*/}
                    {/*    {*/}
                    {/*        "x": "plane",*/}
                    {/*        "y": 185*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "helicopter",*/}
                    {/*        "y": 221*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "boat",*/}
                    {/*        "y": 246*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "train",*/}
                    {/*        "y": 7*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "subway",*/}
                    {/*        "y": 102*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "bus",*/}
                    {/*        "y": 274*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "car",*/}
                    {/*        "y": 272*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "moto",*/}
                    {/*        "y": 28*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "bicycle",*/}
                    {/*        "y": 219*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "horse",*/}
                    {/*        "y": 120*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "skateboard",*/}
                    {/*        "y": 62*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*        "x": "others",*/}
                    {/*        "y": 272*/}
                    {/*    }*/}
                    {/*        ]*/}
                    {/*    }*/}
                    {/*        ]}*/}
                    {/*    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}*/}
                    {/*    xScale={{ type: 'point' }}*/}
                    {/*    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}*/}
                    {/*    axisTop={null}*/}
                    {/*    axisRight={null}*/}
                    {/*    axisBottom={{*/}
                    {/*        orient: 'bottom',*/}
                    {/*        tickSize: 5,*/}
                    {/*        tickPadding: 5,*/}
                    {/*        tickRotation: 0,*/}
                    {/*        legend: 'transportation',*/}
                    {/*        legendOffset: 36,*/}
                    {/*        legendPosition: 'middle'*/}
                    {/*    }}*/}
                    {/*    axisLeft={{*/}
                    {/*        orient: 'left',*/}
                    {/*        tickSize: 5,*/}
                    {/*        tickPadding: 5,*/}
                    {/*        tickRotation: 0,*/}
                    {/*        legend: 'revenue(vnd)',*/}
                    {/*        legendOffset: -40,*/}
                    {/*        legendPosition: 'middle'*/}
                    {/*    }}*/}
                    {/*    colors={{ scheme: 'spectral' }}*/}
                    {/*    pointSize={10}*/}
                    {/*    pointColor={{ theme: 'background' }}*/}
                    {/*    pointBorderWidth={2}*/}
                    {/*    pointBorderColor={{ from: 'serieColor' }}*/}
                    {/*    enablePointLabel={true}*/}
                    {/*    pointLabelYOffset={-12}*/}
                    {/*    enableArea={true}*/}
                    {/*    areaBlendMode="lighten"*/}
                    {/*    useMesh={true}*/}
                    {/*    legends={[*/}
                    {/*        {*/}
                    {/*            anchor: 'bottom-right',*/}
                    {/*            direction: 'column',*/}
                    {/*            justify: false,*/}
                    {/*            translateX: 100,*/}
                    {/*            translateY: 0,*/}
                    {/*            itemsSpacing: 0,*/}
                    {/*            itemDirection: 'left-to-right',*/}
                    {/*            itemWidth: 80,*/}
                    {/*            itemHeight: 20,*/}
                    {/*            itemOpacity: 0.75,*/}
                    {/*            symbolSize: 12,*/}
                    {/*            symbolShape: 'circle',*/}
                    {/*            symbolBorderColor: 'rgba(0, 0, 0, .5)',*/}
                    {/*            effects: [*/}
                    {/*                {*/}
                    {/*                    on: 'hover',*/}
                    {/*                    style: {*/}
                    {/*                        itemBackground: 'rgba(0, 0, 0, .03)',*/}
                    {/*                        itemOpacity: 1*/}
                    {/*                    }*/}
                    {/*                }*/}
                    {/*            ]*/}
                    {/*        }*/}
                    {/*    ]}*/}
                    {/*/>*/}
                </div>
            </CardContent>
        </Card>

    );
};
