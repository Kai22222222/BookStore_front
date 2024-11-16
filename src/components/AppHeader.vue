<template>
    <header>
       
         <div class="navbar navigation " >
            <div >
                <router-link :to="{ name: 'contactbook' }" style="color: aliceblue;"> 
                    <h2 >The BookWorm</h2> 
                </router-link>
            </div>
         </div>
        
        <nav class="navbar navigation">
            <div class="nav-item">
                <router-link :to="{ name: 'contactbook' }" style="color: aliceblue;">
                    Trang Chủ
                   
                </router-link>
            </div>
            <div class="nav-item" v-if="isNhanVien">
                <router-link :to="{ name: 'account.list' }" style="color: aliceblue;">
                    Tài Khoản
                    
                </router-link>
            </div>
            <div class="nav-item">
                <router-link :to="{ name: 'book.list' }" style="color: aliceblue;">
                    Sách
                   
                </router-link>
            </div>
            <div class="nav-item" v-if="isNhanVien">
                <router-link :to="{ name: 'nxb.list' }" style="color: aliceblue;">
                    NXB
                   
                </router-link>
            </div>
            <div class="nav-item">
                <router-link :to="{ name: 'about' }" style="color: aliceblue;">
                    Về Chúng Tôi
                   
                </router-link>
            </div>
            <div class="nav-item" v-if="isNhanVien">
                <router-link :to="{ name: 'book.add' }" style="color: aliceblue;">
                    Thêm Sách
                   
                </router-link>
            </div>
            <div class="nav-item2">
                <router-link v-if="!username" :to="{ name: 'book.login' }">
                    <button class="btn_login">Đăng nhập</button>
                </router-link>
                <button v-else @click="logout" class="btn_login">
                   Đăng xuất
                </button>
            </div>
        </nav>
    </header>
</template>

<script>
import { useTodoStore } from "@/store/todostore"; // Import Pinia store
import ContactService from "@/services/contact.service"; // Import service

export default {
    data() {
        return {
            isNhanVien: false ,// Trạng thái kiểm tra nhân viên
             isMenuOpen: false, 
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
