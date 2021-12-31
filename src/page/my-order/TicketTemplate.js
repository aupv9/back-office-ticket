import * as React from 'react';
import image from '../../image/Movie Night Free Snack Facebook Post.png';

import { makeStyles } from '@material-ui/core/styles';
import {Box} from "@material-ui/core";

const useStyles = makeStyles({
    body: {
        backgroundColor: "Thistle",
        fontFamily: "'Yanone Kaffeesatz', sans-serif",
        fontWeight: 600
    },
    img: { maxWidth: "100%", height: "auto" },
    ticket: {
        width: "400px",
        height: "775px",
        backgroundColor: "white",
        margin: "25px auto",
        position: "relative"
    },
    ".holes-top": {
        height: "50px",
        width: "50px",
        backgroundColor: "Thistle",
        borderRadius: "50%",
        position: "absolute",
        left: "50%",
        marginLeft: "(50/-2) + px",
        top: "(50 / -2) + px",
        "&:before,\n\t&:after": {
            content: "''",
            height: "50px",
            width: "50px",
            backgroundColor: "Thistle",
            position: "absolute",
            borderRadius: "50%"
        },
        "&:before": { left: "(50 / -2) + px" },
        "&:after": { left: "(50 / 2) + px" }
    },
    ".holes-lower": {
        position: "relative",
        margin: "25px",
        border: "1px dashed #aaa",
        "&:before,\n\t&:after": {
            content: "''",
            height: "50px",
            width: "50px",
            backgroundColor: "Thistle",
            position: "absolute",
            borderRadius: "50%"
        },
        "&:before": { top: "-25px", left: "(50/ -1) + px" },
        "&:after": { top: "-25px", left: "(400 - 50) + px" }
    },
    ".title": { padding: "50px 25px 10px" },
    ".cinema": { color: "#aaa", fontSize: "22px" },
    ".movie-title": { fontSize: "50px" },
    ".info": { padding: "15px 25px" },
    table: {
        width: "100%",
        fontSize: "18px",
        marginBottom: "15px",
        tr: { marginBottom: "10px" },
        th: {
            textAlign: "left",
            "&:nth-of-type(1)": { width: "38%" },
            "&:nth-of-type(2)": { width: "40%" },
            "&:nth-of-type(3)": { width: "15%" }
        },
        td: { width: "33%", fontSize: "32px" }
    },
    ".bigger": { fontSize: "48px" },
    ".serial": {
        padding: "25px",
        table: { borderCollapse: "collapse", margin: "0 auto" },
        td: { width: "3px", height: "50px" }
    },
    ".numbers": { td: { fontSize: "16px", textAlign: "center" } }
});


export const TicketTemplate =() =>{

    const classes = useStyles();
    return (
        <Box>

        </Box>
    )
}
