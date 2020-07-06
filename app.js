/**
 * @file app.js
 * @author swan
 */

/* globals swan */

App({
    globalData: {
         share: false,  // 分享默认为false
        //  height: 0,
    },
    onLaunch(options) {
        var that = this
        swan.getSystemInfo({
            success: function (res) {
                that.globalData.height = res.statusBarHeight
                swan.setStorage({
                    key:'he',
                    data: that.globalData.height,
                });
            },
        })
        
        // do something when launch
        // 添加到我的小程序引导，参见文档： http://smartprogram.baidu.com/docs/design/component/guide_add/
        if (swan.canIUse('showFavoriteGuide')) {
            swan.showFavoriteGuide({
                type: 'bar',
                content: '一键添加到我的小程序',
                success(res) {
                    console.log('添加成功：', res);
                },
                fail(err) {
                    console.log('添加失败：', err);
                }
            });
        }
    },
    onShow(options) {
        // do something when show
    },
    onHide() {
        // do something when hide
    }
});
