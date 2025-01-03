import { DatePickerProps } from "antd";

const dateFormat = 'DD.MM.YYYY';
export const customDateFormat: DatePickerProps['format'] = (value) => value.format(dateFormat);