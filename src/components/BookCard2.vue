<script>
    export default {
        props: {
            contact: { type: Object, required: true },
        },
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
    </div>
</template>