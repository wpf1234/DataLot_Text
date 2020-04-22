<template>
	<view class="content">
		<NavBar></NavBar>
		
		<view class="tishi">若您忘记了密码，可在此重新设置新密码。</view>
		<view class="list">
			
			<view class="list-call">
				<image class="img" src="../../../static/login/phone.png"></image>
				<input class="biaoti" type="number" v-model="phoneno" maxlength="11" placeholder="请输入手机号" placeholder-style="color:#c7c7c7"/>
			</view>
			<view class="list-call">
				<image class="img" src="../../../static/login/passwords.png"></image>
				<input class="biaoti" type="text" v-model="password" maxlength="32" placeholder="请输入新密码" placeholder-style="color:#c7c7c7" :password="!showPassword" />
				<image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" @tap="display"></image>
			</view>
			<view class="list-call">
				<image class="img" src="../../../static/register/yzm.png"></image>
				<input class="biaoti" type="number" v-model="code" maxlength="4" placeholder="验证码" placeholder-style="color:#c7c7c7"/>
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view>
		</view>
		<view class="dlbutton" hover-class="dlbutton-hover" @tap="bindLogin()" v-if="phoneno != ''">
			<text>修改密码</text>
		</view>
		<view class="dlbutton-none"  v-else>
			<text>修改密码</text>
		</view>

	</view>
</template>

<script>
	var tha,js;
	import NavBar from '@/components/navbar/navbar.vue'
	export default {
		data() {
			return {
				phoneno:'',
				second:0,
				code:"",
				showPassword:false,
				password:''
			}
		},
		onLoad(){
			tha = this;
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
			getcode(){
				if(this.second>0){
					return;
				}
				
				uni.request({
				    url: 'http://***/getcode.html', //仅为示例，并非真实接口地址。
				    data: {phoneno:this.phoneno,code_type:'reg'},
					method: 'POST',
					dataType:'json',
				    success: (res) => {
						if(res.data.code!=200){
							uni.showToast({title:res.data.msg,icon:'none'});
							tha.second = 0;
						}else{
							uni.showToast({title:res.data.msg});
							tha.second = 60;
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
				if (this.phoneno.length != 11) {
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
				    url: 'http://***/forget.html',
				    data: {
						phoneno:this.phoneno,
						password:this.password,
						code:this.code
					},
					method: 'POST',
					dataType:'json',
				    success: (res) => {
						if(res.data.code!=200){
							uni.showToast({title:res.data.msg,icon:'none'});
						}else{
							uni.showToast({title:res.data.msg});
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
	@import url("./forget.css");
</style>
