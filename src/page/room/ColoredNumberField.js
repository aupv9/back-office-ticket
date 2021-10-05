import * as React from 'react';
import { NumberField, NumberFieldProps } from 'react-admin';

const ColoredNumberField = (props) =>
    props.record && props.source ? (
        props.record[props.source] > 500 ? (
            <span style={{ color: 'red' }}>
                <NumberField {...props} />
            </span>
        ) : (
            <NumberField {...props} />
        )
    ) : null;


export default ColoredNumberField;
