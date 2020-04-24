<template>
  <baidu-map class="map" :center="center" :zoom="zoom" :scroll-wheel-zoom="true" @ready="handler">
  </baidu-map>
</template>

<script>
  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
      
    },
    data() {
    //这里存放数据
        return {
          center: {
            lng: 116.404, 
            lat: 39.915
          },
          zoom: 15,
          locData:{
              longitude:'',
              latitude:'',
              address:'',
          }
        };
    },
    //方法集合
    methods: {
      handler ({BMap, map}) {
          let _this = this;	// 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function(r){
              console.log(r);
              _this.center = {lng: r.longitude, lat: r.latitude};		// 设置center属性值
              _this.autoLocationPoint = {lng: r.longitude, lat: r.latitude};		// 自定义覆盖物
              _this.initLocation = true;
          },{enableHighAccuracy: true})

          window.map = map;
      },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
      
    },
  }
</script>
<style lang='less' scoped>
/* @import url(); 引入公共css类 */

</style>
