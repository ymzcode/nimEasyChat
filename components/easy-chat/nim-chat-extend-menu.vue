<template>
	<view v-if="$attrs.show" class="im-flex-column im-border-top im-bottom-menu-box">
		<chat-extend-item-page v-if="$attrs.type === 'extend'"></chat-extend-item-page>
		<chat-emoji-item-page v-else-if="$attrs.type === 'emoji'" v-bind="$attrs" v-on="$listeners"></chat-emoji-item-page>
	</view>
</template>

<script>
import chatExtendItemPage from '@/components/easy-chat/chat-extend-item-page.vue'
import chatEmojiItemPage from '@/components/easy-chat/chat-emoji-item-page.vue'

export default {
	data() {
		return {
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
