<template>
  <Form @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label for="manxb">Mã NXB</label>
      <Field name="manxb" type="text" class="form-control" v-model="contactLocal.manxb" />
      <ErrorMessage name="manxb" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="tennxb">Tên NXB</label>
      <Field name="tennxb" type="text" class="form-control" v-model="contactLocal.tennxb"/>
      <ErrorMessage name="tennxb" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="diachi">Địa chỉ</label>
      <Field name="diachi" type="text" class="form-control" v-model="contactLocal.diachi"/>
      <ErrorMessage name="diachi" class="error-feedback" />
    </div>

    <div class="form-group">
       <button class="btn_login2">
        Lưu
      </button>
      
      <button type="button" class="btn_login2" @click="Cancel">
        Thoát
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:contact", "delete:contact"],
  props: {
    contact: { type: Object, required: true }
  },
  data() {
    const contactFormSchema = yup.object().shape({
      tennxb: yup
        .string()
        .required("Username phải có giá trị.")
        .min(2, "Username phải ít nhất 2 ký tự.")
        .max(50, "Username có nhiều nhất 50 ký tự."),
     
    });

    return {
      contactLocal: this.contact,
      contactFormSchema,
    };
  },
  methods: {
    submitContact() {
      this.$emit("submit:contact", this.contactLocal);
    },
    deleteContact() {
      this.$emit("delete:contact", this.contactLocal.id);
    },
    Cancel() {
      const reply = window.confirm('You have unsaved changes! Do you want to leave?');
      if (!reply) {
        return false;
      } else {
        this.$router.push({ name: "contactbook" });
      }
    }
  },
};
</script>

<style scoped>
@import "../assets/main.css";
</style>
