<template>
  <div class="space"></div>
  
  <div v-if="nxb">
    <div class="book_details_container">
      <div class="book_details_item" >
        <div class="book_details_item2" >
            <div>
              <strong>Tên nhà xuất bản:</strong>
              {{ nxb.tennxb }}
            </div>
        </div>
         <div class="book_details_item2" >
            <div>
              <strong>Địa chỉ:</strong>
              {{ nxb.diachi }}
            </div>
        </div>
      </div>
    </div>
  </div>
  
   <div v-if="contacts.length > 0">
    
               <div  class="title2">
                <h2 >Sách của Nhà Xuất Bản {{ nxb.tennxb }} </h2>
                </div>
                    <div class="book_trending_container">
                        
                    <div v-for="contact in contacts" :key="contact.id" class="book_trending_item" @click="goToBookDetails(contact._id)">
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
                             {{ contact.tacgia }}
                        </div> 
                    </div>
                    </div>
            </div>
</template>

<script>
import BookService from "@/services/books.service";
import NXBService from "@/services/nxb.service"; 

export default {
  data() {
    return {
      nxb: null,
      contacts: [],
      relatedBooks: [],
      baseImageUrl: "http://localhost:3002/",  // Replace with your actual base URL
    };
  },
  methods: {
    goToBookDetails(bookId) {
        // Navigate to the book details page with the given bookId
        this.$router.push({ name: "book.details", params: { id: bookId } });
    },
    async retrievePublisherInfo() {
      try {
        const nxbId = this.$route.params.id;
        this.nxb = await NXBService.get(nxbId);
        const manxb = this.nxb.manxb;
        console.log('Publisher ID (manxb):', manxb);
        this.contacts = await BookService.getByPublisher(this.nxb.manxb);  // Assign to `contacts`
      } catch (error) {
        console.log(error);
      }
    },

    getAvatarUrl(avatarPath) {
      return `${this.baseImageUrl}${avatarPath}`;
    }
  },
  mounted() {
    this.retrievePublisherInfo();
  },
};
</script>