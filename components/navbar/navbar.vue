<template>
  <view>
    <view class="navbar-container">
      <image class="backarrow" src="../../static/login/backarrow.png" @click="onClickLeft"></image>
    </view>
  </view>
</template>


<script>
  export default {
    methods: {
      onClickLeft() {
        console.log('clicked left')
        // 点击左侧的按钮，返回上一页，实现回退的效果
        uni.navigateBack()
      }
    }
  }
</script>


<style lang="scss" scoped>
  .navbar-container {
    margin-top: 110rpx;
    height: 70rpx;
    background-color: #232436;
  }

  .navbar-container .backarrow {
    margin-left: 55upx;
	height: 35rpx;
	width: 20rpx;
  }
</style>