<template>
    <div class="addpopup">
        <el-dialog :title="delogTitle" :visible.sync="dialogVisible" width="56%" :before-close="handleClose">
            <el-form :model="data" ref="formName" :disabled = "dis" :rules="rules" label-position="right" label-width="100px" :inline="true">
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="合同编号" prop="contractNo">
                            <el-input v-model.number="data.contractNo" placeholder="合同编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同名称" prop="contractName">
                            <el-input v-model="data.contractName" placeholder="合同名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户名称" prop="customerName">
                            <el-input v-model="data.customerName" placeholder="客户名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="合同归属" prop="contractLift">
                            <el-input v-model="data.customerType" placeholder="合同归属"></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户类型" prop="customerType">
                            <el-select v-model="data.status" placeholder="客户类型">
                                <el-option label="老客户" value="old"></el-option>
                                <el-option label="新客户" value="new"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="入账时间" prop="bookedTime">
                            <el-date-picker v-model="data.bookedTime" type="date" value-format="timestamp" placeholder="入账时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="入账金额" prop="ncome">
                            <el-input v-model="data.ncome" placeholder="入账金额"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="收入性质" prop="natureIncome">
                            <el-input v-model="data.natureIncome" placeholder="收入性质"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="数据记录时间" prop="dataRecordingTime">
                            <el-date-picker v-model="data.dataRecordingTime" type="date" value-format="timestamp" placeholder="数据记录时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="子合同管理">
                              <el-button type="info" @click="dialogChildVisible()">管理</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 组员 -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('formName')">提 交</el-button>
                <el-button type="primary" @click="submitReview('formName')">提交并审核</el-button>
                <el-button @click="cancel('formName')">取 消</el-button>
            </span>
            <add-child-popup ref="childpopup"></add-child-popup>
        </el-dialog>
    </div>
</template>
<script>
import addChildPopup from '@/components/addchildpopup'
export default {
    name: 'addpopup',
    components: {
        addChildPopup
    },
    data(){
        return {
            username: "admin",
            from: "shanghai",
            dialogVisible: false,
            dis: false,
            delogTitle: "",
            data: {},
            rules: {
                contractNo: [
                    { required: true,message: '请输入合同编号',trigger: 'blur'},
                    { type: 'number',message: '请输入数字类型',trigger: 'blur'}
                ]
            },
        }
    },
    watch: {
        data: function (val,oldval) {
            console.log(val,oldval)
        }
    },
    methods:{
        //打开弹出框
        open(Title,data = null){
            this.dialogVisible = true
            this.delogTitle = Title
            this.data = JSON.parse(JSON.stringify(data))
            if(Title == "查看合同"){
                this.dis = true
            }else{
                this.dis = false
            }
        },
        //关闭回调
        close(name){
            this.dialogVisible = false;
            this.$refs[name].resetFields()
        },
        //弹出框取消回调
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then( () => {
                done();
            })
            .catch( () => {});
        },
        //提交表单
        submitForm(name){
            this.close(name)
        },
        //提交并审核表单
        submitReview(name){
            this.close(name)
        },
        //取消回调
        cancel(name){
            console.log(this.data)
            this.close(name)
        },
        //打开子弹出框
        dialogChildVisible(){
            this.$refs.childpopup.open(this.data)
        }
    }
}
</script>
<style scoped>
    .el-form-item{
        display: flex!important;
    }
    .el-form-item>>>.el-form-item__content{
        flex: 1;
    }
    .el-select,.el-input {
        width: 100%;
    }
    .el-checkbox{
        margin-left: 0!important;
    }
</style>