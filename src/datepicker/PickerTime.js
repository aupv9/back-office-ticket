import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useInput, FieldTitle } from 'ra-core';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
    KeyboardDatePicker, KeyboardTimePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const PickerTime = ({ PickerComponent, ...fieldProps }) => {

    const {
        options,
        label,
        source,
        resource,
        className,
        isRequired,
        providerOptions,
    } = fieldProps;

    const { input, meta } = useInput({ source });

    const { touched, error } = meta;

    const handleChange = useCallback(value => {
        Date.parse(value) ? input.onChange(value.toISOString()) : input.onChange(null);
    }, []);

    return (
        <div className="picker">
            <MuiPickersUtilsProvider {...providerOptions}>
                <PickerComponent
                    {...options}
                    label={<FieldTitle
                        label={label}
                        source={source}
                        resource={resource}
                        isRequired={isRequired}
                    />}
                    margin="normal"
                    error={!!(touched && error)}
                    helperText={touched && error}
                    className={className}
                    value={input.value ? new Date(input.value) : null}
                    onChange={date => handleChange(date)}
                    onBlur={() => input.onBlur(input.value ? new Date(input.value).toISOString() : null)}
                />
            </MuiPickersUtilsProvider>
        </div>
    )
}

PickerTime.propTypes = {
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    labelTime: PropTypes.string,
    className: PropTypes.string,
    providerOptions: PropTypes.shape({
        utils: PropTypes.func,
        locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    }),
};

PickerTime.defaultProps = {
    input: {},
    isRequired: false,
    meta: { touched: false, error: false },
    options: {},
    resource: '',
    source: '',
    labelTime: '',
    className: '',
    providerOptions: {
        utils: DateFnsUtils,
        locale: undefined,
    },
};




export const TimeInput = props => <PickerTime PickerComponent={KeyboardTimePicker} {...props} />

