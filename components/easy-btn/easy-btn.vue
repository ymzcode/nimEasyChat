<template>
	<view ref="easyBtn" hover-class="im-bg-black-1" class="im-flex im-bg-black-2 im-align-center im-justify-center" :style="btnStyle" @tap="onClick">
		<slot>
			<text class="im-font-30 im-font-white">{{ btnText }}</text>
		</slot>
	</view>
</template>

<script>
	const animation = uni.requireNativePlugin('animation');
	// 动画执行时间
	const ANTIME = 250
	
	export default {
		props: {
			animationMode: {
				type: String,
				default: 'scaleX'
			},
			btnText: {
				type: String,
				default: '按钮'
			}
		},
		computed: {
			btnStyle() {
				let style = ''
				switch(this.animationMode) {
					case 'scaleX':
						style  = 'transform: scaleX(0);'
						break;
				}
				
				return style
			}
		},
		mounted() {
			this.showAn()
		},
		onUnload() {
			this.hideAn()
		},
		methods: {
			onClick() {
				this.$emit('onClick')
			},
			showAn() {
				let _self = this
				_self.$nextTick(function(){
					animation.transition(
						_self.$refs.easyBtn,
						{
							styles: {
								transform: 'scaleX(1)'
							},
							duration: ANTIME, //ms
							timingFunction: 'ease',
							needLayout: false,
							delay: 200 //ms
						},
						function() {
							// console.log('动画走完了');
						}
					);
				})
			},
			hideAn() {
				let _self = this
				_self.$nextTick(function(){
					animation.transition(
						_self.$refs.easyBtn,
						{
							styles: {
								transform: 'scaleX(0)'
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
			}
		}
	}
</script>

<style>
</style>
