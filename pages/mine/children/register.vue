<template>
	<view class="content">
		<!-- <view class="header">
			<image src="../../static/shilu-login/logo.png"></image>
		</view> -->
		<NavBar></NavBar>
		<view class="list">
			<view class="list-call">
				<image class="img" src="../../../static/register/phone.png"></image>
				<input class="biaoti" v-model="phone" type="number" maxlength="11" placeholder="手机号" placeholder-style="color:#c7c7c7"/>
			</view>
			<view class="list-call">
				<image class="img" src="../../../static/register/passwords.png"></image>
				<input class="biaoti" v-model="password" type="text" maxlength="32" placeholder="登录密码" placeholder-style="color:#c7c7c7" :password="!showPassword" />
				<image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" @tap="display"></image>
			</view>
			<view class="list-call">
				<image class="img" src="../../../static/register/yzm.png"></image>
				<input class="biaoti" v-model="code" type="number" maxlength="4" placeholder="验证码" placeholder-style="color:#c7c7c7"/>
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view>
			<!-- <view class="list-call">
				<image class="img" src="/static/shilu-login/4.png"></image>
				<input class="biaoti" v-model="invitation" type="text" maxlength="12" placeholder="邀请码" />
			</view> -->
			
		</view>
		
		<view class="dlbutton" hover-class="dlbutton-hover" @tap="bindLogin" v-if="phone != ''">
			<text>注册</text>
		</view>
		<view class="dlbutton-none"  v-else>
			<text>注册</text>
		</view>
		
		<view class="xieyi">
			<image @tap="xieyitong" :src="xieyi==true?'../../../static/register/unselect.png':'../../../static/register/select.png'"></image>
			<text @tap="xieyitong"> 同意</text>
			<navigator url="blog?id=1" open-type="navigate">《软件用户协议》</navigator>
		</view>
	</view>
</template>

<script>
	var tha,js;
	import NavBar from '@/components/navbar/navbar.vue'
	export default {
		onLoad(){
			tha = this;
		},
		onUnload(){
			clearInterval(js)
			this.second = 0;
		},
		data() {
			return {
				phone:'',
				password:'',
				code:'',
				invitation:'',
				xieyi:true,
				showPassword:false,
				second:0,
			};
		},
		computed:{
			yanzhengma(){
				if(this.second==0){
					return '获取验证码';
				}else{
					if(this.second<10){
						return '重新获取0'+this.second;
					}else{
						return '重新获取'+this.second;
					}
				}
			}
		},
		methods: {
			
			display() {
			    this.showPassword = !this.showPassword
			},
			xieyitong(){
				this.xieyi = !this.xieyi;
			},
			getcode(){
				if(this.second>0){
					return;
				}
				this.second = 60;
				uni.request({
				    url: 'http://***/getcode.html', //仅为示例，并非真实接口地址。
				    data: {
						phone:this.phone,
						code_type:'reg',
					},
					method: 'POST',
					dataType:'json',
				    success: (res) => {
						if(res.data.code!=200){
							uni.showToast({title:res.data.msg,icon:'none'});
						}else{
							uni.showToast({title:res.data.msg});
							js = setInterval(function(){
								tha.second--;
								if(tha.second==0){
									clearInterval(js)
								}
							},1000)
						}
				    }
				});
			},
		    bindLogin() {
				if (this.xieyi == false) {
				    uni.showToast({
				        icon: 'none',
				        title: '请先阅读《软件用户协议》'
				    });
				    return;
				}
				if (this.phone.length !=11) {
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
				if (this.code.length != 4) {
				    uni.showToast({
				        icon: 'none',
				        title: '验证码不正确'
				    });
				    return;
				}
				uni.request({
				    url: 'http://305g7h9125.wicp.vip/v1/lot/register',
				    data: {
						phone:this.phone,
						password:this.password,
						code:this.code,
						invitation:this.invitation
					},
					method: 'POST',
					dataType:'json',
				    success: (res) => {
						if(res.data.code!=200){
							uni.showToast({title:res.data.message,icon:'none'});
						}else{
							uni.showToast({title:res.data.message});
							
							setTimeout(function(){
								uni.navigateBack();
							},1500) 
						}
				    }
				});
				
		    }
		},
		components: {
		  NavBar
		}
	}
</script>

<style>
	@import url("./register.css");
</style>