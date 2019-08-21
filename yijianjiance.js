const Nightmare = require('nightmare')
const expect = require('chai').expect
const nightmare = Nightmare({
  show: true,
})
const phone = '' //配置免登录手机号

describe('流量场景测试', function() {
  this.timeout(20 * 1000)
  it('输入手机号并登录', function(done) {
    this.timeout(20 * 1000)
    nightmare
    .viewport(375, 667)
    .goto('http://wx.10086.cn/website/personalHome/new/onekeyDetection')
    .wait('#loginBtn')
    .type('#phone',phone)
    .click('#getMsg')
    .wait('.iptCont .msgs1')
    .type('#code','111111')
    .click('#loginBtn')
    .then((res) => {
      done();
    })
    .catch((err) => {
      done(err);
    })
  })

  it('检查流量告警', function(done) {
    this.timeout(10 * 1000)
    nightmare
    .wait('.flow')
    .wait(1000)
    .evaluate(function () {
      let txt = $('.flow .right span')
      return {
        txt: txt,
      }
    })
    .then((res) => {
      if(res.txt === '流量充足'){
        console.log('流量充足')
      }else if(res.txt === '流量不足'){
        console.log('流量不足')
      }
      done()
    })
    .catch((err) => {
      done('流量告警错误')
    })
  })

  it('检查查看按钮点击跳转', function(done) {
    this.timeout(10 * 1000)
    nightmare
    .wait('#checkServiceMargin')
    .click('#checkServiceMargin')
    .wait(1000)
    .evaluate(function () {
      let URL = window.location.href;
      return {
        URL: URL,
      }
    })
    .then((res) => {
      expect(res.URL).to.have.string('serviceMargin')
      done()
    })
    .catch((err) => {
      done('查看按钮点击跳转错误')
    })
  })
})

   describe('套餐场景测试', function(){
    it('检查办理套餐点击', function(done) {
      this.timeout(20 * 1000)
      nightmare
      .goto('http://wx.10086.cn/website/personalHome/new/onekeyDetection')
      .wait('.handleServiceMargin')
      .click('.handleServiceMargin')
      .wait(1000)
      .evaluate(function () {
        let URL = window.location.href;
        return {
          URL: URL,
        }
      })
      .then((res) => {
        console.log('办理套餐跳转地址：' + res.URL)
        expect(res.URL).to.have.string('universalShop')
        done()
      })
      .catch((err) => {
        done('套餐按钮点击错误')
      })
    })

    it('检查套餐详情', function(done) {
      this.timeout(20 * 1000)
      nightmare
      .goto('http://wx.10086.cn/website/personalHome/new/onekeyDetection')
      .wait(function(){
        if(['检测中','等待检测'].indexOf($('.setMeal .right span').eq(0).html()) == -1) return true
      })
      .evaluate(function () {
        let yuliang = ''
        let showArr = [];
        yuliang = $('.setMeal .right span').eq(0).html()
        let mealShow = $('.setMeal').find('.row:visible')
        if(mealShow.length == 0){showArr.push('无多余数据')}
        for(let i = 0; i< mealShow.length; i++){
          showArr.push(mealShow[i].innerText)
        }
        return {
          yuliang: yuliang,
          showArr: showArr
        }
      })
      .then((res) => {
        console.log('余量展示：' + res.yuliang)
        console.log(res.showArr)
        res.showArr.forEach(function(item){console.log(item)})
        expect(res.yuliang).to.equal('余量充足')
        done()
      })
      .catch((err) => {
        done('套餐详情检测错误')
      })
    })
    
    it('检查查看按钮点击', function(done) {
      this.timeout(20 * 1000)
      nightmare
      .goto('http://wx.10086.cn/website/personalHome/new/onekeyDetection')
      .wait('.row-r')
      .click('.row-r')
      .wait(1000)
      .evaluate(function () {
        let URL = window.location.href;
        return {
          URL: URL,
        }
      })
      .then((res) => {
        expect(res.URL).to.have.string('serviceMargin')
        done()
      })
      .catch((err) => {
        done('查看按钮点击错误')
      })
    })
  })
