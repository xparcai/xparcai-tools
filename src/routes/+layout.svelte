<script lang="ts">
  import { KIcon } from '@ikun-ui/core'

  const toggle = () => {
    window.document.documentElement.classList.toggle('dark')
  }
</script>

<header>
  <div class="p4 fbc shadow dark:shadow-light-50">
    <div class="font-500">XParCai Tools</div>
    <KIcon class="i-carbon:sun dark:i-carbon:moon" on:click={toggle}></KIcon>
  </div>
</header>

<main class="p4 w-1200px ma">
  <slot />
</main>
