<template>
	<view>
		<!-- 左侧消息 -->
		<view class="im-flex cell" v-if="msg.flow === 'in'">
			<image
				src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1141259048,554497535&fm=26&gp=0.jpg"
				style="width: 90rpx;height: 90rpx;"
				class="round"
				mode="aspectFill"
			></image>
			<view>
				<view class="im-flex">
					<image src="/static/easy-chat/chat/leftarrow.png" style="width: 40rpx;height: 40rpx;margin-top: 25rpx;" mode="aspectFill"></image>
					<view class="leftMsg">
						<text class="text" style="max-width: 450rpx;min-width:210rpx;">{{ msg.text }}</text>
					</view>
				</view>
				<text class="leftDate">{{msg.time | formatTime}}</text>
			</view>
		</view>
		<!-- 右侧消息 -->
		<view class="im-flex cell" style="justify-content: flex-end;" v-else>
			<view>
				<view class="im-flex">
					<view class="rightMsg">
						<text class="text" style="max-width: 450rpx;min-width:210rpx;">{{ msg.text }}</text>
					</view>
					<image src="/static/easy-chat/chat/rightarrow.png" style="width: 40rpx;height: 40rpx;margin-top: 25rpx;" mode="aspectFill"></image>
				</view>
				<text class="rightDate">{{msg.time | formatTime}}</text>
			</view>
			<image
				src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3892521478,1695688217&fm=26&gp=0.jpg"
				style="width: 90rpx;height: 90rpx;"
				class="round"
				mode="aspectFill"
			></image>
		</view>
	</view>
</template>

<script>
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
require('dayjs/locale/zh-cn')
export default {
	props: {
		msg: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	filters: {
		formatTime(n) {
			if (dayjs(n).isAfter(dayjs().subtract(24, 'hour'))) {
				return dayjs(n).locale('zh-cn').fromNow()
			} else {
				return dayjs(n).format('YYYY/MM/DD HH:mm')
			}
			
		}
	}
}
</script>

<style scoped>
.cell {
	margin-top: 40rpx;
	padding: 0 20rpx;
}

.leftMsg,
.rightMsg {
	padding: 20rpx;
	border-radius: 10rpx;
	margin-top: 10rpx;
	flex: 1;
}

.leftMsg {
	background-color: #fff;
	margin-left: -15rpx;
}

.rightMsg {
	background-color: #96eb6a;
	margin-right: -15rpx;
}

.text {
	font-size: 30rpx;
	flex: 1;
	line-height: 42rpx;
}

.leftDate,
.rightDate {
	font-size: 24rpx;
	color: #999;
	margin-top: 10rpx;
}

.leftDate {
	margin-left: 40rpx;
}

.rightDate {
	margin-left: 20rpx;
}

.errMsg {
	background-color: rgba(0, 0, 0, 0.1);
	padding: 10rpx 40rpx;
	border-radius: 5px;
	color: #fff;
	font-size: 30rpx;
	margin: 40rpx 0;
}

.round {
	border-radius: 100;
}
</style>
