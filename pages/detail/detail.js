const App = getApp()

Page({
    data: {
        nvabarData: {
            title: '',
        },
        list: {},
        height: '',
        name:'',
        article:'',
        imgUrl:'',
        tit: '',
        producer:'',
        dateorder:'',
        digest:'',
        url: '',
    },
    onLoad: function (options) {
        // 监听页面加载的生命周期函数
        const id = options.id;
         swan.request({
            url: 'https://api.zhiding.cn/baidu/article', // 仅为示例，并非真实的接口地址
            method: 'GET',
            data:{
               document_id:id
            },
            success: (res)=> {
                if(res.statusCode == 200){
                    const article =res.data.article_show.replace(/target=_blank/g, "")
                    .replace(/<img/g, "<img class = 'pho'")
                    .replace(/<h1/g, "<h2 class = 'bt'")
                    .replace(/<h2/g, "<h2 class = 'bt'")
                    .replace(/<h3/g, "<h2 class = 'bt'")
                    .replace(/<h4/g, "<h2 class = 'bt'")
                    .replace(/<h5/g, "<h2 class = 'bt'")
                    .replace(/<h6/g, "<h2 class = 'bt'")
                    .replace(/<p/g, "<p class = 'arip'")
                    .replace(/&ldquo;/g, "“")
                    .replace(/&rdquo;/g, "”")
                    this.setData({
                        url:res.data.url,
                        article,
                        imgUrl:res.data.imgurl,
                        tit:res.data.title,
                        producer:res.data.producer,
                        dateorder:res.data.dateorder,
                        digest:res.data.digest
                    })
                    swan.setNavigationBarTitle({
                        title: res.data.title
                    });
                }
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        const height = App.globalData.height*2+20
         this.setData({
            height:height
         });
    
        
        // swan.request({
        //     url: 'https://api.zhiding.cn/baidu/alist', // 仅为示例，并非真实的接口地址
        //     method: 'GET',
        //     success: (res)=> {
        //         console.log(res);
        //         const body = res.data.list.filter(item => item.document_id === String(id))[0]
        //         console.log(body)
        //         this.setData({
        //             list: body
        //         })
               
        //     },
        //     fail: function (err) {
        //         console.log('错误码：' + err.errCode);
        //         console.log('错误信息：' + err.errMsg);
        //     }
        // });
    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
        // console.log(window)
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
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});