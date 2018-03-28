<template lang="html">
  <div>
    <router-link class="router-link" to="/">Back to Home</router-link>
    <p>name: {{ $route.params.name }}; phone: {{ $route.params.phone }}</p>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="ruleForm.role">
          <el-radio label="student">学生</el-radio>
          <el-radio label="teacher">老师</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postMsg } from './api';

export default {
  name: 'WeChat',
  data() {
    const checkAge = (rule, value, callback) => {
      if (!value) {
        callback(new Error('年龄不能为空'));
      } else {
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }, 10);
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        age: '',
        role: 'student',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' },
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
        ],
        age: [
          { validator: checkAge, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          postMsg({
            age: this.ruleForm.age,
            pass: this.ruleForm.pass,
            role: this.ruleForm.role,
          });
        } else {
          this.$message.error('提交失败');
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="css" scoped>
</style>
