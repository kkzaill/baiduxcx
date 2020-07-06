const App = getApp()
Page({
    data: {
        fds: '',
        items:[],
        ban:false,
        navName: [],
        sv:false,
        idx:'',
        id:'one',
        sl:0,
        tc: true,
        sorh:false,
        list:[],
        xinxian:[],
        height: '',
        load: false,
        class_id:0,
        document_id:0,
        title: '',
    },
    goIndex (e) {
        this.setData({
            ban:false,
            load: false,
         });

        let index = e.currentTarget.dataset.index;
        const id = e.currentTarget.id
         swan.request({
            url: 'https://api.zhiding.cn/baidu/scrollimg', // 仅为示例，并非真实的接口地址
            method: 'GET',
            data:{
                class_id:id
            },
            success: (res)=> {
                if(res.statusCode == 200){
                    // 列表显示 请求初始化数据
                     this.setData({
                       items:res.data.list,
                    });
                }
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        this.setData({
            class_id: id,
        })
        const tit = this.data.navName.filter(item => item.id === String(id))[0].name
        swan.setNavigationBarTitle({
            title:tit
        });
        var left = e.currentTarget.offsetLeft
        swan.request({
            url: 'https://api.zhiding.cn/baidu/alist', // 仅为示例，并非真实的接口地址
            method: 'GET',
            data:{
               class_id:this.data.class_id,
               document_id:0
            },
            success: (res)=> {
                if(res.statusCode == 200){
                    this.setData({
                        list: res.data.list,
                        document_id:res.data.min
                    })
                    setTimeout(()=>{
                        this.setData({
                            tc: false,
                            sorh:true,
                            ban:true,
                            load: true,
                        });
                    },400)
                }
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        this.setData({ 
            idx: index,
            tc: true,
            sorh:false,
            load:false,
        });
        setTimeout(()=>{
          this.setData({
            sl: left-90,
          });
        }, 400);
   }, 
   xq(e){
       console.log(e.currentTarget.dataset['id'])
       const id = e.currentTarget.dataset['id']
   },
    onLoad: function () {
        // 监听页面加载的生命周期函数
        // 列表导航
        
        swan.request({
            url: 'https://api.zhiding.cn/baidu/scrollimg', // 仅为示例，并非真实的接口地址
            method: 'GET',
            data:{
                class_id:0
            },
            success: (res)=> {
                if(res.statusCode == 200){
                    // 列表显示 请求初始化数据
                     this.setData({
                       items:res.data.list,
                    });
                }
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        swan.request({
            url: 'https://api.zhiding.cn/baidu/nav', // 仅为示例，并非真实的接口地址
            method: 'POST',
            success: (res)=> {
                if(res.statusCode == 200){
                   var navList = res.data
                   swan.setNavigationBarTitle({
                        title:res.data[0].name
                    });
                   this.setData({
                       navName:navList,
                       sv:true
                    });
                    // 列表显示 请求初始化数据
                    swan.request({
                        url: 'https://api.zhiding.cn/baidu/alist', // 仅为示例，并非真实的接口地址
                        method: 'GET',
                        data:{
                        class_id:0,
                        document_id:0
                        },
                        success: (res)=> {
                            if(res.statusCode == 200){
                                this.setData({
                                    list: res.data.list,
                                    document_id:res.data.min
                                })
                                setTimeout(()=>{
                                    this.setData({
                                        load: true,
                                        tc: false,
                                        sorh:true,
                                        ban:true,
                                    });
                                },400)
                            }
                        },
                        fail: function (err) {
                            console.log('错误码：' + err.errCode);
                            console.log('错误信息：' + err.errMsg);
                        }
                    });
                }
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
        var height = App.globalData.height*2+20
        this.setData({
            height:height
         });
    },
    onShow: function() {
        // 监听页面显示的生命周期函数
    },
    onHide: function() {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function() {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function() {
        // 监听用户下拉动作
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
       swan.request({
            url: 'https://api.zhiding.cn/baidu/alist', // 仅为示例，并非真实的接口地址
            method: 'GET',
            data:{
               class_id:this.data.class_id,
               document_id:this.data.document_id
            },
            success: (res)=> {
                if(res.statusCode == 200){
                    console.log(res.data.st)
                    if(res.data.st == 'Error'){
                        this.setData({
                            load:false,
                        })
                        swan.showToast({
                            title: '没有更多啦',
                        })
                    }else{
                        var oldData = this.data.list
                        this.setData({
                            load:true,
                            list: oldData.concat(res.data.list),
                            document_id:res.data.min,
                        })
                    }
                }
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});