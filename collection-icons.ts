import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export const localIconCollections = {
  or: FileSystemIconLoader(
    'src/assets/icons',
    svg => svg,
  ),
  fo: FileSystemIconLoader(
    'src/assets/icons',
    svg => svg
      .replace(/fill=".*?"/g, 'fill="currentColor"')
      .replace(/width=".*?"/g, '')
      .replace(/height=".*?"/g, ''),
  ),
}
