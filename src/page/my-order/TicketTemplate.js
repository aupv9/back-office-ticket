import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Box, Divider, Typography} from "@material-ui/core";
import  image from '../../image/tomtick.png'
import {Container} from "@nivo/core";
import {useDataProvider, useVersion} from "react-admin";
import {useCallback, useEffect, useState} from "react";
import {format, getTime} from "date-fns";

const useStyles = makeStyles({
    borderTicket:{
        borderStyle:"dotted",
        width:500,
        height:500,
        display:"flex",
        flexDirection:"column",
        marginTop:"1px"
    },
    header:{
        display:"flex",
        justifyContent:"center",
        borderBottom:"dotted",
        maxHeight:100,
        alignItems:"center",
        width:"100%"

    },
    content:{

    },
    footer:{
        display:"flex",
        justifyContent:"end",
        maxHeight:100,
        alignItems:"center",
        marginTop:50,
        // borderBottom:"1px dotted"
    }
});



export const TicketTemplate =(props) =>{
    const {ticket,record} = props;
    const classes = useStyles();
    const dataProvider = useDataProvider();
    const version = useVersion();
    const [showTime,setShowTime] = useState();
    const [movie,setMovie] = useState();
    const [theater,setTheater] = useState();


    const fetchShow = useCallback(async () =>{
        const { data: showTime } = await dataProvider.getOne(
            'showTimesDetails',
            {
                id:record.showTimesDetailId
            }
        );
        if(showTime){
            const { data: movie } = await dataProvider.getOne(
                'movies',
                {
                    id:showTime.movieId
                }
            );
            setMovie(movie)
        }
        if(showTime){
            const { data: rooms } = await dataProvider.getOne(
                'rooms',
                {
                    id:showTime.roomId
                }
            );
            if(rooms){
                const { data: theater } = await dataProvider.getOne(
                    'theaters',
                    {
                        id:rooms.theaterId
                    }
                );
                setTheater(theater)
            }
        }
        setShowTime(showTime)
    })
    useEffect(() => {
        fetchShow();
    }, [version]);

    console.log(showTime)
    return (
       <Box className={classes.borderTicket}>

           <Box className={classes.header}>
              <Box>
                  <img src={image} style={{width:150}}/>
              </Box>
               <Typography style={{fontSize:20,fontFamily:"sans-serif"}}>
                   {
                       theater && theater.name
                   }
               </Typography>
           </Box>
           <Box className={classes.content}>
                <Box display={"flex"} justifyContent={"center"} style={{marginBottom:20}}>
                    <Typography style={{fontSize:25,fontFamily:"sans-serif"}}>
                        {
                            movie && movie.name
                        }
                    </Typography>

                </Box>
               <Box display={"flex"} justifyContent={"center"}>
                   <Box style={{marginRight:30,marginBottom:20}}>
                       <Typography style={{fontSize:20}}>
                           Giờ (Time)
                       </Typography>
                       <Typography style={{fontSize:30}}>
                           {
                               showTime && format(new Date(showTime["timeStart"]),"dd-MM-yyyy hh:mm:ss").split(" ")[1]

                           }
                       </Typography>
                   </Box>
                   <Box>
                       <Typography  style={{fontSize:20}}>
                           Ngày (Date)
                       </Typography>
                       <Typography style={{fontSize:30}}>
                           {
                               showTime && format(new Date(showTime["timeStart"]),"dd-MM-yyyy")
                           }
                       </Typography>
                   </Box>

               </Box>
               <Box display={"flex"} justifyContent={"center"} >
                   <Box style={{marginRight:30,marginBottom:20}}>
                       <Typography style={{fontSize:20}}>
                           Tồng tiền(Total)
                       </Typography>
                       <Typography style={{fontSize:30}}>
                           {showTime && showTime["price"].toLocaleString(undefined, {
                               style: 'currency',
                               currency: 'VND',
                           })}
                       </Typography>
                   </Box>

                   <Box>
                       <Typography style={{fontSize:20}}>
                           Phòng / Ghế (Room / Seat)
                       </Typography>
                       <Typography style={{fontSize:30}}    >
                           {
                               showTime && showTime.roomName
                           }
                           /
                           {
                               ticket && `${ticket.tier} ${ticket.numbers} `
                           }
                       </Typography>
                   </Box>
               </Box>
           </Box>
           <Box className={classes.footer}>
               <Box justifyContent={"center"}>
                   <Typography style={{fontSize:10}}>
                       Ngày tạo(Date)
                   </Typography>
                   <Typography style={{fontSize:13}}>
                       {
                           record &&
                            format(new Date(),"dd-MM-yyyy hh:mm:ss")
                       }
                   </Typography>
               </Box>
               <Divider />
           </Box>
       </Box>
    )
}
