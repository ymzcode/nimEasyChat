<template>
	<view v-if="$attrs.show" class="im-flex-column im-border-top">
		<chat-extend-item-page v-if="$attrs.type === 'extend'"></chat-extend-item-page>
	</view>
</template>

<script>
import chatExtendItemPage from '@/components/easy-chat/chat-extend-item-page.vue'
export default {
	data() {
		return {
			type: this.$attrs.type,
			show: this.$attrs.show
		}
	},
	components: {
		chatExtendItemPage
	}
}
</script>

<style>
</style>
