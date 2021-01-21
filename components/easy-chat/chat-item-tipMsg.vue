<template>
	<view class="im-flex im-flex-wrap im-justify-center im-align-center im-my-3 im-px-5">
		<text class="im-text-center im-bg-grey-2 im-font-28 im-font-light im-round-1 im-p-1 im-flex im-flex-wrap" style="max-width: 620rpx;">{{ content }}</text>
	</view>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	mounted() {

	},
	computed: {
		content() {
			let text = '提醒消息'
			let msg = this.$attrs.msg
			if (this.isJSON(msg.tip)) {
				let tipContent = JSON.parse(msg.tip)
				let type = tipContent.type
				switch (type) {
					case 'deleteMsg':
						if (msg.flow === 'out') {
							text = '你撤回了一条消息'
						} else {
							text = `${msg.fromNick}撤回了一条消息`
						}
						break;
				}
			}
			return text
		}
	},
	methods: {
		// 判断一个字符串是否为 json格式
		isJSON(str) {
		    if (typeof str == 'string') {
		        try {
		            var obj=JSON.parse(str);
		            if(typeof obj == 'object' && obj ){
		                return true;
		            }else{
		                return false;
		            }

		        } catch(e) {
		            console.log('error：'+str+'!!!'+e);
		            return false;
		        }
		    }
		}
	}
}
</script>

<style></style>
