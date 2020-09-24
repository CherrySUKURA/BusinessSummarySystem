<template>
    <div class="addpopup">
        <el-dialog :title="delogTitle" :visible.sync="dialogVisible" width="53%" :before-close="handleClose">
            <el-form :model="data" ref="formName" :disabled = "dis" :rules="rules" label-position="right" label-width="100px" :inline="true">
                <el-form-item label="合同编号" prop="contractNo">
                    <el-input v-model.number="data.contractNo" placeholder="合同编号"></el-input>
                </el-form-item>
                <el-form-item label="合同名称" prop="contractName">
                    <el-input v-model="data.contractName" placeholder="合同名称"></el-input>
                </el-form-item>
                <el-form-item label="客户名称" prop="customerName">
                    <el-input v-model="data.customerName" placeholder="客户名称"></el-input>
                </el-form-item>
                <el-form-item label="客户类型" prop="customerType">
                    <el-input v-model="data.customerType" placeholder="客户类型"></el-input>
                </el-form-item>
                <el-form-item label="合同归属" prop="contractLift">
                    <el-select v-model="data.status" placeholder="合同归属">
                        <el-option label="老客户" value="old"></el-option>
                        <el-option label="新客户" value="new"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入账时间" prop="bookedTime">
                    <el-date-picker v-model="data.bookedTime" type="date" value-format="timestamp" placeholder="入账时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="入账金额" prop="ncome">
                    <el-input v-model="data.ncome" placeholder="入账金额"></el-input>
                </el-form-item>
                <el-form-item label="设计金额" prop="designNcome">
                    <el-input v-model="data.designNcome" placeholder="设计金额"></el-input>
                </el-form-item>
                <el-form-item label="品牌金额" prop="brandNcome">
                    <el-input v-model="data.brandNcome" placeholder="品牌金额"></el-input>
                </el-form-item>
                <el-form-item label="互动金额" prop="interactiveNcome">
                    <el-input v-model="data.interactiveNcome" placeholder="互动金额"></el-input>
                </el-form-item>
                <el-form-item label="科技金额" prop="scienceNcome">
                    <el-input v-model="data.scienceNcome" placeholder="科技金额"></el-input>
                </el-form-item>
                <el-form-item label="第三方费用" prop="thirdPartyExpenses">
                    <el-input v-model="data.thirdPartyExpenses" placeholder="第三方费用"></el-input>
                </el-form-item>
                <el-form-item label="收入性质" prop="natureIncome">
                    <el-input v-model="data.natureIncome" placeholder="收入性质"></el-input>
                </el-form-item>
                <el-form-item label="数据记录时间" prop="dataRecordingTime">
                    <el-date-picker v-model="data.dataRecordingTime" type="date" value-format="timestamp" placeholder="数据记录时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="组长" prop="leader">
                    <el-select v-model="data.leader" placeholder="组长">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="data.status" placeholder="状态">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="display:block" label="组员" prop="crew">
                    <el-checkbox-group v-model="data.crew">
                        <el-checkbox border label="美食/餐厅线上活动" name="crew"></el-checkbox>
                        <el-checkbox border label="地推活动" name="crew"></el-checkbox>
                        <el-checkbox border label="线下主题活动" name="crew"></el-checkbox>
                        <el-checkbox border label="单纯品牌曝光" name="crew"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <!-- 组员 -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('formName')">提 交</el-button>
                <el-button type="primary" @click="submitReview('formName')">提交并审核</el-button>
                <el-button @click="cancel('formName')">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'addpopup',
    data(){
        return {
            username: "admin",
            from: "shanghai",
            dialogVisible: false,
            delogTitle: "",
            data: {},
            rules: {
                contractNo: [
                    { required: true,message: '请输入合同编号',trigger: 'blur'},
                    { type: 'number',message: '请输入数字类型',trigger: 'blur'}
                ]
            },
            dis: null
        }
    },
    watch: {
        data: function (val,oldval) {
            console.log(val,oldval)
        }
    },
    methods:{
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
        //弹出框取消回调
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then( () => {
                done();
            })
            .catch( () => {});
        },
        submitForm(name){
            this.done(name)
        },
        submitReview(name){
            this.done(name)
        },
        cancel(name){
            console.log(this.data)
            this.done(name)
        },
        done(name){
            this.dialogVisible = false;
            this.$refs[name].resetFields()
        }
    }
}
</script>
<style scoped>
    .el-select,.el-input {
        width: 202px;
    }
</style>