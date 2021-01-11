<template>
	<view v-if="$attrs.show" class="im-flex-column im-border-top" style="height: 450rpx;">
		<chat-extend-item-page v-if="$attrs.type === 'extend'"></chat-extend-item-page>
		<chat-emoji-item-page v-else-if="$attrs.type === 'emoji'"></chat-emoji-item-page>
	</view>
</template>

<script>
import chatExtendItemPage from '@/components/easy-chat/chat-extend-item-page.vue'
import chatEmojiItemPage from '@/components/easy-chat/chat-emoji-item-page.vue'

export default {
	data() {
		return {
			type: this.$attrs.type,
			show: this.$attrs.show
		}
	},
	components: {
		chatExtendItemPage,
		chatEmojiItemPage
	}
}
</script>

<style>
</style>
