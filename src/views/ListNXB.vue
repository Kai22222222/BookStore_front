<template>
      <div class="space">
    
  </div>
            <div v-if="contacts.length > 0">
               <div  class="title2">
                <h2 >All NXB </h2>
                </div>
                    <div class="book_trending_container2">
                        
                    <div v-for="contact in contacts" :key="contact.id" class="book_trending_item2" @click="goToNXBDetails(contact._id)">
                        
                         <div class="name_book">
                             {{ contact.tennxb }}
                        </div> 
                         <div class="name_book">
                             {{ contact.diachi }}
                        </div> 
                         <button v-if="this.isNhanVien"  @click.stop="goToDelete(contact._id)" class="btn_login" style="width: 30%; margin-top: 30px;">
          Xóa
        </button>
        <button v-if="this.isNhanVien"  @click.stop="goToEdit(contact._id)" class="btn_login" style="width: 30%;">
          Sửa
        </button>
                    </div>
                    
                    </div>
            </div>
   
</template>
<script>
import BookCard from "@/components/BookCard2.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/BookList2.vue";
import NXBService from "@/services/nxb.service";
import ContactService from "@/services/contact.service"; 
import { useTodoStore } from "@/store/todostore";
export default {
components: {
BookCard,
InputSearch,
BookList,
},
// Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
data() {
return {
isNhanVien: false, 
contacts: [],
activeIndex: -1,
searchText: "",
 baseImageUrl: "http://localhost:3002/", 
};
},  
watch: {
// Giám sát các thay đổi của biến searchText.
// Bỏ chọn phần tử đang được chọn trong danh sách.
searchText() {
this.activeIndex = -1;
},
 username(newUsername) {
            if (newUsername) {
                this.checkNhanVien(newUsername); // Gọi hàm kiểm tra khi username thay đổi
            } else {
                this.isNhanVien = false; // Đặt lại khi người dùng đăng xuất
            }
        }
},
computed: {
     username() {
            const store = useTodoStore();
            return store.username; // Lấy username từ Pinia store
        },
// Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
contactStrings() {
return this.contacts.map((contact) => {
const { tensach, password } = contact;
return [ tensach, password].join("");
});
},
// Trả về các contact có chứa thông tin cần tìm kiếm.
filteredContacts() {
if (!this.searchText) return this.contacts;
return this.contacts.filter((_contact, index) =>
this.contactStrings[index].includes(this.searchText)
);
},
activeContact() {
if (this.activeIndex < 0) return null;
return this.filteredContacts[this.activeIndex];
},
filteredContactsCount() {
return this.filteredContacts.length;
},
},
methods: {
    async checkNhanVien(username) {
            try {
                const response = await ContactService.findByName(username);
                
                this.isNhanVien = response[0].nhanvien; // Cập nhật trạng thái nhân viên
                console.log( this.isNhanVien)
            } catch (error) {
                console.error("Error checking nhanvien:", error.message);
                this.isNhanVien = false;
            }
        },
     async goToDelete(id) {
      try {
         
        await NXBService.delete(id);
        alert("Xóa thành công.");
       this.contacts = await NXBService.getAll();
      } catch (error) {
        console.log(error);
        this.message = "Có lỗi xảy ra khi xóa liên hệ.";
      }
    },
goToEdit(id) {
this.$router.push({ name: "nxb.edit",params: { id: id } });
},
async retrieveContacts() {
try {
this.contacts = await NXBService.getAll();
} catch (error) {
console.log(error);
}
},
 getAvatarUrl(avatarPath) {
            return `${this.baseImageUrl}${avatarPath}`;
        },
refreshList() {
this.retrieveContacts();
this.activeIndex = -1;
},
goToNXBDetails(bookId) {
        // Navigate to the book details page with the given bookId
        this.$router.push({ name: "nxb.details", params: { id: bookId } });
    },
async removeAllContacts() {
    
if (confirm("Bạn muốn xóa tất cả các Sách?")) {
try {
await ContactService.deleteAll();
this.refreshList();
} catch (error) {
console.log(error);
}
}
},


goToAddContact() {
this.$router.push({ name: "book.signup" });
},
goToAddNXB() {
this.$router.push({ name: "book.add" });
},
goToLogIn() {
this.$router.push({ name: "book.login" });
},
},
mounted() {
this.refreshList();
if (this.username) {
            this.checkNhanVien(this.username); // Kiểm tra ngay khi component được mount
        }
},
};

</script>
<style scoped>
.page {
text-align: left;
max-width: 750px;

}
</style>