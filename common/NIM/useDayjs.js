// 引入dayjs 过滤时间
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
require('dayjs/locale/zh-cn')

let useDayjs = {
	// 只友好化显示24小时内的日期
	formatRelative24(time) {
		if (!time) {
			return null
		}
		if (dayjs(time).isAfter(dayjs().subtract(24, 'hour'))) {
			return dayjs(time).locale('zh-cn').fromNow()
		} else {
			return dayjs(time).format('YYYY/MM/DD HH:mm')
		}
	},
	// 普通格式化时间
	defaultFormat(time) {
		if (!time) {
			return null
		}
		return dayjs(time).format('YYYY/MM/DD HH:mm')
	}
}

export default useDayjs