describe('话费场景测试', function() {
  it('检查话费状态提示', function(done) {
    this.timeout(20 * 1000)
    nightmare
    .goto('http://wx.10086.cn/website/personalHome/new/onekeyDetection')
    .exists('.fare .desc')
    .evaluate(function () {
      let fareNum = $('.fare .desc .desc-num').eq(0).html();
      let fareShow = $('.fare .right span').eq(0).html();
      return {
        fareNum: fareNum,
        fareShow: fareShow
      }
    })
    .then((res) => {
      if(res.fareNum >= 5){
        expect(res.fareShow).to.equal('话费充足')
      }else if(res.fareNum < 5){
        expect(res.fareShow).to.equal('话费不足')
      }
      done()
    })
    .catch((err) => {
      done('话费状态提示错误')
    })
  })
  it('检查高消费提示', function(done) {
    this.timeout(10 * 1000)
    nightmare
    .exists('.fare .r-tips')
    .evaluate(function () {
      let tips = $('.fare .r-tips .desc-text').eq(0).html();
      return {
        tips: tips,
      }
    })
    .then((res) => {
        expect(res.tips).to.equal('月消费最高，请自查')
      done()
    })
    .catch((err) => {
      done('高消费提示错误')
    })
  })
  it('检查充值按钮跳转', function(done) {
    this.timeout(20 * 1000)
    nightmare
    .wait('#recharge')
    .click('#recharge')
    .wait(1000)
    .evaluate(function () {
      let URL = window.location.href;
      return {
        URL: URL,
      }
    })
    .then((res) => {
      expect(res.URL).to.have.string('life.10085.cn')
      done()
    })
    .catch((err) => {
      done('充值按钮跳转错误')
    })
  })
  it('检查扣费详情按钮点击', function(done) {
    this.timeout(20 * 1000)
    nightmare
    .goto('http://wx.10086.cn/website/personalHome/new/onekeyDetection')
    .wait('#chargDetail')
    .click('#chargDetail')
    .wait(1000)
    .evaluate(function () {
      let URL = window.location.href;
      return {
        URL: URL,
      }
    })
    .then((res) => {
      let url = res.URL
      expect(url).to.have.string('fareBalance')
      done()
    })
    .catch((err) => {
      done('扣费详情按钮点击跳转错误')
    })
  })
  it('检查话费比例图', function(done) {
    this.timeout(20 * 1000)
    nightmare
    .goto('http://wx.10086.cn/website/personalHome/new/onekeyDetection')
    .exists('.fare .fare-detail')
    .wait(3000)
    .evaluate(function () {
      let allFare = [];
      let num = $('.fare-detail ul li').length
      for(let i=0;i<num;i++){
        let percent = $('.month-progress')[i].style.width
        if(percent == ''){percent = '0%'}
        allFare.push(percent.substring(0, percent.length - 1))
      }
      return {
        allFare: allFare,
      }
    })
    .then((res) => {
      let mostNum = parseFloat(res.allFare.sort().reverse()[0])
      expect(mostNum).to.be.within(0, 100)
      done()
    })
    .catch((err) => {
      done('话费比例图展示错误')
    })
  })

  it('检查初次进入预付费状态', function(done) {
    this.timeout(20 * 1000)
    nightmare
    .goto('http://wx.10086.cn/website/personalHome/new/onekeyDetection')
    .wait('.fare-detail')
    .wait(1000)
    .evaluate(function () {
      let changeTxt = $('.desc-text').html()
      return {
        changeTxt: changeTxt
      }
    })
    .then((res) => {
      expect(res.changeTxt).to.have.string('请自查')
      done()
    })
    .catch((err) => {
      done('初次进入预付费状态错误')
    })
  })

  it('检查后付费按钮点击弹窗展示', function(done) {
    this.timeout(20 * 1000)
    nightmare
    .click('.changeType')
    .wait(1000)
    .evaluate(function () {
      let toastShow = $('.toast').attr('class')
      return {
        toastShow: toastShow,
      }
    })
    .then((res) => {
      expect(res.toastShow).to.equal('toast')
      done()
    })
    .catch((err) => {
      done('后付费按钮点击未出现弹窗')
    })
  })
  it('检查弹窗文案', function(done) {
    this.timeout(10 * 1000)
    nightmare
    .evaluate(function () {
      let toastTxt = $('.tb-content .tb-item-title').eq(1).html()
      return {
        toastTxt: toastTxt,
      }
    })
    .then((res) => {
      expect(res.toastTxt).to.equal('后付费用户')
      done()
    })
    .catch((err) => {
      done('弹窗文案错误')
    })
  })
  it('检查上月消费金额提示', function(done) {
    this.timeout(10 * 1000)
    nightmare
    .click('.afterbutton')
    .evaluate(function () {
      let changeTxt = $('.desc-text').html()
      return {
        changeTxt: changeTxt
      }
    })
    .then((res) => {
      expect(res.changeTxt).to.have.string('上月消费')
      done()
    })
    .catch((err) => {
      done('上月消费金额提示错误')
    })
  })
  it('检查付费状态保存', function(done) {
    this.timeout(20 * 1000)
    nightmare
    .goto('http://wx.10086.cn/website/personalHome/new/onekeyDetection')
    .exists('.fare')
    .evaluate(function () {
      let changeTxt = $('.desc-text').html()
      return {
        changeTxt: changeTxt
      }
    })
    .then((res) => {
      expect(res.changeTxt).to.have.string('上月消费')
      done()
    })
    .catch((err) => {
      done('付费状态保存错误')
    })
  })
})

