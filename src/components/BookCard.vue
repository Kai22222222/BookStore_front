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
            <strong>Tên:</strong>
            {{ contact.username }}
        </div>
        <div class="p-1">
            <strong>passw:</strong>
            {{ contact.password }}
        </div>
    </div>
</template>