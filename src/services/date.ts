import dayjs from 'dayjs';
import Constant from './constant';

export default class Date {
  static isDayjs = (value) => value instanceof dayjs;

  static renderDayjs = (value) => (this.isDayjs(value) ? value : dayjs(value));

  static toDateStr = (value, format = Constant.DATE.D_M_Y) => this.renderDayjs(value).format(format);
}
