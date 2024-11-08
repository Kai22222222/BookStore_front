<template>
    <br>
    <br>
    <br>
    <br><br><br><br><br><br><br><br><br><br>
  <div v-if="book">
    <div class="book_details_container">
      <div class="book_details_item">
        <div>
          <img :src="getAvatarUrl(book.avatar)" alt="Book Image" class="book_img">
        </div>
        <div class="book_details_item2">
                <div class="title3">
                    <h2>{{ book.tensach }}</h2>
                 </div>
                 <div>
                     by <strong>{{ book.tacgia }}</strong>
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
                <div >
                   <strong> Giá:</strong>
                    {{ book.dongia }}đ
                </div>
                <div >
                    <strong>Số quyển:</strong>
                    {{ book.soquyen }}
                </div>
                <div >
                    <strong>Năm xuất bản:</strong>
                    {{ book.namxuatban }}
                </div>
                <p>Amoral, cunning, ruthless, and instructive, this piercing work distills three thousand years of the history of power in to forty-eight well explicated laws. As attention--grabbing in its design as it is in its content, this bold volume outlines the laws of power in their unvarnished essence, synthesizing the philosophies of Machiavelli, Sun-tzu, Carl von Clausewitz, and other great thinkers. Some laws teach the need for prudence ("Law 1: Never Outshine the Master"), the virtue of stealth ("Law 3: Conceal Your Intentions"), and many demand the total absence of mercy ("Law 15: Crush Your Enemy Totally"), but like it or not, all have applications in real life. Illustrated through the tactics of Queen Elizabeth I, Henry Kissinger, P. T. Barnum, and other famous figures who have wielded--or been victimized by--power, these laws will fascinate any reader interested in gaining, observing, or defending against ultimate control.</p>
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
  data() {
    return {
      book: null,
      baseImageUrl: "http://localhost:3002/", 
    };
  },  
  methods: {
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
    getAvatarUrl(avatarPath) {
      return `${this.baseImageUrl}${avatarPath}`;
    }
  },
  mounted() {
    this.retrieveBook();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
