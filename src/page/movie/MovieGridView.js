import * as React from 'react';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';
import {
    linkToRecord,
    NumberField,
    useListContext,
    DatagridProps,
    Identifier,
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
    }
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
    const linkToEdit = (basePath, id) =>{
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
                    className={classes.item}
                >
                    <img src={data[id].thumbnail} alt="" />
                    <GridListTileBar
                        className={classes.tileBar}
                        title={data[id].name}
                        subtitle={
                            <span>
                                {data[id].name}
                            </span>
                        }
                    />
                </GridListTile>
            ))}
        </MuiGridList>
    );
};

const times = (nbChildren, fn) =>
    Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = (props) => {
    const { width, nbItems = 20 } = props;
    const classes = useStyles();
    return (
        <MuiGridList
            cellHeight={180}
            cellWidth={140}
            cols={getColsForWidth(width)}
            className={classes.gridList}
        >
            {' '}
            {times(nbItems, key => (
                <GridListTile key={key}>
                    <div className={classes.placeholder} />
                </GridListTile>
            ))}
        </MuiGridList>
    );
};

const MovieGridView = (props) => {
    const { width } = props;
    const { loaded } = useListContext();
    return loaded ? (
        <LoadedGridList width={width} />
    ) : (
        <LoadingGridList width={width} />
    );
};

export default MovieGridView;
