import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AvatarField from './AvatarField';

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
    const { record, size } = props;
    const classes = useStyles();
    return record ? (
        <div className={classes.root}>
            <AvatarField
                className={classes.avatar}
                record={record}
                size={size}
            />
            {record.fullName}
        </div>
    ) : null;
};

FullNameField.defaultProps = {
    source: 'lastName',
    label: 'resources.customers.fields.name',
};

export default React.memo(FullNameField);
