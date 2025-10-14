<script setup lang="ts">
import Button from "./Button.vue";
import { useTranslationContext } from "../i18n/context";
import Link from "./Link.vue";

const { locale, pathnameWithoutLocale } = useTranslationContext();
</script>

<template>
  <Link :href="pathnameWithoutLocale" :locale="locale === 'de' ? 'en' : 'de'">
    <Button variant="border" size="sm" renderAs="div">{{ locale === "de" ? "EN" : "DE" }}</Button>
  </Link>
</template>
