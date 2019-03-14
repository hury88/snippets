<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2009 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
namespace Behaviors;
/**
 * 行为扩展：提现前
 * Manual
    \Think\Hook::add('withdraw_before', 'Api\Behaviors\WithdrawBehavior');
    \Think\Hook::listen('withdraw_before', $result2);
 */
class WithdrawBehavior
{
    public function run(&$params)
    {
        //code...
    }
}
