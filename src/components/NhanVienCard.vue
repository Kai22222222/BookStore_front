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
            <strong>mã nhân viên:</strong>
            {{ contact.manv }}
        </div>
        <div class="p-1">
            <strong>họ tên nhân viên:</strong>
            {{ contact.hoten }}
        </div>
        <div class="p-1">
            <strong>chức vụ:</strong>
            {{ contact.chucvu }}
        </div>
         <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ contact.diachi }}
        </div>
        <div class="p-1">
            <strong>Số điện thoại:</strong>
            {{ contact.sodienthoai }}
        </div>
    </div>
</template>