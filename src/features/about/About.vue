<template>
  <div class="about">
    <p>about</p>
    <div class="about-overlay">
      <div class="about-sticky">
        <svg
          class="about-lines"
          width="460"
          height="247"
          viewBox="0 0 460 247"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 39H225.722V127M225.722 127H402M225.722 127V167H78V209"
            stroke="#54F9FF"
            stroke-width="3"
            vector-effect="non-scaling-stroke"
          />
          <circle cx="410" cy="127" r="10" stroke="#54F9FF" stroke-width="3" vector-effect="non-scaling-stroke" />
          <circle cx="78" cy="217" r="10" stroke="#54F9FF" stroke-width="3" vector-effect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about {
  min-height: calc(var(--100vh) * 2);
  position: relative;
  width: 100%;

  &-lines {
    position: absolute;
    top: 0;
    left: 0;
  }

  &-overlay {
    position: absolute;
    transform: translateY(calc(var(--100vh) * -1));
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% + var(--100vh));
    opacity: 0;
  }

  &-sticky {
    position: sticky;
    top: var(--100vh);
    height: var(--100vh);
    width: 100%;
    /**    background: radial-gradient(
      ellipse at center,
      rgba(0, 14, 47, 0) 70%,
      rgba(0, 14, 47, 0.9) 99%,
      rgba(0, 14, 47, 1) 100%
    ); */
  }
}
</style>
