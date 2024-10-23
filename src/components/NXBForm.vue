<template>
  <Form @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label for="manxb">Mã NXB</label>
      <Field name="manxb" type="text" class="form-control" v-model="contactLocal.manxb" />
      <ErrorMessage name="manxb" class="error-feedback" />
    </div>

    <div class="form-group">
      <label >Tên NXB</label>
      <Field name="tennxb" type="text" class="form-control" v-model="contactLocal.tennxb" />
      <ErrorMessage name="tennxb" class="error-feedback" />
    </div>

    <div class="form-group">
      <label >Địa chỉ</label>
      <Field name="diachi" type="text"  class="form-control" v-model="contactLocal.diachi" />
      <ErrorMessage name="diachi" class="error-feedback" />
    </div>

    <div class="form-group">
      <button  @click.prevent="submitContact" class="btn btn-primary">Lưu</button>
      <button v-if="contactLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteContact">
        Xóa
      </button>
      <button type="button" class="ml-2 btn btn-danger" @click="Cancel">
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
      masach: yup
    .string()
    .required("Mã nxb là bắt buộc.")
    .min(1, "Mã nxb phải ít nhất 2 ký tự.")
    .max(50, "Mã nxb không được quá 50 ký tự."),
  tensach: yup
    .string()
    .required("Tên nxb là bắt buộc."),
  diachi: yup
    .string()
    .required("Đia chỉ là bắt buộc."),
    });

    return {
      contactLocal: this.contact,
      contactFormSchema,
    };
  },
  methods: {
    submitContact() {
        console.log("Submit Contact được gọi"); 
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
@import "@/assets/form.css";
</style>
