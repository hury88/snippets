var app = getApp();
// pages/login/reg/reg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    upimgurl:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseImage: function () {
    var that = this;
    var imageList = that.data.imageList;

    wx.chooseImage({
        count: 2,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
            console.log(res);
            var imgsrc = res.tempFilePaths;
            var pics = imageList.concat(imgsrc);

            that.setData({
                imageList:pics
            });
        }
    })
  },
  previewImage: function (e) {
      var current = e.target.dataset.src

      wx.previewImage({
          current: current,
          urls: this.data.imageList
      })
  },
  //多张图片上传
  uploadimg: function(data){
      var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;

      wx.uploadFile({
          url: data.url,
          filePath: data.path[i],
          name: 'fileData',//这里根据自己的实际情况改
          //formData:data.other,
          success: function(res){
              var res = JSON.parse(res.data);//由JSON字符串转换为JSON对象
              if(res.result == 1){
                  success++;
                  if(that.data.upimgurl){
                     that.setData({
                       upimgurl:that.data.upimgurl+','+res.data,
                     });
                  }else{
                     that.setData({
                       upimgurl:res.data
                     });
                  }
              }
          },
          complete: function(res){
              console.log(i);
              i++;
              if(i==data.path.length){   //当图片传完时，停止调用
                  console.log('执行完毕');
                  console.log('成功：'+success+" 失败：");
              }else{
                  console.log(i);
                  data.i=i;
                  data.success=success;
                  data.fail=fail;
                  that.uploadimg(data);
              }
          }
      });
  },
  // 提交上传
  formSubmit: function (e) {
      wx.showLoading({
          title: 'loading',
          mask:true,
      });

      var pics = that.data.imageList;
      if(pics.length > 0){
          wx.showLoading({
              title: '处理中',
          })
          that.uploadimg({
              url:app.globalData.apiurl + '/api/Tool/UploadImage', //这里是你图片上传的接口
              path:pics, //这里是选取的图片的地址数组
          });
      }

      //绑定账号
      wx.login({//调用登录接口
          success: function (res) {
              if (res.code) {
                  wx.request({
                      url: app.globalData.apiurl+'/api/Smallprogram/NewRegister',
                      method: 'POST',
                      data: {
                          Pic:that.data.upimgurl
                      },
                      success: function (e) {
                          wx.hideLoading();
                      }
                  })
              } else {
                  wx.showModal({
                      title: '提示',
                      content: res.errMsg,
                      showCancel: false
                  });
              }
          },
          fail: function (res) {
              wx.showModal({
                  content: res.errMsg,
                  showCancel: false
              });
          }
      });
  },
})