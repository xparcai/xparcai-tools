<script lang="ts">
  import { KAffix, KIcon } from '@ikun-ui/core'

  const toggle = () => {
    window.document.documentElement.classList.toggle('dark')
  }
</script>

<header>
  <KAffix cls="w-full z-100" top={0}>
    <div
      class="h-56px fbc bg-white px-4 shadow dark:(bg-black shadow-light-50)"
    >
      <a href="/">
        <div class="font-500">XParCai Tools</div>
      </a>
      <KIcon class="i-carbon:sun dark:i-carbon:moon" on:click={toggle}></KIcon>
    </div>
  </KAffix>
  <div class="h-56px w-full"></div>
</header>

<main class="ma w-1200px p4">
  <slot />
</main>
