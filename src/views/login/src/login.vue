<template>
    <div class="login">
        <div class="login_window">
            <div class="admin_img">
                <img :src = imgSrc />
            </div>
            <div class="user_info">
                <el-form ref="form">
                    <el-form-item prop="username">
                        <el-input prefix-icon="el-icon-user" placeholder="请输入内容" v-model="form.username" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input prefix-icon="el-icon-goods" placeholder="请输入密码" v-model="form.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button round size="medium" @click="onSubmit">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="user_operation">
                <div class="left_text text">
                    <router-link to="/home">立即注册</router-link>
                </div>
                <div class="right_text text">
                    <router-link to="/about">忘记密码</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { login } from '@/api/login.js'
export default {
    name: "login",
    props: {

    },
    computed: {

    },
    created(){

    },
    mounted(){
        
    },
    data(){
        return {
            imgSrc: require("assets/admin.png"),
            form: {//绑定用户信息
                username: "",
                password: ""
            },
            options: {//加载配置
                target: "body",
                lock: true,
                fullscreen: true,
                text: "登陆中",
                spinner: "el-icon-loading",
                background: "rgba(0,0,0,0.5)"
            },
            //没过滤的数据类表
            menuData: [
                // {
                //     "name": "合同管理",
                //     "path": "/contractmanagement",
                //     "component": 'pages/contractmanagement',
                //     "icon": 'el-icon-s-platform',
                //     "children": false
                // },
                // {
                //     "name": "数据展示",
                //     "path": "",
                //     "component": '',
                //     "icon": 'el-icon-s-marketing',
                //     "children": [
                //         {
                //             "name": "数据",
                //             "path": "/datapresentation",
                //             "component": 'pages/datapresentation',
                //             "icon": 'el-icon-s-marketing',
                //             "children": false
                //         }
                //     ]
                // },
            ],
            //过滤后的数据列表
            itemList: []
        }
    },
    methods: {
        onSubmit(){//提交函数
            if(this.formRules()){
                this.loginHttpRequest(this.Loading())
            }
        },
        formRules(){//表单验证
            if(this.form.username == ""){
                this.$notify.error({
                    title: '错误',
                    message: '请填写用户名'
                });
                return false
            }
            if(this.form.password == ""){
                this.$notify.error({
                    title: '错误',
                    message: '请填写密码'
                });
                return false
            }
            return true
        },
        loginHttpRequest(loadingInstance){//登录请求
            login(this.form).then( res => {
                if(res.code == 200){
                    if(res.data.checkOut){
                        this.menuData = res.data.roleRoute.route
                        sessionStorage.setItem("userName",this.form.username)
                        sessionStorage.setItem('userRouter',JSON.stringify(this.menuData))
                        this.$router.push('/')
                        loadingInstance.close()
                        
                    }else{
                        this.$message.error(res.msg)
                        loadingInstance.close()
                    }
                }
            })
        },
        Loading(){//登录加载
            let loadingInstance = this.$loading(this.options)
            return loadingInstance
        },
    }
}
</script>

<style scoped>
    .login{
        width: 100%;
        height: 100vh;
        position: relative;
    }
    .login::after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: url("../../../assets/bg.jpg") no-repeat;
        background-size: cover;
        filter:blur(8px);
        z-index: -1;
    }
    .login_window{
        width: 380px;
        height: 500px;
        border-radius: 15px;
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.4);
        padding: 0 40px;
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.15);
        /* box-shadow: 0 2px 2px rgba(10,16,20,.24),0 0 2px rgba(10,16,20,.12); */
    }
    .admin_img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: rgba(255,255,255,0.6);
        margin: 60px auto;
    }
    .admin_img img{
        width: 100%;
        height: 100%;
    }
    .el-input{
        width: 100%;
        height: 40px;
        border-radius: 20px;
    }
    .el-input>>>input{
        background: transparent;
        color: white;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 1);
        padding: 0 50px;
    }
    .el-input>>>input::-webkit-input-placeholder{
        color: #ffffff;
    }
    .el-input>>>input::-moz-input-placeholder{
        color: #ffffff;
    }
    .el-input>>>input::-ms-input-placeholder{
        color: #ffffff;
    }
    .el-input>>>.el-input__suffix i{
        color: #ffffff;
    }
    .el-input>>>.el-input__prefix{
        left: 15px;
    }
    .el-input>>>.el-input__prefix i{
        color: #ffffff;
        font-size: 24px;
    }
    .el-button{
        width: 100%;
        height: 40px;
    }
    .user_operation{
        margin-top:40px;
    }
    .text{
        display: inline-block;
        color: #ffffff;
        font-size: 10px;
    }
    .left_text{
        float: left;
    }
    .right_text{
        float: right;
    }
</style>