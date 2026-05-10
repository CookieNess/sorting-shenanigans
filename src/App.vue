<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink to="/" class="site-logo">
        <span class="logo-bracket">[</span>
        <span class="logo-text">sorting</span>
        <span class="logo-accent">shenanigans</span>
        <span class="logo-bracket">]</span>
      </RouterLink>
    </header>

    <main class="site-main">
      <RouterView />
    </main>

    <footer class="site-footer">
      <span class="mono" style="color: var(--overlay0); font-size: 0.8rem;">
        Built by Frederik "CookieNess" Kjærgaard
      </span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  padding: 24px 32px 20px;
  border-bottom: 1px solid var(--surface0);
  background: var(--mantle);
  display: flex;
  align-items: baseline;
  gap: 20px;
  flex-wrap: wrap;
}

.site-logo {
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
  letter-spacing: -0.02em;
}
.logo-bracket { color: var(--surface2); }
.logo-text    { color: var(--text); }
.logo-accent  { color: var(--mauve); }

.site-main { flex: 1; }

.site-footer {
  padding: 20px 32px;
  border-top: 1px solid var(--surface0);
  background: var(--mantle);
  text-align: center;
}

@media (max-width: 600px) {
  .site-header { padding: 16px 20px; gap: 8px; }
  .site-logo   { font-size: 1.25rem; }
  .site-tagline { display: none; }
}
</style>
