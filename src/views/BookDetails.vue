<template>
  <div class="space"></div>
  <div v-if="book">
    <div class="book_details_container">
      <div class="book_details_item">
        <div>
          <img :src="getAvatarUrl(book.avatar)" alt="Book Image" class="book_img">
          <button @click="borrowBook" class="btn_login" style="margin-bottom: 30px; "  >Mượn Sách</button>
          <button v-if="this.isNhanVien" @click="goToEdit(book._id)" class="btn_login" style="margin-bottom: 30px;">Sửa</button>
          <button v-if="this.isNhanVien"  @click="goToDelete(book._id)" class="btn_login" >
          Xóa
        </button>
        </div>
        <div class="book_details_item2">
          <div class="title3">
            <h2>{{ book.tensach }}</h2>
          </div>
          <div>
            by <strong>{{ book.tacgia }}</strong>
          </div>
          <div class="star">
            <span><img src="../assets/star.png" alt=""></span>
            <span><img src="../assets/star.png" alt=""></span>
            <span><img src="../assets/star.png" alt=""></span>
            <span><img src="../assets/star.png" alt=""></span>
            <span><img src="../assets/star.png" alt=""></span>
          </div>
          <div>
            <strong>Giá:</strong> {{ formatPrice(book.dongia) }}đ
          </div>
          <div>
            <strong>Số quyển:</strong> {{ book.soquyen }}
          </div>
          <div @click="goToNXBDetails(book.manxb)">
            <strong>Nhà xuất bản:</strong> {{ book.manxb }}
          </div>
          <div>
            <strong>Năm xuất bản:</strong> {{ book.namxuatban }}
          </div>
          <div>{{ book.mota }}</div>
        </div>
      </div>
    </div>
  </div>
 
    <div v-if="contacts.length > 0">
               <div  class="title2">
                <h2 >Gợi Ý Sách</h2>
                </div>
                    <div class="book_trending_container">
                        
                    <div v-for="contact in contacts.slice(1, 4)" :key="contact.id" class="book_trending_item" @click="goToBookDetails(contact._id)">
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
                             {{ formatPrice(contact.dongia) }}đ
                         </div>
                    </div>
                    </div>
            </div>
    
</template>

<script>
import BookService from "@/services/books.service";
import BorrowService from "@/services/borrow.service";
import { useTodoStore } from "@/store/todostore";
import NXBService from "@/services/nxb.service";
import ContactService from "@/services/contact.service"; // Import service
export default {
  data() {
    return {
      isNhanVien: false, // Trạng thái kiểm tra nhân viên
      book: null,
      nxb: null,
      contacts: [],
      data:null,
      baseImageUrl: "http://localhost:3002/", // Replace with your actual base URL
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
    goToBookDetails(bookId) {
        // Navigate to the book details page with the given bookId
        this.$router.push({ name: "book.details", params: { id: bookId } });
    },
   async goToNXBDetails(manxb) {
    try {
        const data = await NXBService.getByManxb(manxb);
        
        // Access the first element in the array and then get its `_id`
        if (Array.isArray(data) && data.length > 0) {
            const idnxb = data[0]._id;
            console.log(idnxb); // Verify that the correct publisher ID is being retrieved
            this.$router.push({ name: "nxb.details", params:  { id: idnxb } });
        } else {
            console.log("No publisher found with the given `manxb`.");
        }
    } catch (error) {
        console.log("Failed to retrieve publisher details:", error);
    }
},
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
goToEdit(id){
 this.$router.push({ name: "book.edit", params: { id: id } });

},
 async goToDelete(id) {
      try {
         
        await BookService.delete(id);
        alert("Xóa thành công.");
       this.$router.push({ name: "book.list" });
      } catch (error) {
        console.log(error);
        this.message = "Có lỗi xảy ra khi xóa liên hệ.";
      }
    },
    async retrieveBook() {
      try {
        const bookId = this.$route.params.id;
        if (bookId) {
          this.book = await BookService.get(bookId);
         
        }
      } catch (error) {
        console.log(error);
      }
    },
   
    formatPrice(price) {
      const number = typeof price === 'number' ? price : parseFloat(price);
      if (isNaN(number)) {
        return price;
      }
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    getAvatarUrl(avatarPath) {
      return `${this.baseImageUrl}${avatarPath}`;
    },
    async retrieveContacts() {
try {
this.contacts = await BookService.getAll();
    console.log("Contacts:", this.contacts); // Kiểm tra dữ liệu

this.nxb = await NXBService.getAll();
} catch (error) {
console.log(error);
}
},
    async borrowBook() {
      try {
        const todoStore = useTodoStore();
        const username = todoStore.username;

        if (!username) {
          alert("Chưa đăng nhập");
          this.$router.push({ name: "book.login" });
          return;
        }

        const newQuantity = parseInt(this.book.soquyen) - 1;
        if (newQuantity < 0) {
          alert("Không còn sách để mượn");
          return;
        }

        const updatedBook = { soquyen: newQuantity };
        await BookService.update(this.book._id, updatedBook);
        this.book.soquyen = newQuantity.toString();

        const borrowData = {
          masach: this.$route.params.id,
          madocgia: username,
          ngaymuon: new Date(),
          ngaytra: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        };

        await BorrowService.borrow(borrowData);

        alert("Mượn sách thành công!");
      } catch (error) {
        console.log("Lỗi khi mượn sách:", error);
      }
    }
  },
  mounted() {
    this.retrieveContacts();
    this.retrieveBook();
     if (this.username) {
            this.checkNhanVien(this.username); // Kiểm tra ngay khi component được mount
        }
  },
};
</script>
