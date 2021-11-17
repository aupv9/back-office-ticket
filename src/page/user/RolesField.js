import * as React from 'react';
import Chip from '@material-ui/core/Chip';
import {ReferenceField, useTranslate} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    main: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: -8,
        marginBottom: -8,
    },
    chip: { margin: 4 },
});

const RolesField = ({ record }) => {
    const translate = useTranslate();
    const classes = useStyles();


    return record ? (
        <span className={classes.main}>
            {record.roleIds &&
            record.roleIds.map(roleId => {

                return roleId ? (
                    <ReferenceField reference={""} source={"roleIds"}>
                        <Chip
                            // size="small"
                            // key={segment.id}
                            // className={classes.chip}
                            // label={translate(segment.name)}
                            resource={"name"}
                        />
                    </ReferenceField>

                ) : null;
            })}
        </span>
    ) : null;
};

RolesField.defaultProps = {
    addLabel: true,
    source: 'groups',
};

export default RolesField;
