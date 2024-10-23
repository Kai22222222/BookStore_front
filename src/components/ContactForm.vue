<template>
  <Form @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label for="username">Username</label>
      <Field name="username" type="text" class="form-control" v-model="contactLocal.username" />
      <ErrorMessage name="username" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <Field name="password" type="password" class="form-control" v-model="contactLocal.password"/>
      <ErrorMessage name="password" class="error-feedback" />
    </div>

    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
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
      username: yup
        .string()
        .required("Username phải có giá trị.")
        .min(2, "Username phải ít nhất 2 ký tự.")
        .max(50, "Username có nhiều nhất 50 ký tự."),
      password: yup
        .string()
        .required("Password phải có giá trị.")
        .min(6, "Password phải ít nhất 6 ký tự.")
        .max(50, "Password có nhiều nhất 50 ký tự."),
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
@import "@/assets/form.css";
</style>
