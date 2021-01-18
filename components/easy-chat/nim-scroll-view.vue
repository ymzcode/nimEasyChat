<template>
	<view class="im-flex-column im-flex-1" @touchend="clickScrollView">
		<scroll-view
			scroll-y="true"
			scroll-with-animation
			:scroll-top="scrollObj.top"
			@scrolltolower="loadMore"
			@scroll="scroll"
			ref="scrollView"
			style="direction: rtl;max-height: 100%;transform:rotate(180deg);-ms-transform:rotate(180deg);-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);-o-transform:rotate(180deg);"
		>
			<view style="height: 80rpx;"></view>

			<view>
				<view
					v-for="(item, index) in msgList"
					:key="item.idClient"
					style="direction: ltr;transform:rotate(180deg);-ms-transform:rotate(180deg);-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);-o-transform:rotate(180deg);"
				>
					
					<nim-chat-nim :msg="item" @longpress="longpress"></nim-chat-nim>
					
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
		
		<!-- 长按消息弹出框 -->
		<template v-if="isShowLongModel">
			<chat-longpress-model :longpressSize="longpressSize" :longpressMsg="longpressMsg"></chat-longpress-model>
		</template>
	</view>
</template>

<script>
import nimChatNim from '@/components/easy-chat/nim-chat-item.vue'
import chatLongpressModel from '@/components/easy-chat/chat-longpress-model.vue'

export default {
	data() {
		return {
			isLoadMore: false,
			scrollObj: {
				top: 0,
				oldTop: 0
			},
			pageSize: 0,
			isShowLongModel: false,
			longpressSize: {
				width: 0,
				height: 0,
				top: 0,
				bottom: 0,
				left: 0,
				right: 0
			},
			// 是否拦截touchend
			stopTouchend: false,
			// 长按选中的消息
			longpressMsg: {},
		};
	},
	components: {
		nimChatNim,
		chatLongpressModel
	},
	computed: {
		currentSessionMsg() {
			return this.$store.getters['initNim/currentSessionMsg'] || {};
		},
		currentSessionId() {
			return this.$store.getters['initNim/currentSessionId'];
		},
		msgList() {
			if (this.currentSessionMsg[this.currentSessionId]) {
				return this.currentSessionMsg[this.currentSessionId].sort(function(a, b) {
					return b.time < a.time ? -1 : 1;
				}).slice(0, this.pageSize);
			}
			return [];
		}
	},
	mounted() {
		this.loadMore();
	},
	methods: {
		scroll(e) {
			this.scrollObj.oldTop = e.detail.scrollTop
		},
		goTop(e) {
			this.scrollObj.top = this.scrollObj.oldTop;
			this.$nextTick(function() {
				this.scrollObj.top = 0;
			});
		},
		clickScrollView(e) {
			e.stopPropagation();
			if (this.stopTouchend) {
				this.stopTouchend = false
				return ;
			}
			this.$emit('clickScrollView');
			this.isShowLongModel = false
		},
		loadMore() {
			this.isLoadMore = true;
			console.log('加载更多··········', this.msgList[this.msgList.length - 1]);
			// 拉取云端的历史信息
			this.$store
				.dispatch('initNim/nimGetHistoryMsgs', {
					scene: this.$attrs.scene,
					to: this.$attrs.to,
					lastMsgId: this.msgList[this.msgList.length - 1]&&this.msgList[this.msgList.length - 1].idServer,
					endTime: this.msgList[this.msgList.length - 1]&&this.msgList[this.msgList.length - 1].time,
				})
				.then(res => {
					console.log(res);
					this.isLoadMore = false;
					this.pageSize += 14
				})
				.catch(err => {
					console.error(err);
					this.isLoadMore = false;
				});
		},
		longpress(e) {
			console.log('元素', e);
			this.isShowLongModel = true
			this.longpressMsg = Object.assign({}, e.msg)
			this.longpressSize = Object.assign({}, e.getComponentRect.size)
			for(let i in this.longpressSize) {
				this.longpressSize[i] = parseInt(this.longpressSize[i])
			}
			this.stopTouchend = true
		}
	}
};
</script>

<style scoped>

</style>
