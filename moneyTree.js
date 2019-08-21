/*
* 摇钱树
* */
const Nightmare = require('nightmare')
const expect = require('chai').expect
var nightmare = Nightmare({
    show: true,
    autoHideMenuBar:false
})
describe('摇钱树测试', function() {
    // 用例超时时长
    this.timeout(10 * 1000);
    it('提示新人引导蒙层', function(done) {
        nightmare
        //  打开页面地址
            .viewport(750, 867)
            .wait(1 * 1000)

            .goto('http://wx.10086.cn/hackertree/index?mobile=&nickname=')
            .evaluate(function () {
                let meta = document.createElement('meta');
                meta.content='width=750, user-scalable=no, target-densitydpi=device-dpi';
                meta.name='viewport';
                document.getElementsByTagName('head')[0].appendChild(meta);
            })
            //设置浏览器窗口大小
            // 等待该元素出现
            .exists('.guide_pop')

            .then((res) => {
                console.log(res)
                if(res){
                    return {
                        guideShow : true
                    }
                }else{
                    return {
                        guideShow : false
                    }
                }
            })
            .then((res) => {
                expect(res.guideShow).to.be.true
                done();
                console.log(res)
            })
            .catch((err) => {
                done('无提示新人引导层');
            })

    });
    it('蒙层点击', function(done){
        nightmare
            .exists('.guide_pop')
            .click('.guide_pop')
            .then((res) => {
                done();
            })
            .catch((err) => {
                done('无提示新人引导层点击');
            })
    });
    it('点击种树', function(done) {
        nightmare
            .exists('.tree_add')
            .click('.tree_add')
            .then((res) => {
                done();
            })
            .catch((err) => {
                done('已经有树苗了');
            })

    });
    it('检查头像，金币，昵称是否正常', function(done) {
        nightmare
            .exists('.tree_user_logo')
            .evaluate(() => {
                let imgSrc = $('.tree_user_logo img').attr('src');
                let goldNumber = parseInt($('.tree_user_jbNums').html());
                let userName = $('.tree_user_name .username').html();
                return {
                    imgSrc : imgSrc,
                    goldNumber : goldNumber,
                    userName : userName
                };
            })
            .then((res) => {
                console.log(res)
                expect(res.goldNumber).to.not.be.null;
                expect(res.imgSrc).to.not.equal('img/error.png');
                expect(res.userName).to.not.be.empty;
                done();
            })
            .catch((err) => {
                done('检查头像，金币，昵称有错误');
            })

    });
    it('右上角铃铛点击', function(done) {
        nightmare
            .wait(0.5*1000)
            .exists('.tree_ld')
            .click('.tree_ld')
            .evaluate(() => {
                let showtext = $('.zwdt_tips').html();
                return {
                    showtext : showtext,
                };
            })
            .then((res) => {
                done();
            })
            .catch((err) => {
                done('右上角铃铛点击出错');
            })

    });
    it('右上角铃铛关闭按钮', function(done) {
        nightmare
            .wait(0.5*1000)
            .exists('.sm_close1')
            .click('.sm_close1')

            .then((res) => {
                done();
            })
            .catch((err) => {
                done('右上角铃铛点击关闭出错');
            })
    });
    it('点击规则文案', function(done) {
        nightmare
            .wait(0.5*1000)
            .exists('.tree_strategy')
            .click('.tree_strategy')
            .then((res) => {
                done();
            })
            .catch((err) => {
                done('点击规则按钮出错');
            })
    });
    it('点击返回种树', function(done) {
        nightmare
            .wait(0.5*1000)
            .exists('#click_index')
            .click('#click_index')
            .then((res) => {
                done();
            })
            .catch((err) => {
                done('点击返回种树按钮出错');
            })
    });
    it('点击意见反馈', function(done) {
        nightmare
            .wait(0.5*1000)
            .exists('.tree_proposal')
            .click('.tree_proposal')
            .then((res) => {
                done();
            })
            .catch((err) => {
                done('点击意见反馈按钮出错');
            })
    });
    it('填写意见反馈', function(done) {
        nightmare
            .wait(0.5*1000)
            .exists('.opi_text')
            .type('.opi_text','这个摇钱树这个功能真是太棒了！！！！！！')
            .exists('.opi_pop .opi_btn')
            .click('.opi_pop .opi_btn')
            .wait(1.5*1000)
            .evaluate(() => {
                let submitStr = $('.suggest_bubble p').html();
                return {
                    submitStr : submitStr
                };
            })
            .then((res) => {
                console.log(res)
                if(res.submitStr.indexOf('提交一次')> -1){
                    done('提交重复');
                }else if(res.submitStr.indexOf('提交成功')>-1){
                    done();
                }else if(res.submitStr.indexOf('不能为空白')> -1){
                    done('提交建议不能为空白');
                }else{
                    done('填写意见反馈出错');
                }

            })
            .catch((err) => {
                done('填写意见反馈出错');
            })
    });
    it('关闭提交弹窗', function(done) {
        nightmare
            .wait(2*1000)
            .exists('.sm_close1')
            .click('.sm_close1')
            .then((res) => {
                done();
            })
            .catch((err) => {
                done('关闭提交弹窗出错');
            })
    });
    it('点击邀请好友', function(done) {
        nightmare
            .wait(0.5*1000)
            .exists('.zsbtn_1')
            .click('.zsbtn_1')
            .wait(1.5*1000)
            .click('.ranking_pop .ranking_foot .btn_5')
            .exists('.sharePop')
            .then((res) => {
                done();
            })
            .catch((err) => {
                done('点击邀请好友出错');
            })
    });
    it('关闭邀请好友弹窗', function(done) {
        nightmare
            .wait(1.5*1000)
            .exists('.sharePop')
            .click('.sharePop')
            .wait(0.5*1000)
            .click('.sm_close2')
            .then((res) => {
                done();
            })
            .catch((err) => {
                done('关闭邀请好友弹窗出错');
            })
    });
    it('点击做任务', function(done) {
        nightmare
            .wait(1.5*1000)
            .exists('.zsbtn_2')
            .click('.zsbtn_2')
            .evaluate(function () {
                $(".opi_pop").hide();
            })
            .then((res) => {
                done();
            })
            .catch((err) => {
                done('点击做任务出错');
            })
    });
    // it('每日免费领取点击', function(done) {
    //     nightmare
    //         .wait(1.5*1000)
    //         .exists('.task_pop .pop_conbg .btn_2')
    //         .click('.task_pop .pop_conbg .btn_2')
    //         .wait(1.5*1000)
    //         .exists('.rcWater_bubble')
    //         .then((res) => {
    //             if(res){
    //                 done();
    //             }else{
    //                 done('已经领过了');
    //             }
    //
    //         })
    //         .catch((err) => {
    //             done('每日免费领取点击出错');
    //         })
    // });
    it('关闭做任务弹窗', function(done) {
        nightmare
            .wait(1.5*1000)
            .exists('.sm_close2')
            .click('.sm_close2')
            .then((res) => {
                done();
            })
            .catch((err) => {
                done('关闭做任务弹窗出错');
            })
    });
    it('点击刷新', function(done) {
        nightmare
            .wait(1.5*1000)
            .exists('.reloadBtn')
            .click('.reloadBtn')
            .then((res) => {
                done();
            })
            .catch((err) => {
                done('点击刷新出错');
            })
    });

    it('点击浇水', function(done) {
        nightmare
            .wait(1.5*1000)
            .exists('.tree_jsbtn')
            .wait(0.5*1000)
            .click('.tree_jsbtn')
            .evaluate(function () {
                var txt = $(".tree_jdt_text").html();
                if(txt.indexOf('00')> -1){
                    done('正在等待浇水倒计时');
                }
            })
            .then((res) => {
                    done();
            })
            .catch((err) => {
                    done('点击浇水出错');
            })
    });
    it('点击市集', function(done) {
        nightmare
            .wait(1.5*1000)
            .exists('.zsbtn_4')
            .wait(0.5*1000)
            .click('.zsbtn_4')
            .evaluate(function () {
                $(".opi_pop").hide();
            })
            .wait(0.5*1000)
            .exists('.market_pop')
            .then((res) => {
                    done();
            })
            .catch((err) => {
                    done('点击市集出错');
            })
    });
    it('点击购买杀虫剂', function(done) {
        nightmare
            .wait(1.5*1000)
            .exists('.market_pop .btn_2')
            .wait(0.5*1000)
            .click('.market_pop .btn_2')
            .wait(0.5*1000)
            .then((res) => {
                done('购买杀虫剂出错');
            })
            .catch((err) => {
                done('购买杀虫剂出错');
            })
    });
    it('关闭市集弹窗', function(done) {
        nightmare
            .wait(1.5*1000)
            .exists('.sm_close2')
            .click('.sm_close2')
            .then((res) => {
                done();
            })
            .catch((err) => {
                done('关闭市集弹窗出错');
            })
    });
    it('点击兑换', function(done) {
        nightmare
            .wait(1.5*1000)
            .exists('.zsbtn_3')
            .wait(0.5*1000)
            .click('.zsbtn_3')
            .evaluate(function () {
                $(".opi_pop").hide();
                $('.market_pop').hide();
            })
            .wait(0.5*1000)
            .exists('.market_pop')
            .then((res) => {
                done();
            })
            .catch((err) => {
                done('点击兑换出错');
            })
    });
    it('点击去抽奖', function(done) {
        nightmare
            .wait(1.5*1000)
            .exists('.btn_1')
            .wait(0.5*1000)
            .evaluate(function () {
                $(".opi_pop").hide();
                $('.market_pop').hide();
                $(".exchange_item .btn_1").eq(0).click();
            })
            .then((res) => {
                done();
            })
            .catch((err) => {
                done('点击兑换出错');
            })
    });
    it('点击抽奖', function(done) {
        nightmare
            .wait(1.5*1000)
            .exists('.game_jb_nums')
            .wait(0.5*1000)
            .evaluate(function () {

                var gameNum = $(".game_jb_nums").html();
                console.log(gameNum)
                return {
                    gameNum : gameNum
                };
            })
            .then((res) => {
                console.log(res)
                expect(res.gameNum).to.be.above(0);
                done();
            })
            .catch((err) => {
                done('金币数量不够');
            })
    });
    it('点击返回种树', function(done) {
        nightmare
            .wait(1.5*1000)
            .goto('http://wx.6.cn/hackertree/index?mobile=&nickname=')
            .then((res) => {
                done();
            })
            .catch((err) => {
                done('点击返回种树出错');
            })
    });
    it('点击兑换记录', function(done) {
        nightmare
            .wait(1.5*1000)
            .exists('.zsbtn_3')
            .wait(0.5*1000)
            .click('.zsbtn_3')
            .wait(1.5*1000)
            .evaluate(function () {
                $(".opi_pop").hide();
                $('.market_pop').hide();
                $(".pop5_btn2").click();
            })
            .wait(1.5*1000)
            .click('.sm_close2')
            .wait(1.5*1000)
            .end()
            .then((res) => {
                done();
            })
            .catch((err) => {
                    done('点击兑换出错');
            })
    });
})