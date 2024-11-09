<template>
<div class="form-container">
    
<div class="page">
    <h4>Đăng nhập</h4>
    <ContactForm :contact="newContact" @submit:contact="createContact" />
    <p>{{ message }}</p>
    <p>Don't have an account? </p>
    <button class="btn_login2" @click="goToSigup">
 Sign Up
</button>
  </div>
</div>
</template>
<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";
import { useTodoStore } from "@/store/todostore";
export default {
  components: {
    ContactForm,
  },
  data() {
    return {
      newContact: {
        username: "",
        password: "",
      },
      message: "",
    };
  },
  methods: {
    async createContact(data) {
      try {
        const check= await ContactService.checkLogIn(data);
        const todoStore = useTodoStore();
        todoStore.setUsername(data.username);
        this.$router.push({ name: "contactbook" });
         console.log("Store data:", todoStore.users);
     }catch (error) {
        console.log(error);
        this.message = "Đăng nhập không thành công";
      }
    },
    goToSigup() {
this.$router.push({ name: "book.signup" });
},
  },
};
</script>