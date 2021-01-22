<template>
	<nim-avatar v-if="$attrs.scene === 'p2p'" :account="$attrs.to"></nim-avatar>
	<team-avatar v-else :teamId="$attrs.to"></team-avatar>
</template>

<script>
	import nimAvatar from '@/components/easy-chat/nim-avatar.vue'
	import teamAvatar from '@/components/easy-chat/team-avatar.vue'
	
	export default {
		components: {
			nimAvatar,
			teamAvatar
		}
	}
</script>

<style>
</style>
