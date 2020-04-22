<template>
	<view class="map">
		
	</view>
</template>

<script>
	import Map from '@/utils/openMap.js'
	export default {
		data() {
			return {
				// wgs84
				latitude: 0.0000000,
				longitude: 0.0000000,
				/* 	// bd09
				latitude: 39.915547,
				longitude: 116.403909, */
				/* 	// gcj02
				latitude: 39.9091591069,
				longitude: 116.397478316, */
				name: ''
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
			});
			uni.getLocation({
			    type: 'wgs84',
			    success: function (res) {
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
					this.latitude = res.latitude;
					this.longitude = res.longitude;
					
			    }
			});
			// this.getLocationInfo();
			this.openMap();
			uni.hideLoading();
		},
		methods: {
			openMap() {
				Map.openMap(this.latitude, this.longitude, this.name, 'wgs84')
			}
			// getLocationInfo(){  
			// 	uni.getLocation({
			// 		type: 'wgs84',
			// 		success (res) {
			// 			console.log(res);
			// 			this.latitude = res.latitude
			// 			this.longitude = res.longitude
			// 		}
			// 	});
			// }
		}
	}
</script>

<style>
	.map{
		width: auto;
		height: auto;
	}
</style>
