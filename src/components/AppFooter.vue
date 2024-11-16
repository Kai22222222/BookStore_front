<template>
    <footer>
  <div class="container">
    <!-- Phần thông tin liên hệ -->
    <div class="footer-content">
      <h3>Liên Hệ Với Chúng Tôi</h3>
      <p>Email: ncthien2805@gmail.com</p>
      <p>SĐT: 0963998260</p>
      <p>Địa chỉ: hẻm 229/ Đường 3/2/ Ninh Kiều/ Cần Thơ</p>
    </div>

    <!-- Phần liên kết -->
    <div class="footer-content">
      <h3>Links</h3>
      <ul>
        <li><a href="#">Trang chủ</a></li>
        <li><a href="#">Về Chúng Tôi</a></li>
        <li><a href="#">Sách</a></li>
        <li><a href="#">Nhà Xuất Bản</a></li>
        <li><a href="#">Đăng nhập</a></li>
      </ul>
    </div>

    <!-- Phần mạng xã hội -->
    <div class="footer-content">
      <h3>Follow Us</h3>
      <ul class="social-icons">
        <li><a href="https://www.facebook.com/profile.php?id=100040160810435"><i class="fab fa-facebook"></i></a></li>
        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
        <li><a href="https://www.instagram.com/chithien_2805/"><i class="fab fa-instagram"></i></a></li>
      </ul>
    </div>
  </div>

  <!-- Phần thanh cuối -->
  <div class="bottom-bar">
    <p>&copy; 2024 Nguyen Chi Thien. All rights reserved.</p>
  </div>
</footer>

</template>

<script>
import { useTodoStore } from "@/store/todostore"; // Import Pinia store
import ContactService from "@/services/contact.service"; // Import service

export default {
    data() {
        return {
            isNhanVien: false // Trạng thái kiểm tra nhân viên
        };
    },
    computed: {
        username() {
            const store = useTodoStore();
            return store.username; // Lấy username từ Pinia store
        }
    },
    watch: {
        username(newUsername) {
            if (newUsername) {
                this.checkNhanVien(newUsername); // Gọi hàm kiểm tra khi username thay đổi
            } else {
                this.isNhanVien = false; // Đặt lại khi người dùng đăng xuất
            }
        }
    },
    methods: {
        async checkNhanVien(username) {
            try {
                const response = await ContactService.findByName(username);
                console.log( response[0].nhanvien)
                this.isNhanVien = response[0].nhanvien; // Cập nhật trạng thái nhân viên
            } catch (error) {
                console.error("Error checking nhanvien:", error.message);
                this.isNhanVien = false;
            }
        },
        logout() {
            const store = useTodoStore();
            store.clearUsername(); // Đăng xuất và xóa username
        }
    },
    mounted() {
        if (this.username) {
            this.checkNhanVien(this.username); // Kiểm tra ngay khi component được mount
        }
    }
};

</script>
