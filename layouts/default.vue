<template>
  <div class="layout-default">
    <Header />
    <main class="layout-default-main">
      <slot />
    </main>
    <Footer />
    <BackToTop />
  </div>
</template>

<style scoped>
.layout-default {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.layout-default .layout-default-main {
  flex: 1;
}
</style>
