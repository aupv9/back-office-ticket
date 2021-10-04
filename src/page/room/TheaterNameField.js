import * as React from 'react';
import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
    avatar: {
        marginRight: theme.spacing(1),
        marginTop: -theme.spacing(0.5),
        marginBottom: -theme.spacing(0.5),
    },
}));


const FullNameField = (props) => {
    const { record } = props;
    const classes = useStyles();
    return record ? (
        <div className={classes.root}>
            {record.name}
        </div>
    ) : null;
};

FullNameField.defaultProps = {
    source: 'last_name',
    label: 'resources.customers.fields.name',
};

export default memo(FullNameField);
