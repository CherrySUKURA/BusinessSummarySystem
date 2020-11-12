<template>
    <div class="addincomerescourceconfig">
        <el-dialog :title="title" append-to-body :visible.sync="dialogFormVisible" width="45%">
            <el-form :model="data" :rules="rules" ref="addincomerescourceconfigForm" :inline="true" label-width="100px">
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="收入性质" prop="incomeSourceDesc">
                            <el-input v-model="data.incomeSourceDesc"></el-input>
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
import { updateIncomeSource } from '@/api/incomerescourceconfig.js'
export default {
    name: 'addcontractconfig',
    data(){
        return {
            dialogFormVisible: false,
            title: '',
            data: {},
            rules: {
                incomeSourceDesc: [
                    { required: true,message: '请输入收入性质',trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        submit(){
            updateIncomeSource(this.data).then( res => {
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