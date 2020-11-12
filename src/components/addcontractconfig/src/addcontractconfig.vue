<template>
    <div class="addcontractconfig">
        <el-dialog :title="title" append-to-body :visible.sync="dialogFormVisible" width="45%">
            <el-form :model="data" :rules="rules" ref="addcontractconfigForm" :inline="true" label-width="100px">
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="开始金额" prop="startMoney">
                            <el-input v-model="data.startMoney" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="结束金额" prop="endMoney">
                            <el-input v-model="data.endMoney" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="分成比例" prop="percentage">
                            <el-input v-model="data.percentage" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit()">提 交</el-button>
                <el-button @click="close()">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { updateReturnMoney } from '@/api/returnmoneyconfig.js'
export default {
    name: 'addcontractconfig',
    data(){
        return {
            dialogFormVisible: false,
            title: '',
            data: {},
            rules: {
                startMoney: [
                    { required: true,message: '请输入开始金额',trigger: 'blur' }
                ],
                endMoney: [
                    { required: true,message: '请输入结束金额',trigger: 'blur' }
                ],
                percentage: [
                    { required: true,validator: this.percentageRuler,trigger: 'blur'  }
                ]
            }
        }
    },
    methods: {
        percentageRuler(rule,value,callback){
            if(value.toString() == ''){
                callback('请输入分成比例')
            }
            debugger
            if(parseFloat(value) > 1){
                callback('分成比例不能大于1')
            }
            callback()
        },
        submit(){
            updateReturnMoney(this.data).then( res => {
                if(res.data.checkOut){
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this.close()
                    this.$parent.RequestHttpTableData()
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        open(title,data){
            this.title = title
            this.data = JSON.parse(JSON.stringify(data))
            this.dialogFormVisible = true
        },
        close(){
            this.dialogFormVisible = false
        }
    }
}
</script>

<style scoped>
.el-form-item{
    display: flex;
}
.el-form-item>>>.el-form-item__content{
    flex: 1;
}
</style>