describe('积分场景测试', function() {
  this.timeout(20 * 1000)
  it('检查积分展示', function(done) {
    this.timeout(20 * 1000)
    nightmare
    .goto('http://wx.10086.cn/website/personalHome/new/onekeyDetection')
    .exists('.integral .desc span')
    .evaluate(function () {
      let integral = parseFloat($('.integral .desc span').eq(0).html())
      return {
        integral: integral,
      }
    })
    .then((res) => {
      expect(res.integral).to.above(-1);
      done()
    })
    .catch((err) => {
      done('积分展示错误')
    })
  })
  it('检查积分主页按钮点击', function(done) {
    this.timeout(20 * 1000)
    nightmare
    .click('.integral .button')
    .wait(1000)
    .evaluate(function () {
      let URL = window.location.href;
      return {
        URL: URL,
      }
    })
    .then((res) => {
      expect(res.URL).to.have.string('score')
      done()
    })
    .catch((err) => {
      done('积分主页按钮点击错误')
    })
  })
})

describe('和微币场景测试', function() {
  this.timeout(20 * 1000)
  it('检查和微币数量', function(done) {
    this.timeout(20 * 1000)
    nightmare
    .goto('http://wx.10086.cn/website/personalHome/new/onekeyDetection')
    .wait('.hvbnum')
    .wait(5000)
    .evaluate(function () {
      let hvbnum = parseInt($('.hvbnum').eq(0).html())
      console.log('222'+hvbnum)
      return {
        hvbnum: hvbnum,
      }
    })
    .then((res) => {
      console.log('11'+res.hvbnum)
      expect(res.hvbnum).to.above(-1)
      done()
    })
    .catch((err) => {
      done('和微币数量错误')
    })
  })
  it('检查和微币兑换提示', function(done) {
    this.timeout(20 * 1000)
    nightmare
    .wait(1000)
    .evaluate(function () {
      let hvbTxt = $('.hvb .right span').eq(0).html()
      return {
        hvbTxt: hvbTxt,
      }
    })
    .then((res) => {
      expect(res.hvbTxt).to.equal('有可兑换商品')
      done()
    })
    .catch((err) => {
      done('和微币兑换提示错误')
    })
  })
})

describe('悬浮按钮测试', function() {
  this.timeout(20 * 1000)
  it('悬浮按钮测试', function(done) {
    this.timeout(20 * 1000)
    nightmare
    .goto('http://wx.10086.cn/website/personalHome/new/onekeyDetection')
    .wait(function(){
      let waveNum = $('.wavetext-num').html()
      if(waveNum === '100') return true
    })
    .evaluate(function(){
      let waveTxt = $('.wavetext-desc').html()
      let wave = false
      if(waveTxt != '检测中'){wave = true}
      return{
        wave: wave
      }
    })
    .then((res) => {
      expect(res.wave).to.equal(true)
      done()
    })
    .catch((err) => {
      done('悬浮按钮展示错误')
    })
  })
})

describe('检测失败场景测试', function() {
  this.timeout(20 * 1000)
  it('检测失败', function(done) {
    this.timeout(20 * 1000)
    nightmare
    .goto('http://wx.10086.cn/website/personalHome/new/onekeyDetection')
    .wait('.integral')
    .evaluate(function () {
      let isDisShow = true
      let disShow = $('.main').find('.checkFail:visible')
      for(let i = 0; i< disShow.length; i++){
        if(disShow[i].innerText != '检测失败 重试'){
          isDisShow = false
        }
      }
      return {
        isDisShow: isDisShow
      }
    })
    .then((res) => {
      expect(res.isDisShow).to.equal(true)
      done()
    })
    .catch((err) => {
      done('检测失败按钮展示错误')
    })
  })
})