<template>
  <h2 class="test-hi">test</h2>
</template>

<style scoped lang="scss">
.test {
  &-hi {
    color: red;

    @include mixins.mq("md") {
      color: blue;
    }
  }
}
</style>
