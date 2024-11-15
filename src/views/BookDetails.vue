<template>
  <div class="space"></div>
  <div v-if="book">
    <div class="book_details_container">
      <div class="book_details_item">
        <div>
          <img :src="getAvatarUrl(book.avatar)" alt="Book Image" class="book_img">
          <button @click="borrowBook" class="btn_login">Mượn Sách</button>
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
  
</template>

<script>
import BookService from "@/services/books.service";
import BorrowService from "@/services/borrow.service";
import { useTodoStore } from "@/store/todostore";
import NXBService from "@/services/nxb.service";

export default {
  data() {
    return {
      book: null,
      nxb: null,
      data:null,
      baseImageUrl: "http://localhost:3002/", // Replace with your actual base URL
    };
  },
  methods: {
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
    this.retrieveBook();
  },
};
</script>
