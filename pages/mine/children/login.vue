<template>
	<view class="content">
		<!-- <view class="status_bar">
			这里是状态栏
		</view> -->
		<NavBar></NavBar>
		
		<view class="header">
			<view class="tittle">
				<text class="w1">
					世界很大
				</text>
				<text class="w2">
					可我们曾相遇
				</text>
				<view class="round1"></view>
				<view class="round2"></view>
				<view class="round3"></view>
				<view class="round4"></view>
				<view class="round5"></view>
				<view class="round6"></view>
			</view>
		</view>
		
		<view class="list">
			<view class="list-call1">
				<image class="img" src="@/static/login/phone.png"></image>
				
				<input 
				class="biaoti" 
				v-model="phone" 
				type="number" 
				maxlength="11" 
				placeholder="手机号码" 
				placeholder-style="color:#c7c7c7"
				confirm-type="next"/>
				
				<image 
				v-if="phone != ''" 
				class="img2" 
				src="../../../static/login/delete.png" 
				@click="clearphoneno()" ></image>
			</view>
			<view class="list-call2">
				<image class="img" src="@/static/login/passwords.png"></image>
				<input 
				class="biaoti" 
				v-model="password" 
				maxlength="32" 
				placeholder="输入密码" 
				:password="checked" 
				placeholder-style="color:#c7c7c7" 
				confirm-type="done"/>
				
				
				<image 
				class="img2" 
				src="../../../static/login/reveal.png" 
				v-if="password != ''" 
				@click="revealPassword()"></image>
			</view>
			
		</view>
		
		<view class="dlbutton" hover-class="dlbutton-hover" v-if="phone != ''" @tap="bindLogin()">
			<text>登录</text>
		</view>
		<view class="dlbutton-none"  v-else>
			<text>登录</text>
		</view>
		
		<view class="xieyi">
			<view class="forget">
				<navigator url="forget" open-type="navigate">忘记密码</navigator>
			</view>
			<text>|</text>
			<view class="register">
				<navigator class="register" url="register" open-type="navigate">注册账户</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	var tha;
	import {mapMutations} from 'vuex';
	import NavBar from '@/components/navbar/navbar.vue'
	export default {
		onLoad(){
			tha = this;
			// 手机app
			//#ifdef APP-PLUS
			this.getDeviceInfo();
			//#endif
			
			// H5 或者 微信小程序
			//#ifdef H5 || MP-WEIXIN
			uni.getSystemInfo({
			    success: function (res) {
			        console.log('model: '+res.model);   // 手机型号
			        console.log('pixe: '+res.pixelRatio); // 设备像素比
			        console.log('WindowWidth: '+res.windowWidth);  // 可使用窗口宽度
			        console.log('WindowHeight: '+res.windowHeight); // 可使用窗口高度
			        console.log('language: '+res.language);  // 应用设置的语言
			        console.log('version: '+res.version);   // 应用版本号
			        console.log('platform: '+res.platform);  // 客户端平台
			    }
			});
			//#endif
		},
		data() {
			return {
				phone:'',
				password:'',
				meid: '',
				desc: '',
				checked:true,
			};
		},
		methods: {
			...mapMutations(['login']),
			getDeviceInfo(){
				plus.device.getInfo({
					success:function(e){
						console.log('getDeviceInfo success: '+JSON.stringify(e));
						console.log('UUID: ',e.uuid);
					},
					fail:function(e){
						console.log('getDeviceInfo failed: '+JSON.stringify(e));
					}
				});
			},
		    bindLogin() {
				if (this.phone.length != 11) {
				     uni.showToast({
				        icon: 'none',
				        title: '手机号不正确'
				    });
				    return;
				}
		        if (this.password.length < 6) {
		            uni.showToast({
		                icon: 'none',
		                title: '密码不正确'
		            });
		            return;
		        }
				uni.request({
				    url: 'http://305g7h9125.wicp.vip/v1/lot/login',
				    data: {
						phone:this.phone,
						password:this.password
					},
					method: 'POST',
					dataType:'json',
				    success: (res) => {
						if(res.data.code!==200){
							console.log(res.data.message);
							uni.showToast({title:res.data.message,icon:'none'});
						}else{
							console.log(res.data);
							uni.setStorageSync('user_data', JSON.stringify(res.data.data.user));
							// try{
							// 	uni.setStorageSync('token', JSON.stringify(res.data.data.token));
							// }catch(e){
							// 	console.log(e)
							// }
							uni.setStorage({
								key: 'token',
								data: res.data.data.token,
								success() {
									console.log('success!')
								}
							});
							// this.login();
							// uni.navigateBack();
							let userInfo = res.data.data.user;
							if (userInfo){
								let promise = this.tim.login({
									userID: userInfo.id+'',
									userSig: userInfo.user_sig
								});
								promise.then((res) => {
									//登录成功后 更新登录状态
									this.$store.commit("toggleIsLogin", true);
									//自己平台的用户基础信息
									// uni.setStorageSync('userInfo', JSON.stringify(userInfo))
									//tim 返回的用户信息
									uni.setStorageSync('userTIMInfo', JSON.stringify(res.data))
									uni.reLaunch({
										url: '../tim/record'
									})
								}).catch((err) => {
									console.warn('login error:', err); // 登录失败的相关信息
								});
							}else {
								uni.showToast({
									icon: 'none',
									title: '用户不存在',
									duration: 1500
								});
							}
							
						}
				    }
				});
				
		    },
			clearphoneno(){
				this.phone = ""
			},
			revealPassword(){
				this.checked = !this.checked
			}
		},
		components: {
		  NavBar
		}
	}
	
	
	 
</script>

<style scoped>
	@import url("./login.css");
</style>
