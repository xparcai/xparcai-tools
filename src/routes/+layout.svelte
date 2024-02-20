<script lang="ts">
  import { KAffix, KIcon } from '@ikun-ui/core'

  const toggle = () => {
    window.document.documentElement.classList.toggle('dark')
  }
</script>

<header>
  <KAffix cls="w-full z-100" top={0}>
    <div
      class="h-56px px-4 fbc shadow bg-white dark:(shadow-light-50 bg-black)"
    >
      <a href="/">
        <div class="font-500">XParCai Tools</div>
      </a>
      <KIcon class="i-carbon:sun dark:i-carbon:moon" on:click={toggle}></KIcon>
    </div>
  </KAffix>
  <div class="w-full h-56px"></div>
</header>

<main class="p4 w-1200px ma">
  <slot />
</main>
