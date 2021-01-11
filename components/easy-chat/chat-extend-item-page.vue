<template>
	<view class="im-flex-column">
		<swiper class="im-bottom-menu-box" :circular="false" :indicator-dots="true" indicator-active-color="#ffffff">
			<swiper-item v-for="(swiper, index) in main_menuList" :key="index" class="im-flex im-flex-wrap im-align-start im-py-2">
				<view class="im-flex-column im-align-center im-ml-3 im-mb-2" v-for="(item, index2) in swiper" :key="item.id">
					<view @tap="clickMenu(item)" class="im-bg-white im-p-4 im-round-2" hover-class="im-bg-grey-3">
						<image src="/static/logo.png" mode="aspectFill" style="width: 70rpx;height: 70rpx;"></image>
					</view>
					<text @tap="clickMenu(item)" class="im-font-28 im-mt-1 im-font-black">{{ item.name }}</text>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
let debounce = function(fn, wait = 500, isImmediate = false) {
	let timerId = null;
	let flag = true;
	if (isImmediate) {
		return function() {
			clearTimeout(timerId);
			if (flag) {
				fn.apply(this, arguments);
				flag = false;
			}
			timerId = setTimeout(() => {
				flag = true;
			}, wait);
		};
	}
	return function() {
		console.log(timerId);
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			fn.apply(this, arguments);
		}, wait);
	};
};
export default {
	data() {
		return {
			menuList: [
				{
					id: 1,
					name: '照片',
					icon: '',
					identity: ''
				},
				{
					id: 2,
					name: '视频',
					icon: '',
					identity: ''
				},
				{
					id: 3,
					name: '语音通话',
					icon: '',
					identity: ''
				},
				{
					id: 4,
					name: '视频通话',
					icon: '',
					identity: ''
				},
				{
					id: 5,
					name: '文件',
					icon: '',
					identity: ''
				},
				{
					id: 6,
					name: '阅后即焚',
					icon: '',
					identity: ''
				},
				{
					id: 7,
					name: '投票消息',
					icon: '',
					identity: 'votes'
				},
				{
					id: 8,
					name: '投票消息',
					icon: '',
					identity: ''
				},
				{
					id: 9,
					name: '投票消息',
					icon: '',
					identity: ''
				},
				{
					id: 10,
					name: '投票消息',
					icon: '',
					identity: ''
				}
			]
		};
	},
	methods: {
		clickMenu: getApp().globalData.debounce(
			(item) => {
				console.log(item);
				let type = item.identity || '';
				switch (type) {
					case 'votes':
						console.log('点击投票');
						break;
				}
			},500),
		handleItem(item) {
			console.log(item);
			let type = item.identity || '';
			switch (type) {
				case 'votes':
					console.log('点击投票');
					break;
			}
		}
	},
	computed: {
		main_menuList() {
			let newArr = [];
			for (let i = 0; i < this.menuList.length; i += 8) {
				newArr.push(this.menuList.slice(i, i + 8));
			}
			console.log(newArr);
			return newArr;
		}
	}
};
</script>

<style scoped></style>
