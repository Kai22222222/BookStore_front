<template>
  <div class="about-us-container">
    <h1 class="title">Giới Thiệu Về Chúng Tôi</h1>

    <div class="about-content">
      <p class="intro">
        Chào mừng bạn đến với <strong>The BookWorm</strong>, nơi dành cho những người yêu sách! Sứ mệnh của chúng tôi là cung cấp những cuốn sách chất lượng nhất, từ những tác phẩm mới phát hành cho đến những tác phẩm kinh điển. Dù bạn yêu thích tiểu thuyết, sách khoa học hay sách học thuật, chúng tôi luôn có điều gì đó phù hợp với bạn!
      </p>
      
      <section class="who-we-are">
        <h2>Chúng Tôi Là Ai</h2>
        <p>
          The BookWorm được sáng lập bởi một nhóm những người đam mê sách, với mục tiêu mang sách đến gần hơn với bạn đọc trên toàn thế giới. Đội ngũ của chúng tôi bao gồm những người đọc sách, tác giả, thiết kế viên và các lập trình viên, tất cả đều mong muốn tạo ra một cộng đồng yêu thích sách và đọc sách.
        </p>
      </section>

      <section class="our-mission">
        <h2>Sứ Mệnh Của Chúng Tôi</h2>
        <p>
          Sứ mệnh của chúng tôi rất đơn giản: thúc đẩy văn hóa đọc bằng cách cung cấp một loạt các cuốn sách, tác giả và sự kiện văn học. Chúng tôi mong muốn đưa mọi người đến gần hơn với sách, khuyến khích sự đọc hiểu và giúp bạn khám phá những câu chuyện, ý tưởng, và tri thức mới. Hãy cùng chúng tôi xây dựng một thế giới mà ở đó mọi người đều có thể thưởng thức sức mạnh của sách.
        </p>
      </section>

      <section class="contact-info">
        <h2>Cùng Khám Phá</h2>
        <p>
          Hãy khám phá những câu truyện kì diệu mà TheBookWorm mang lại <router-link :to="{ name: 'contactbook' }" style="color: aliceblue;">
                    Trang chủ
                   
                </router-link>
        </p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
};
</script>

<style scoped>
.about-us-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.about-content {
  line-height: 1.6;
}

.intro {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

section {
  margin-bottom: 30px;
}

h2 {
  color:orange;
  font-size: 1.6rem;
  margin-bottom: 10px;
}

p {
  font-size: 1.1rem;
}

a {
  color: #3498db;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
