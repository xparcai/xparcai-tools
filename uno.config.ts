import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTagify,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerAttributifyJsx,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import extractorSvelte from '@unocss/extractor-svelte'
import { localIconCollections } from './collection-icons'

export default defineConfig({
  extractors: [extractorSvelte()],
  presets: [
    presetUno(),
    presetTagify(),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,600,800',
        mono: 'DM Mono:400,600',
      },
    }),
    presetTypography(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      autoInstall: true,
      collections: localIconCollections,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerCompileClass(),
    transformerVariantGroup(),
    transformerAttributifyJsx(),
  ],
  shortcuts: [],
  rules: [],
  safelist: [],
})