import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: { width: 25, maxWidth: 25, maxHeight: 25 },
});

const ThumbnailField = (props) => {
    const { record } = props;
    const classes = useStyles();
    return record ? (
        <img src={record["thumbnail"]} className={classes.root} alt="" />
    ) : null;
};

export default ThumbnailField;
