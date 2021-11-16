import * as React from 'react';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';
import {
    linkToRecord, NumberField,
    useListContext
} from 'react-admin';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    gridList: {
        margin: 0,
    },
    tileBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
    },
    placeholder: {
        backgroundColor: theme.palette.grey[300],
        height: '100%',
    },
    price: {
        display: 'inline',
        fontSize: '1em',
    },
    link: {
        color: '#fff',
    },
}));

const getColsForWidth = (width) => {
    if (width === 'xs') return 2;
    if (width === 'sm') return 3;
    if (width === 'md') return 3;
    if (width === 'lg') return 5;
    return 6;
};

const LoadedGridList = (props) => {
    const { width } = props;
    const { ids, data, basePath } = useListContext();
    const classes = useStyles();
    if (!ids || !data) return null;
    const linkToEdit =(basePath,id)=>{
        return linkToRecord(basePath,id);
    }
    return (
        <MuiGridList
            cellHeight={180}
            cols={getColsForWidth(width)}
            className={classes.gridList}
        >
            {ids.map((id) => (
                <GridListTile
                    component={Link}
                    key={id}
                    to={linkToEdit(basePath,data[id].id)}
                >
                    <img src={data[id].image} alt="" />
                    <GridListTileBar
                        className={classes.tileBar}
                        title={data[id].name}

                        // subtitle={
                        //     <span>
                        //         <NumberField
                        //             className={classes.price}
                        //             source="price"
                        //             record={data[id]}
                        //             color="inherit"
                        //             options={{
                        //                 style: 'currency',
                        //                 currency: 'vnd',
                        //             }}
                        //         />
                        //     </span>
                        // }
                    />
                </GridListTile>
            ))}
        </MuiGridList>
    );
};


const GridList = (props) => {
    const { width } = props;
    const { loaded } = useListContext();
    return loaded ? (
        <LoadedGridList width={width} />
    ) : (
        <LoadedGridList width={width} />
    );
};

export default GridList;
