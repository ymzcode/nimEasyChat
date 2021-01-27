<template>
	<view class="">
		选择联系人
		<button type="default" @tap="add">添加人</button>
	</view>
</template>

<script>
	import handleBusiness from '@/common/NIM/handleBusiness.js'
	export default {
		data() {
			return {
				teamId: ''
			}
		},
		onLoad(event) {
			console.log(event);
			this.teamId = event.teamId
		},
		methods: {
			add() {
				console.log('添加成员');
				handleBusiness.team.addMember(this.teamId, '137')
				uni.navigateBack()
			}
		}
	}
</script>

<style>
</style>
