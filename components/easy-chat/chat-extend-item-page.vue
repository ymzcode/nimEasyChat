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
let _self = null;
export default {
	data() {
		return {
			menuList: [
				{
					id: 1,
					name: '图片',
					icon: '',
					identity: 'album'
				},
				{
					id: 2,
					name: '视频',
					icon: '',
					identity: 'shooting'
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
					name: '卡片消息',
					icon: '',
					identity: 'msgCard'
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
	mounted() {
		_self = this;
	},
	methods: {
		clickMenu: getApp().globalData.debounce(item => {
			console.log(item);
			let type = item.identity || '';
			switch (type) {
				case 'votes':
					console.log('点击投票');
					// 发送一个投票消息
					let votes_content = {
						type: 'votes',
						data: {
							// 跳转的地址
							url: '/pageBook?id=1002',
							// 标题
							title: '# 孙晓华发起投票',
							// 详细内容
							detail: '针对四川凉山处理结果的投票',
							// 封面
							cover: '/static/easy-chat/other/votes@2x.png'
						}
					};
					_self.$store.dispatch('initNim/nimSendCustomMsg', {
						scene: 'p2p',
						to: '137',
						content: JSON.stringify(votes_content)
					});
					break;
				case 'msgCard':
					// 发送一个卡片消息
					let msgCard_content = {
						type: 'msgCard',
						data: {
							// 跳转的地址
							url: '/pageBook?id=1001',
							// 标题
							title: '四川凉山西昌发生森林大火是什么原因引起的呢？',
							// 详细内容
							detail: '一大早就看到弹出新闻一大早就看到弹 出新闻一大早就看到弹出新闻一大早就 看到弹出新闻…',
							// 封面
							appName: '防火码'
						}
					};
					_self.$store.dispatch('initNim/nimSendCustomMsg', {
						scene: 'p2p',
						to: '137',
						content: JSON.stringify(msgCard_content)
					});
					break;
				case 'album':
					console.log('点击照片');
					uni.chooseImage({
						count: 3, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album', 'camera'], //从相册选择
						success: function(res) {
							console.log('从相册选择', res);
						},
						fail: err => {
							console.log('选择相册失败', err);
						}
					});
					break;
				case 'shooting':
					console.log('点击视频');
					uni.chooseVideo({
						count: 1,
						maxDuration: 60,
						sourceType: ['camera', 'album'],
						success: function(res) {
							console.log('视频选择', res);
						},
						fail: (err) => {
							console.log('选择视频失败', err);
						}
					});
					break;
			}
		}, 500)
	},
	computed: {
		main_menuList() {
			let newArr = [];
			for (let i = 0; i < this.menuList.length; i += 8) {
				newArr.push(this.menuList.slice(i, i + 8));
			}
			// console.log(newArr);
			return newArr;
		}
	}
};
</script>

<style scoped></style>
