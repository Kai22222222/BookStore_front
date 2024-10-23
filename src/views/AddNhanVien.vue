<template>
<div class="form-container">
    
<div class="page">
    <h4>Thêm Nhân Viên mới</h4>
    <NhanVienForm :contact="newContact" @submit:contact="createContact" />
    <p>{{ message }}</p>
  </div>
</div>
</template>
<script>
import NhanVienForm from "@/components/NhanVienForm.vue";
import NhanVienService from "@/services/nhanvien.service";

export default {
  components: {
    NhanVienForm,
  },
  data() {
    return {
      newContact: {
        "manv": "",
        "hoten": "",
        "chucvu": "",
        "diachi": "",
        "sodienthoai": "",
      },
      message: "",
    };
  },
  methods: {
    async createContact(data) {
      try {
        await NhanVienService.create(data);
        alert("Nhân viên đã được tạo thành công.");
      } catch (error) {
        console.log(error);
        this.message = "Có lỗi xảy ra khi thêm nhân viên.";
      }
    },
  },
};
</script>