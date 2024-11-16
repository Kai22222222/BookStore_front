<template>
    <section class="hero-section">
        <div class="section-content">
            <div class="hero-details">
                <h2 class="title">The BookWorm</h2>
                <h3 class="subtitle">Điều duy nhất bạn nhất định phải biết là vị trí của thư viện.</h3>
                <p class="description">Chào mừng bạn đến với The BookWorm, nơi chúng tôi tin rằng mỗi cuốn sách đều mang trong mình một câu chuyện đang chờ được khám phá.</p>

                <div class="buttons">
                    <button @click.stop="goToExplore()" class="button order-now">
                        Khám phá ngay</button>
                     <button @click.stop="goToAboutUs()" class="button contact-us">Về chúng tôi</button>
                </div>
            </div>
            <div class="hero-image-wrapper">
                <img src="../assets/library.png" alt="" class="hero-image">
            </div>
        </div>
    </section>
            <div v-if="contacts.length > 0">
               <div  class="title2">
                <h2 >Sách Xu Hướng</h2>
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
                             {{ formatPrice(contact.dongia) }}đ
                         </div>
                    </div>
                    </div>
            </div>
    
   <section class="hero-section" >
    <div  class="title2" style="margin-top: 100px;">
                <h2 >Nhà Xuất Bản Nổi Bật</h2>
            </div>  
     <div class="section-content " style="padding-bottom:20px;">
            <div class="hero-image-wrapper">
                <img src="../assets/library2.png" alt="" class="hero-image">
            </div>
            <div class="hero-details2">
             
        <div v-for="nxb in nxb.slice(0,2)" :key="nxb.id" class="book_trending_item3" @click="goToNXBDetails(nxb._id)">
                        
                         <div class="subtitle">
                             {{ nxb.tennxb }}
                        </div> 
                         
                    </div>
                    </div>
        </div>  
    </section>
    <div class="reviews-section">
  <div class="title2">
    <h2>Đánh Giá Từ Độc Giả</h2>
  </div>
  <div class="reviews-container">
    <div v-for="review in reviews.slice(0, 3)" :key="review.id" class="review-item">
      <div class="review-text">
        <p>"{{ review.content }}"</p>
      </div>
      <div class="review-author">
        - {{ review.author }}
      </div>
    </div>
  </div>
</div>

<div class="event-countdown">
  <div class="title2">
    <h2>Sự Kiện Sắp Tới</h2>
    <h2>Hội Sách 12/12</h2>
  </div>
  <div class="countdown-timer">
    <span>{{ days }} ngày {{ hours }} giờ {{ minutes }} phút {{ seconds }} giây</span>
  </div>
</div>

</template>
<script>
import BookCard from "@/components/BookCard2.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/BookList2.vue";
import BookService from "@/services/books.service";
import NXBService from "@/services/nxb.service";
export default {
components: {
BookCard,
InputSearch,
BookList,
},
// Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
data() {
return {
    eventDate: new Date("2024-12-12T00:00:00").getTime(),
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    reviews: [
      { id: 1, content: "Một trải nghiệm đọc sách tuyệt vời!", author: "Nguyễn Văn A" },
      { id: 2, content: "Nhiều đầu sách phong phú và chất lượng!", author: "Lê Thị B" },
      { id: 3, content: "Dịch vụ hỗ trợ rất tận tình!", author: "Trần Văn C" },
    ],

contacts: [],
nxb: [],
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
    startCountdown() {
    setInterval(() => {
      const now = new Date().getTime();
      const distance = this.eventDate - now;

      this.days = Math.floor(distance / (1000  * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);
  },
async retrieveContacts() {
try {
this.contacts = await BookService.getAll();
this.nxb = await NXBService.getAll();
} catch (error) {
console.log(error);
}
},
 getAvatarUrl(avatarPath) {
            return `${this.baseImageUrl}${avatarPath}`;
        },
goToNXBDetails(bookId) {
        // Navigate to the book details page with the given bookId
        this.$router.push({ name: "nxb.details", params: { id: bookId } });
    },
refreshList() {
this.retrieveContacts();
this.activeIndex = -1;
},
formatPrice(price) {
      const number = typeof price === 'number' ? price : parseFloat(price);
      if (isNaN(number)) {
        return price;
      }
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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

goToExplore() {
this.$router.push({ name: "book.list" });
},
goToAboutUs() {
this.$router.push({ name: "about" });
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
      this.startCountdown();

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