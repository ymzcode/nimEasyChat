<template>
	<view class="im-flex-column im-flex-1" @touchend="clickScrollView">
		<scroll-view
			scroll-y="true"
			scroll-with-animation
			@scrolltolower="loadMore"
			ref="scrollView"
			style="direction: rtl;max-height: 100%;transform:rotate(180deg);-ms-transform:rotate(180deg);-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);-o-transform:rotate(180deg);">
			<view style="height: 80rpx;"></view>
			
			<view>
				<view
					v-for="(item, index) in msgList"
					:key="item.idClient"
					style="direction: ltr;transform:rotate(180deg);-ms-transform:rotate(180deg);-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);-o-transform:rotate(180deg);">
					<!-- 左侧消息 -->
					<view class="im-flex cell" v-if="false">
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
									<text class="text" style="max-width: 450rpx;min-width:210rpx;">{{ item.text }}</text>
								</view>
							</view>
							<text class="leftDate">2020-07-07 12:12:{{ index }}</text>
						</view>
					</view>
					<!-- 右侧消息 -->
					<view class="im-flex cell" style="justify-content: flex-end;" v-else>
						<view>
							<view class="im-flex">
								<view class="rightMsg">
									<text class="text" style="max-width: 450rpx;min-width:210rpx;">{{ item.text }}</text>
								</view>
								<image src="/static/easy-chat/chat/rightarrow.png" style="width: 40rpx;height: 40rpx;margin-top: 25rpx;" mode="aspectFill"></image>
							</view>
							<text class="rightDate">2020-07-07 12:12:{{ index }}</text>
						</view>
						<image
							src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3892521478,1695688217&fm=26&gp=0.jpg"
							style="width: 90rpx;height: 90rpx;"
							class="round"
							mode="aspectFill"
						></image>
					</view>
				</view>
				<!-- loading加载 -->
				<view v-if="isLoadMore" class="im-flex im-justify-center im-py-2 im-align-center im-w-100">
					<text
						class="im-font-28"
						style="transform:rotate(180deg);-ms-transform:rotate(180deg);-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);-o-transform:rotate(180deg);"
					>加载中···</text>
				</view>
				
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isLoadMore: false
		};
	},
	computed: {
		currentSessionMsg() {
			return this.$store.getters['initNim/currentSessionMsg'] || {}
		},
		currentSessionId() {
			return this.$store.getters['initNim/currentSessionId']
		},
		msgList() {
			return this.currentSessionMsg[this.currentSessionId]
		}
	},
	mounted() {
		// 添加模拟数据
		let arr = [];
		for (let i = 0; i < 20; i++) {
			let json = {
				content: '你好' + i,
				id: i,
				is_sender: false
			};
			arr.push(json);
		}
		this.listData = arr;
	},
	methods: {
		clickScrollView(e) {
			this.$emit('clickScrollView')
			e.stopPropagation()
		},
		loadMore() {
			console.log('加载更多··········');
			this.isLoadMore = true
		}
	}
};
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
