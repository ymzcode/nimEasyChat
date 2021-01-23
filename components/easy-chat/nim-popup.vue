<template>
	<view v-if="value" class="im-position-fixed im-top-0 im-left-0 im-bottom-0 im-right-0 im-flex-column im-flex-1 im-justify-center im-align-center im-bg-overlay" @tap="clickCancel">
		<view ref="imPopup" class="im-bg-white im-round-3" style="width: 600rpx;transform: scale(0);" @tap="onClick">
			<!-- 顶部标题 可自定义 -->
			<slot name="title">
				<view class="im-flex im-align-center im-py-2 im-px-3">
					<text class="im-font-34 im-font-black-2">{{ title }}</text>
				</view>
			</slot>
			
			<!-- 弹出框内容 可自定义 -->
			<slot>
				<view class="im-flex im-align-center im-pb-2 im-px-3">
					<text class="im-font-28 im-font-black-2">内容</text>
				</view>
			</slot>
			
			<!-- 底部按钮组 可自定义 -->
			<slot name="bottomBtn">
				<view class="im-flex im-align-center im-border-top" style="height: 90rpx;">
					<view class="im-flex im-align-center im-justify-center im-flex-1 im-py-4" hover-class="im-bg-grey-3" @tap="clickCancel">
						<text :class="successClass">{{ cancelText }}</text>
					</view>
					<view style="width: 1px;height: 90rpx; background-color: #dee2e6;"></view>
					<view class="im-flex im-align-center im-justify-center im-flex-1 im-py-4" hover-class="im-bg-grey-3" @tap="clickOk">
						<text :class="cancelClass">{{ successText }}</text>
					</view>
				</view>
			</slot>
		</view>
	</view>
</template>

<script>
	const animation = uni.requireNativePlugin('animation');
	// 动画执行时间
	const ANTIME = 250
	
	
	export default {
		inheritAttrs:false,
		props: {
			// 确定按钮的文字
			successText: {
				type: String,
				default: '确定'
			},
			// 确定按钮的文字样式
			successClass: {
				type: String,
				default: 'im-font-light im-font-34'
			},
			// 取消按钮的文字
			cancelText: {
				type: String,
				default: '取消'
			},
			// 取消按钮的文字样式
			cancelClass: {
				type: String,
				default: 'im-font-blue-2 im-font-34'
			},
			// 标题
			title: {
				type: String,
				default: '标题'
			},
			// 双向绑定
			value: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			value(n) {
				if (n) {
					this.popupShowAn()
				}
			}
		},
		methods: {
			onClick(e) {
				e.stopPropagation()
			},
			clickCancel(e) {
				e.stopPropagation()
				console.log('点击取消');
				this.popupHideAn()
			},
			clickOk(e) {
				// console.log('点击确定');
				this.$emit('clickOk')
				e.stopPropagation()
			},
			popupShowAn() {
				let _self = this
				_self.$nextTick(function(){
					animation.transition(
						_self.$refs.imPopup,
						{
							styles: {
								transform: 'scale(1)'
							},
							duration: ANTIME, //ms
							timingFunction: 'ease',
							needLayout: false,
							delay: 0 //ms
						},
						function() {
							// console.log('动画走完了');
						}
					);
				})
			},
			popupHideAn() {
				let _self = this
				_self.$nextTick(function(){
					animation.transition(
						_self.$refs.imPopup,
						{
							styles: {
								transform: 'scale(0)'
							},
							duration: ANTIME, //ms
							timingFunction: 'ease',
							needLayout: false,
							delay: 0 //ms
						},
						function() {
							// console.log('动画走完了');
							_self.$emit('clickCancel')
							_self.$emit('input', false)
						}
					);
				})
			}
		}
	}
</script>

<style>
</style>
