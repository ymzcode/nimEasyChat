<template>
	<view class="im-position-fixed im-flex-column im-align-center im-py-2" :style="longModelStyle" style="opacity: 0.95;width: 580rpx;height: 300rpx;">
		<view class="im-bg-black-1 im-flex-column im-round-2 im-p-1 im-py-2 im-position-relative">
			<!-- 里面的每一项 -->
			<view v-for="(item, index) in menuItem" :key="index" class="im-flex im-align-center">
				<view v-for="item2 in item" :key="item2.id" class="im-flex-column im-align-center im-mx-2 im-mt-1" @tap="onClick(item2, $event)">
					<image :src="item2.icon" mode="aspectFill" style="width: 40rpx;height: 40rpx;"></image>
					<text class="im-font-23 im-font-white im-mt-1">{{item2.text}}</text>
				</view>
			</view>
		</view>
		<image class="im-position-absolute" :src="longpressModelObj.icon" :style="longpressModelObj.iconStyle" mode="aspectFill"
		 style="width: 30rpx;height: 30rpx;"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 弹出框的箭头图片
				longpressModelObj: {
					icon: '/static/easy-chat/chat/arrow-down.png',
					iconStyle: 'bottom:0'
				}
			}
		},
		methods: {
			copy() {
				uni.setClipboardData({
				    data: this.longpressMsg.text,
				    success: () => {
				        uni.showToast({
				            title: '复制成功',
				            icon: 'none'
				        });
				    }
				});
				console.log('复制');
			},
			translate() {
				console.log('翻译');
			},
			delete() {
				console.log('删除');
				this.$store.dispatch('initNim/nimDeleteMsgSelf', {
					msg: this.longpressMsg
				})
			},
			voiceToText() {
				console.log('语音转文字');
				this.$store.dispatch('initNim/nimAudioToText', {
					url: this.longpressMsg.file.url
				})
			},
			withdraw() {
				console.log('撤回');
				this.$store.dispatch('initNim/nimDeleteMsg', {
					msg: this.longpressMsg
				})
			},
			onClick(item, event) {
				console.log('点击菜单项', item);
				this.$emit('clickScrollView', event)
				switch(item.id) {
					case 'copy':
						this.copy()
						break;
					case 'translate':
						this.translate()
						break;
					case 'delete':
						this.delete()
						break;
					case 'voiceToText':
						this.voiceToText()
						break;
					case 'withdraw':
						this.withdraw()
						break;
				}
			}
		},
		computed: {
			// 弹出的菜单项
			menuItem() {
				let arr = []
				let type = this.longpressMsg.type
				
				if (type === 'text') {
					arr.push({
						text: '复制',
						icon: '/static/logo.png',
						id: 'copy'
					})
					arr.push({
						text: '翻译',
						icon: '/static/logo.png',
						id: 'translate'
					})
				}
				
				if (type === 'audio') {
					arr.push({
						text: '转文字',
						icon: '/static/logo.png',
						id: 'voiceToText'
					})
				}
				
				if (this.longpressMsg.flow === 'out') {
					arr.push({
						text: '撤回',
						icon: '/static/logo.png',
						id: 'withdraw'
					})
				}
				
				arr.push({
					text: '删除',
					icon: '/static/logo.png',
					id: 'delete'
				})
				
				let dataList = [];
				// 切割数组为二维数组 每行6个
				for(let i = 0; i < arr.length; i+=6) {
					dataList.push(arr.slice(i,i+6))
				}
				console.log('最后的数组', dataList);
				
				return dataList
			},
			longpressMsg() {
				return this.$attrs.longpressMsg
			},
			longpressSize() {
				return this.$attrs.longpressSize
			},
			// 长按弹出框的样式
			longModelStyle() {
				let style = ''
				// 偏移的距离
				let offleft = (290 - this.longpressSize.width) / 2
				// 消息中间的位置
				let msgCenterPoint = this.longpressSize.left
				// 判断上下
				if (this.longpressSize.top > 150) {
					style += `top: ${this.longpressSize.top - 140}px;`
					style += `justify-content:flex-end;`;
					// 设置箭头
					this.longpressModelObj.icon = '/static/easy-chat/chat/arrow-down.png'
					this.longpressModelObj.iconStyle = `bottom: 0;`
				} else {
					style += `top: ${this.longpressSize.top + this.longpressSize.height + 20}px;`
					style += `justify-content:flex-start;`;
					// 设置箭头
					this.longpressModelObj.icon = '/static/easy-chat/chat/arrow-up.png'
					this.longpressModelObj.iconStyle = `top: 0;`
				}
				// 判断左右
				if (offleft > 30) {
					this.longpressMsg.flow === 'out' ? style += `right: 20px` : style += `left: 20px`
				} else {
					this.longpressMsg.flow === 'out' ? style += `right:${this.longpressSize.left - offleft}px;` : style += `left:${this.longpressSize.left - offleft}px;`
				}
				
				return style
			}
		}
	}
</script>

<style>
</style>
