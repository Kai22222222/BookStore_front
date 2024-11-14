<template>
  <div class="space"></div>
  
  <div v-if="nxb">
    <div class="publisher_details_container">
      <div class="publisher_details_item">
        <div>
          <strong>Tên nhà xuất bản:</strong>
          {{ nxb.tennxb }}
        </div>
        <div>
          <strong>Địa chỉ:</strong>
          {{ nxb.diachi }}
        </div>
      </div>
    </div>

    
  </div>
</template>
<script>

import BookService from "@/services/books.service";
import NXBService from "@/services/nxb.service"; // Service để lấy thông tin nhà xuất bản


export default {
  data() {
    return {
      publisher: null,
      relatedBooks: [],
    };
  },
  methods: {
    async retrievePublisherInfo() {
      try {
        const nxbId = this.$route.params.id;
        console.log(this.$route.params.id)
        if (nxbId) {
           this.nxb = await NXBService.get(nxbId);  // Lấy thông tin cuốn sách
         // await this.fetchPublisherInfo(nxb._id); // Lấy thông tin nhà xuất bản
        //await this.fetchRelatedBooks(nxb._id);  // Lấy các sách cùng nhà xuất bản
        }
      } catch (error) {
        console.log(error);
      }
    },



    async fetchRelatedBooks(manxb) {
      try {
        this.relatedBooks = await BookService.getByPublisher(manxb);  // Lấy các sách cùng nhà xuất bản
      } catch (error) {
        console.log('Error fetching related books:', error);
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