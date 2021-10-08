import {useListContext} from "react-admin";
import {Box, Paper} from "@material-ui/core";
import {LocationCard} from "./LocationCard";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    gridList: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 1008,
        gap: '10px',

    },
    paper: {
        height: 200,
        width: 194,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.grey[200],
    },
}));

const times = (nbChildren, fn) =>
    Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = () => {
    const classes = useStyles();
    return (
        <Box className={classes.gridList}>
            {times(15, key => (
                <Paper className={classes.paper} key={key} />
            ))}
        </Box>
    );
};

const LoadedGridList = () => {
    const { ids, data } = useListContext();
    const classes = useStyles();

    if (!ids || !data) return null;

    return (
        <Box className={classes.gridList}>
            {ids.map((id) => (
                <LocationCard key={id} record={data[id]}/>
            ))}
        </Box>
    );
};

export const GridList = () =>{
    const { loaded } = useListContext();

    return loaded ? <LoadedGridList /> : <LoadingGridList />;

}
