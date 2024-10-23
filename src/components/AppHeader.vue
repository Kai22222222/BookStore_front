<template>
    <header>
    
        <h2 class="logo">Epic Reads</h2>
<nav class="navbar   navigation">
   <div class="nav-item">
<router-link :to="{ name: 'contactbook' }" style="color: aliceblue;">
 
Home
<i class="fas fa-address-book"></i>

</router-link >
</div>
<div class ="nav-item">
<router-link :to="{ name: 'contactbook' }" style="color: aliceblue;" >
    
About
<i class="fas fa-address-book"></i>

</router-link>
</div>
<router-link :to="{ name: 'book.login' }">
    <button  class="btn_login">
Login
</button>
</router-link>


</nav>
</header>
</template>