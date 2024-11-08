<template>
    <section class="hero-section">
        <div class="section-content">
            <div class="hero-details">
                <h2 class="title">CBooks</h2>
                <h3 class="subtitle">Make your day great with our special books!</h3>
                <p class="description">Welcome to our CBooks paradise, where every...</p>

                <div class="buttons">
                    <a href="#" class="button order-now">Order Now</a>
                     <a href="#" class="button contact-us">Contact Us</a>
                </div>
            </div>
            <div class="hero-image-wrapper">
                <img src="../assets/library.png" alt="" class="hero-image">
            </div>
        </div>

    </section>

<div class="page row">
<div class="col-md-10">
<InputSearch v-model="searchText" />
</div>
<div class="mt-3 col-md-6">
<h4>
Sách
<i class="fas fa-address-book"></i>
</h4>
<BookList
v-if="filteredContactsCount > 0"
:contacts="filteredContacts"
v-model:activeIndex="activeIndex"
/>
<p v-else>Không có sách nào.</p>
<div class="mt-3 row justify-content-around align-items-center">
<button class="btn btn-sm btn-primary" @click="refreshList()">
<i class="fas fa-redo"></i> Làm mới
</button>
<button class="btn btn-sm btn-success" @click="goToAddContact">
<i class="fas fa-plus"></i> đăng ký
</button>
<button class="btn btn-sm btn-success" @click="goToLogIn">
<i class="fas fa-plus"></i> đăng nhập
</button>

<button class="btn btn-sm btn-success" @click="goToAddNXB">
<i class="fas fa-plus"></i> thêm sách
</button>

<button
class="btn btn-sm btn-danger"
@click="removeAllContacts"
>
<i class="fas fa-trash"></i> Xóa tất cả
</button>
</div>
</div>
<div class="mt-3 col-md-6">
<div v-if="activeContact">
<h4>
Chi tiết Liên hệ
<i class="fas fa-address-card"></i>
</h4>
<BookCard :contact="activeContact" />
</div>
</div>
</div>
<!-- Hiển thị tất cả contacts -->
 <div> 
 </div>
 <br>
 <br>
            <div v-if="contacts.length > 0">
               <div  class="title2">
                <h2 >Trending Books Of The Week</h2>
                </div>
                    <div class="book_trending_container">
                        
                    <div v-for="contact in contacts.slice(4, 7)" :key="contact.id" class="book_trending_item" @click="goToBookDetails(contact._id)">
                        <div >
                          <img :src="getAvatarUrl(contact.avatar)" alt="Book Image" class="book_img">
                        </div>
                        <div class="star">
                            <span>
                                <img src="../assets/star.png" alt="">
                            </span>
                            <span>
                                <img src="../assets/star.png" alt="">
                            </span>
                            <span>
                                <img src="../assets/star.png" alt="">
                            </span>
                            <span>
                                <img src="../assets/star.png" alt="">
                            </span>
                            <span>
                                <img src="../assets/star.png" alt="">
                            </span>

                            
                        </div>
                        
                         <div class="name_book">
                             {{ contact.tensach }}
                        </div> 
                         <div class="dongia_book">
                             {{ contact.dongia }}
                        </div> 
                    </div>
                    </div>
            </div>
   
</template>
<script>
import BookCard from "@/components/BookCard2.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/BookList2.vue";
import BookService from "@/services/books.service";
export default {
components: {
BookCard,
InputSearch,
BookList,
},
// Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
data() {
return {
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
},
computed: {
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
async retrieveContacts() {
try {
this.contacts = await BookService.getAll();
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
goToBookDetails(bookId) {
        // Navigate to the book details page with the given bookId
        this.$router.push({ name: "book.details", params: { id: bookId } });
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

},
};

</script>
<style scoped>
.page {
text-align: left;
max-width: 750px;

}
</style>