<template>
    <ul class="btn_set">
        <li>
            <div class="admin_img">
                <el-avatar :size="50" :src="imgHerf"></el-avatar>
            </div>
        </li>
        <li>
            <el-dropdown>
                <p class="user_name">
                    {{$store.state.currentUser}}<i class="el-icon-arrow-down el-icon--right"></i>
                </p>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="personalData" icon="el-icon-circle-plus">个人资料</el-dropdown-item>
                    <el-dropdown-item @click.native="changePassword" icon="el-icon-circle-plus-outline">修改密码</el-dropdown-item>
                    <el-dropdown-item @click.native="logout" icon="el-icon-circle-check">注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </li >
    </ul>
</template>

<script>
export default {
    props: {
        imgSrc: {
            type: String,
            default(){
                return ""
            }
        }
    },
    data(){
        return {
            imgHerf: this.imgSrc
        }
    },
    methods: {
        personalData(){

        },
        changePassword(){

        },
        //注销登录
        logout(){
            this.$store.commit('delete_tabs_all')
            this.$store.dispatch('setUser')
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
    .btn_set{
        height: 100%;
        padding: 0 20px;
    }
    .btn_set li{
        height: 100%;
        float: right;
        line-height: 60px;
        list-style: none;
        margin-left: 30px;
    }
    .admin_img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(255,255,255,0.6);
        display: inline-block;
        margin: 5px 0 0 0;
    }
    .user_name{
        font-size: 16px;
        color: rgba(0,0,0,0.4);
        font-weight: 500;
    }
    .user_name:hover{
        color: #409EFF;
    }
</style>