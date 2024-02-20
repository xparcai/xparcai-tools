<script lang="ts">
  import {
    KAlert,
    KButton,
    KCard,
    KCheckbox,
    KCollapse,
    KCollapseWrapper,
    KDivider,
    KInput,
    KMessage,
  } from '@ikun-ui/core'
  import {
    isArray,
    isEmptyArr,
    isEmptyObj,
    isObject,
    isString,
    toCamelCase,
    toLinesCase,
    toRawType,
  } from '@vtrbo/utils'
  import { copyText } from '$lib/utils/copy'

  let jsonCode = ''
  type TsType = [string, [boolean, string, any][]]
  let tsTypes: TsType[] = []

  let isChoose = true

  function isJsonStr(str: string) {
    if (!isString(str)) {
      return false
    }
    try {
      const jsonObj = getJsonObj(str)
      return isObject(jsonObj)
    } catch (e) {
      return false
    }
  }

  function getJsonObj(str: string) {
    // eslint-disable-next-line no-new-func
    return new Function(`return ${str}`)()
  }

  function parseJson(str: string, name: string = 'XParCai') {
    if (isJsonStr(str)) {
      const jsonObj = getJsonObj(str)
      const kv: [boolean, string, any][] = []
      for (const key in jsonObj) {
        if (isArray(jsonObj[key])) {
          if (isEmptyArr(jsonObj[key])) {
            kv.push([false, key, 'any[]'])
          } else {
            const typeName = toCamelCase(`${key}-item`, true)
            parseJson(JSON.stringify(jsonObj[key][0]), typeName)
            kv.push([false, key, `${typeName}[]`])
          }
        } else if (isObject(jsonObj[key])) {
          if (isEmptyObj(jsonObj[key])) {
            kv.push([false, key, 'Record<string, any>'])
          } else {
            const typeName = toCamelCase(`${key}`, true)
            parseJson(JSON.stringify(jsonObj[key]), typeName)
            kv.push([false, key, typeName])
          }
        } else {
          kv.push([false, key, toLinesCase(toRawType(jsonObj[key]))])
        }
      }
      tsTypes.unshift([name, kv])
    } else {
      tsTypes = []
    }
  }

  function generateTsType(tsTypesArr: TsType[]) {
    if (tsTypesArr.length > 0) {
      let typeStrArr: string[] = []
      tsTypesArr.forEach(([k, v]) => {
        typeStrArr.push(`interface ${k} {`)
        v.forEach(([vc, vk, vv]) => {
          const typeStr = `  ${vk}${isChoose || vc ? '?' : ''}: ${vv};`
          typeStrArr.push(typeStr)
        })
        typeStrArr.push('}')
      })
      copyText(typeStrArr.join('\r\n'))
    } else {
      copyText('')
    }
    KMessage.success({
      content: '复制成功',
      close: false,
    })
  }

  $: {
    tsTypes.length = 0
    parseJson(jsonCode)
  }
</script>

<KCard shadow="never">
  <div slot="header">
    <div class="flex items-center justify-between">
      <div>JSON TO TS TYPE</div>
    </div>
  </div>
  <KCard shadow="never" title="JSON格式的文本" cls="bg-ikun-light-500">
    {#if jsonCode && !isJsonStr(jsonCode)}
      <KAlert
        title="请确保输入JSON字符串"
        type="error"
        closable={false}
        cls="mb4"
      />
    {/if}
    <KInput bind:value={jsonCode} type="textarea" rows={6}></KInput>
  </KCard>
  {#if tsTypes.length > 0}
    <KDivider contentPosition="left">
      <KButton
        cls="min-w-80px inline-block"
        on:click={() => generateTsType(tsTypes)}>复制</KButton
      >
      <KCheckbox
        cls="select-none"
        value={isChoose}
        on:updateValue={(e) => (isChoose = e.detail)}
      >
        全部可选
      </KCheckbox>
    </KDivider>
    <KCard shadow="never" title="可以修改后再复制" cls="bg-ikun-light-500">
      <KCollapseWrapper accordion>
        {#each tsTypes as [tsTypeKey, tsTypeValue], tsTypeUid}
          <KCollapse uid={`collapse-${tsTypeUid}`} title={tsTypeKey} show>
            <div slot="content">
              {#each tsTypeValue as [optional, key, value], uid}
                <KInput cls="w-full my-8px first:mt-0 last:mb-0" bind:value>
                  <div
                    class="flex items-center text-nowrap mr-8px"
                    slot="prefix"
                  >
                    <span>{key}</span>
                    {#if isChoose || optional}
                      <span>?</span>
                    {/if}
                    <span>: </span>
                    {#if !isChoose}
                      <KCheckbox
                        cls="flex ml-8px"
                        uid={`${tsTypeKey}-${tsTypeUid}-${key}-${uid}`}
                        bind:value={optional}
                        on:updateValue={(e) => (optional = e.detail)}
                      >
                        可选
                      </KCheckbox>
                    {/if}
                  </div>
                </KInput>
              {/each}
            </div>
          </KCollapse>
        {/each}
      </KCollapseWrapper>
    </KCard>
  {/if}
</KCard>
