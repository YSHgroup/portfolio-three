<script setup lang="ts">
import Button from "./Button.vue";
import Link from "./Link.vue";
import { pathnameWithoutLocale, locale } from "../i18n/store";
</script>

<template>
  <Link :href="pathnameWithoutLocale" :locale="locale === 'de' ? 'en' : 'de'" replace>
    <Button variant="border" size="sm" renderAs="div">{{ locale === "de" ? "EN" : "DE" }}</Button>
  </Link>
</template>
