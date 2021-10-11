'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DateTimeInput = exports.TimeInput = exports.DateInput = undefined;

let _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { let source = arguments[i]; for (let key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

let _createClass = function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { let descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

let _react = require('react');

let _react2 = _interopRequireDefault(_react);

let _propTypes = require('prop-types');

let _propTypes2 = _interopRequireDefault(_propTypes);

let _raCore = require('ra-core');

let _materialUiPickers = require('material-ui-pickers');

let _dateFnsUtils = require('material-ui-pickers/utils/date-fns-utils');

let _dateFnsUtils2 = _interopRequireDefault(_dateFnsUtils);

let _MuiPickersUtilsProvider = require('material-ui-pickers/MuiPickersUtilsProvider');

let _MuiPickersUtilsProvider2 = _interopRequireDefault(_MuiPickersUtilsProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

let makePicker = function makePicker(PickerComponent) {
    let _makePicker = function (_Component) {
        _inherits(_makePicker, _Component);

        function _makePicker() {
            _classCallCheck(this, _makePicker);

            return _possibleConstructorReturn(this, (_makePicker.__proto__ || Object.getPrototypeOf(_makePicker)).apply(this, arguments));
        }

        _createClass(_makePicker, [{
            key: 'onChange',
            value: function onChange(date) {
                this.props.input.onChange(date);
                this.props.input.onBlur();
            }
        }, {
            key: 'render',
            value: function render() {
                let _this2 = this;

                let _props = this.props,
                    input = _props.input,
                    options = _props.options,
                    label = _props.label,
                    source = _props.source,
                    resource = _props.resource,
                    isRequired = _props.isRequired,
                    className = _props.className,
                    meta = _props.meta,
                    providerOptions = _props.providerOptions;
                let touched = meta.touched,
                    error = meta.error;


                return _react2.default.createElement(
                    'div',
                    { className: 'picker' },
                    _react2.default.createElement(
                        _MuiPickersUtilsProvider2.default,
                        providerOptions,
                        _react2.default.createElement(PickerComponent, _extends({}, options, {
                            label: _react2.default.createElement(_raCore.FieldTitle, {
                                label: label,
                                source: source,
                                resource: resource,
                                isRequired: isRequired
                            }),
                            margin: 'normal',
                            error: !!(touched && error),
                            helperText: touched && error,
                            ref: function ref(node) {
                                _this2.picker = node;
                            },
                            className: className,
                            value: input.value ? input.value : null,
                            onChange: function onChange(date) {
                                return _this2.onChange(date);
                            }
                        }))
                    )
                );
            }
        }]);

        return _makePicker;
    }(_react.Component);

    _makePicker.propTypes = {
        input: _propTypes2.default.object,
        isRequired: _propTypes2.default.bool,
        label: _propTypes2.default.string,
        meta: _propTypes2.default.object,
        options: _propTypes2.default.object,
        resource: _propTypes2.default.string,
        source: _propTypes2.default.string,
        labelTime: _propTypes2.default.string,
        className: _propTypes2.default.string,
        providerOptions: _propTypes2.default.shape({
            utils: _propTypes2.default.func,
            locale: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string])
        })
    };

    _makePicker.defaultProps = {
        input: {},
        isRequired: 'false',
        label: '',
        meta: { touched: false, error: false },
        options: {},
        resource: '',
        source: '',
        labelTime: '',
        className: '',
        providerOptions: {
            utils: _dateFnsUtils2.default,
            locale: undefined
        }
    };
    return _makePicker;
};

const DateInput = exports.DateInput = (0, _raCore.addField)(makePicker(_materialUiPickers.DatePicker));
const TimeInput = exports.TimeInput = (0, _raCore.addField)(makePicker(_materialUiPickers.TimePicker));
const DateTimeInput = exports.DateTimeInput = (0, _raCore.addField)(makePicker(_materialUiPickers.DateTimePicker));
