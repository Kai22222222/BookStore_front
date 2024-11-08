<script>
export default {
    props: {
        contact: { type: Object, required: true },
    },
    computed: {
        // Đảm bảo không cần khai báo lại avatarUrl
        imageUrl() {
            return `http://localhost:3002/${this.contact.avatar.replace('app/', '')}`;
        }
    }
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>mã sách:</strong>
            {{ contact.masach }}
        </div>
        <div class="p-1">
            <strong>tên sách:</strong>
            {{ contact.tensach }}
        </div>
        <div class="p-1">
            <strong>Đơn giá:</strong>
            {{ contact.dongia }}
        </div>
        <div class="p-1">
            <strong>số quyển:</strong>
            {{ contact.soquyen }}
        </div>
        <div class="p-1">
            <strong>năm xuất bản:</strong>
            {{ contact.namxuatban }}
        </div>
        <div class="p-1">
            <strong>ảnh:</strong>
            <!-- Sử dụng computed property imageUrl -->
            <img :src="imageUrl" alt="Book Image">
        </div>
    </div>
</template>
