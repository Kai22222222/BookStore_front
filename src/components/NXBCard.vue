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
            <strong>mã nxb:</strong>
            {{ contact.manxb }}
        </div>
        <div class="p-1">
            <strong>tên nhà xuất bản:</strong>
            {{ contact.tennxb }}
        </div>
         <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ contact.diachi }}
        </div>
    </div>
</template>