<template>
    <div class="addbusinesstypeconfig">
        <el-dialog :title="title" append-to-body :visible.sync="dialogFormVisible" width="45%">
            <el-form :model="data" :rules="rules" ref="addcontractconfigForm" :inline="true" label-width="100px">
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="职位" prop="typeDesc">
                            <el-input v-model="data.typeDesc"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="分成" prop="proportion">
                            <el-input v-model="data.proportion"  oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
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
import { updateBusinessById } from '@/api/businesstypeconfig.js'
export default {
    name: 'addbusinesstypeconfig',
    data(){
        return {
            dialogFormVisible: false,
            title: '',
            data: {},
            rules: {
                typeDesc: [
                    { required: true,message: '请输入职位',trigger: 'blur' },

                ],
                proportion: [
                    { required: true,validator: this.proportionRuler,trigger: 'blur'  },
                ]
            }
        }
    },
    methods: {
        proportionRuler(rule,value,callback){
            if(value.toString() == ''){
                callback('请输入分成比例')
            }
            if(parseFloat(value) > 1){
                callback('分成比例不能大于1')
            }
            callback()
        },
        submit(){
            updateBusinessById(this.data).then( res => {
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