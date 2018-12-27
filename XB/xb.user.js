// ==UserScript==
// @name         XB脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       hury88
// @match        http://120.55.163.157/index.php
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let div = document.createElement('div');

            div.innerHTML = `<div style="position: fixed;top: 20.5px; bottom: auto; left: 423px; right: auto;background: #fff;border: 1px solid #ced1d9;border-radius: 4px;box-shadow: 0 0 3px #ced1d9;color: black;word-break: break-all;display: block;width: 520px;padding: 10px 20px;z-index: 9999;">
                                  <a href="javascript:AddTag('我的任务', '/index.php/Task/Taskinfo/index.html', 'icon75');" class="ToolBtn"><span class="icon9"></span><b>我的任务</b></a>
                                  <a href="javascript:xbhr_clockin();" class="ToolBtn"><span class="icon9"></span><b>上班打卡(已自动)</b></a>

                                  <a title="有未接受的任务时,自动提交接受,并弹出日志框填写日志" href="javascript:xbhr_clockout();" class="ToolBtn"><span class="icon49"></span><b>一键打卡</b></a>
                                  <a href="javascript:xbhr_AcceptAllWork();" class="ToolBtn"><span class="icon313"></span><b>一键接受</b></a>
                                  &emsp;&emsp;&emsp;敬请期待
                             </div>`;
    //<a href="javascript:$.XB.open({ 'type':'add','openmode':'1', 'dialog': { 'url': '/index.php/Attendance/Worklog/edit/', 'title': '添加' } });" class="ToolBtn"><span class="icon7"></span><b>添加日志</b></a>
    //<a href="javascript:accept_startwork();" class="ToolBtn"><span class="icon313"></span><b>接受并且执行</b></a>
            document.body.appendChild(div);

    let scr = document.createElement('script');
    scr.innerHTML = `
        function xbhr_alert(message) {
            $.messager.alert("提示",message);
            setTimeout(function(){
                $(".messager-body").window('close');
            }, 1500)
        }

        function xbhr_clockin() {
            $.post("/index.php/Attendance/Appraisal/clockin.html",{},function(data){
                if(data.result == 1) {
                    $.messager.alert("提示",data.message,"info",function(){
                        window.location.reload();
                    });
                }
                if(data.result == 0) {
                    xbhr_AcceptAllWork()
                    $.messager.alert("提示",data.message);
                    setTimeout(function(){
                        $(".messager-body").window('close');
                    }, 1500)
                }
            },"json");
        }
        function xbhr_clockout() {
             $.post("/index.php/Attendance/Appraisal/clockout.html",{},function(data){
                if(data.result == 1) {

                     AddTag("考勤信息", "/index.php/Attendance/Appraisal/index.html", "icon84");
                     xbhr_alert(data.message)
                }
                if(data.result == 0) {
                   //抱歉，你已经打过下班卡，不要重复打卡！
                   if(data.message == "抱歉，请先填写工作日志后打卡！") {
                       $.messager.alert("提示","如果你已填写, 请再次点击重新打卡","info",function(){
                           xbhr_clockout();
                       });
                       setTimeout(function(){
                           $.XB.open({ 'type':'add','openmode':'1', 'dialog': { 'url': '/index.php/Attendance/Worklog/edit/', 'title': '添加' } })
                       }, 500)
                   } else {
                       xbhr_alert(data.message)
                   }

                }
            },"json");
        }

    function xbhr_getAcceptwork() {
        $.post("/index.php/Task/Taskinfo/DataList",{
            Statuss: 1,
            Status: 1
        },function(data){
            if(data.total >= 1) {

                $.messager.alert("提示","有待接受的任务"+data.total+"个","info",function(){

                });
            } else {
                $.messager.alert("提示",'无待接受的任务', function(){

                });
                setTimeout(function(){
                    $(".messager-body").window('close');
                }, 1500)
            }
        },"json");
    }
    //获取所有接受的任务并自动接受
    var counter;

    function xbhr_Acceptwork(ID) {
        $.post("/index.php/Task/Taskinfo/acceptwork/",{
            ID: ID,
        },function(data){
            if(data.result == 1) {
                ++counter;
            }else if(data.result == 0) {

            }
        },"json");
    }
    function xbhr_AcceptAllWork() {
        $.post("/index.php/Task/Taskinfo/DataList",{
            Statuss: 1,
            Status: 1
        },function(data){
            if(data.total >= 1) {
                for (var i = 0; i < data.rows.length; i++) {
                    xbhr_Acceptwork(data.rows[i]["ID"]);
                };
                $.messager.alert("提示","成功接受任务"+counter+"个 共"+data.total+"个","info",function(){

                });
            } else {
                $.messager.alert("提示",'无待接受的任务', function(){
                    setTimeout(function(){
                        $(".messager-body").window("close");
                    }, 1500)
                });
            }
        },"json");
    }

    function accept_startwork() {
        $.XB.open({ 'type':'acceptwork','openmode':'3', 'dialog': { 'url': 'acceptwork/', 'title': '接受任务' } });
        $(".messager-body").window("close");
        $.XB.open({ 'type':'startwork','openmode':'3', 'dialog': { 'url': 'startwork/', 'title': '开始执行' } })
    }
    function addLog() {

        $.XB.open({ 'type':'add','openmode':'1', 'dialog': { 'url': '/index.php/Attendance/Worklog/edit/', 'title': '添加' } })
    }


        //AddTag("我的任务", "/index.php/Task/Taskinfo/index.html", "icon75");
setTimeout(function(){
 //AddTag("考勤信息", "/index.php/Attendance/Appraisal/index.html", "icon84");
}, 2500)


`;
    document.body.appendChild(scr);

    function oxbhr_Acceptwork(ID) {
        $.post("/index.php/Task/Taskinfo/acceptwork/",{
            ID: ID,
        },function(data){
            if(data.result == 1) {

            }else if(data.result == 0) {

            }
        },"json");
    }
    function oxbhr_getAcceptwork() {
        $.post("/index.php/Task/Taskinfo/DataList",{
            Statuss: 1,
            Status: 1
        },function(data){
            if(data.total >= 1) {

                $.messager.alert("提示","有待接受的任务"+data.total+"个","info",function(){

                });
            } else {
                $.messager.alert("提示",'无待接受的任务', function(){
                    setTimeout(function(){
                        $(".messager-body").window('close');
                    }, 1500)
                });
            }
        },"json");
    }

    function xbhr_clockin() {
        $.post("/index.php/Attendance/Appraisal/clockin.html",{},function(data){
            console.log(data);
        },"json");
    }
    //自动打卡
    xbhr_clockin();
    //getAcceptwork();


    // Your code here...
})();