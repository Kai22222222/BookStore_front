<template>
  <div>
    <!-- Khoảng trống phía trên -->
    <div class="space"></div>

    <!-- Thanh tìm kiếm -->
    <div class="search-bar">
      <input
        type="text"
        v-model="searchText"
        placeholder="Tìm kiếm sách..."
        class="search-input"
      />
    </div>

    <!-- Hiển thị danh sách sách -->
    <div v-if="filteredContacts.length > 0">
      <div class="title2">
        <h2>Tất Cả Sách</h2>
      </div>
      <div class="book_trending_container">
        <div
          v-for="contact in filteredContacts"
          :key="contact._id"
          class="book_trending_item"
          @click="goToBookDetails(contact._id)"
        >
          <div>
            <img :src="getAvatarUrl(contact.avatar)" alt="Book Image" class="book_img" />
          </div>
          <div class="name_book">{{ contact.tensach }}</div>
          <div class="dongia_book">{{ contact.tacgia }}</div>
        </div>
      </div>
    </div>

    <!-- Hiển thị thông báo khi không có kết quả -->
    <div v-else>
      <h3>Không tìm thấy sách nào phù hợp.</h3>
    </div>
  </div>
</template>
<script>
import BookService from "@/services/books.service";

export default {
  data() {
    return {
      contacts: [], // Danh sách tất cả sách
      searchText: "", // Từ khóa tìm kiếm
      baseImageUrl: "http://localhost:3002/", // Đường dẫn URL cơ sở
    };
  },
  computed: {
    // Lọc danh sách sách dựa trên từ khóa tìm kiếm
    filteredContacts() {
      if (!this.searchText.trim()) {
        return this.contacts; // Nếu không nhập tìm kiếm, trả về toàn bộ danh sách
      }

      const lowerSearchText = this.searchText.toLowerCase();

      return this.contacts.filter((contact) => {
        return (
          (contact.tensach && contact.tensach.toLowerCase().includes(lowerSearchText)) ||
          (contact.tacgia && contact.tacgia.toLowerCase().includes(lowerSearchText))
        );
      });
    },
  },
  methods: {
    // Lấy danh sách sách từ API
    async retrieveContacts() {
      try {
        this.contacts = await BookService.getAll();
        console.log("Danh sách sách:", this.contacts); // Kiểm tra dữ liệu
      } catch (error) {
        console.error("Lỗi khi tải danh sách sách:", error);
      }
    },
    // Tạo URL đầy đủ cho hình ảnh
    getAvatarUrl(avatarPath) {
      return `${this.baseImageUrl}${avatarPath}`;
    },
    // Chuyển hướng đến trang chi tiết sách
    goToBookDetails(bookId) {
      this.$router.push({ name: "book.details", params: { id: bookId } });
    },
  },
  mounted() {
    // Gọi API khi component được mount
    this.retrieveContacts();
  },
};
</script>
