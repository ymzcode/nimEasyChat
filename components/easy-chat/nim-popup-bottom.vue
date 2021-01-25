<template>
	<view v-if="value" class="im-position-fixed im-top-0 im-left-0 im-bottom-0 im-right-0 im-flex-column im-flex-1 im-justify-center im-align-center im-bg-overlay" @tap="clickCancel">
		<view ref="imPopupBottom" class="im-bg-grey-1 im-position-absolute im-bottom-0 im-w-100" style="transform: translateY(100%);" @tap="onClick">
			
			<!-- 说明 -->
			<slot name="explain">
				<view class="im-bg-white im-flex im-justify-center im-align-center im-py-3 im-border-bottom im-px-2">
					<text class="im-font-28 im-font-light im-flex-1 im-text-center">{{ explainText }}</text>
				</view>
			</slot>
			
			<slot>
				<view class="im-bg-white im-flex im-justify-center im-align-center im-py-2" hover-class="im-bg-grey-3" @tap="clickOk">
					<text class="im-font-32 im-font-blue-2">{{ successText }}</text>
				</view>
			</slot>
			
			<!-- 取消按钮 -->
			<slot name="cancel">
				<view class="im-bg-white im-flex im-justify-center im-align-center im-py-2 im-border im-mt-2" hover-class="im-bg-grey-3" @tap="clickCancel">
					<text class="im-font-32 im-font-black-2">{{ cancelText }}</text>
				</view>
			</slot>
			
			<view style="height: 88rpx;">
				
			</view>
		</view>
	</view>
</template>

<script>
	const animation = uni.requireNativePlugin('animation');
	// 动画执行时间
	const ANTIME = 250
	
	export default {
		props: {
			cancelText: {
				type: String,
				default: '取消'
			},
			explainText: {
				type: String,
				default: '说明文字'
			},
			// 确定按钮的文字
			successText: {
				type: String,
				default: '确定'
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
						_self.$refs.imPopupBottom,
						{
							styles: {
								transform: 'translateY(0)'
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
						_self.$refs.imPopupBottom,
						{
							styles: {
								transform: 'translateY(100%)'
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
