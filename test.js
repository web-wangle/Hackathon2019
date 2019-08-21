/**
 * 
 * 遗留问题 由于打开内置浏览器时长较长，this.timeout(10 * 1000);函数可能超时，
 * 设置为20S则不会报错，此问题需要解决  
 */

const Nightmare = require('nightmare')
const expect = require('chai').expect
const nightmare = Nightmare({
  show: false,
})

describe('打开10086店铺页', function() {
  // 用例超时时长
  this.timeout(10 * 1000);
  it('页面是否存在轮播图', function(done) {
    nightmare
      //  打开页面地址
      .goto('http://wx.10086.cn/website/businessPlatform/shop?pageid=8471b72213da4edc8ac04306b8f79b97')
      // 等待该元素出现
      .wait('.shopContent')
      //  浏览器内执行函数
      .evaluate(function () {
        //  获取class是banner的个数
        var bannerLen = $('.banners-container').length;
				return {
					bannerLen: bannerLen
				};
			})
			.end()
			.then((res) => {
        // 断言~~个数是否大于0
				expect(res.bannerLen).to.above(0);
				done();
			})
			.catch((err) => {
				done(err);
			})
  })
})
