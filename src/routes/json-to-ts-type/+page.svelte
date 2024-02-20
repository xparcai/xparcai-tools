<script lang="ts">
  import {
    KButton,
    KCard,
    KCheckbox,
    KCheckboxGroup,
    KCollapse,
    KCollapseWrapper,
    KDivider,
    KInput,
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
  import jsonStr from './test-json.json?raw'

  let jsonCode = jsonStr
  const tsTypes: [string, [boolean, string, any][]][] = []
  function isJsonStr(str: string) {
    if (!isString(str)) {
      return false
    }
    try {
      const jsonObj = JSON.parse(str)
      return isObject(jsonObj)
    } catch (e) {
      return false
    }
  }
  function parseJson(str: string, name: string = 'XParCai') {
    if (isJsonStr(str)) {
      const jsonObj = JSON.parse(str)
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
    }
  }

  $: {
    tsTypes.length = 0
    parseJson(jsonCode)
  }

  let isChoose = true
  let chooseGroup = []
</script>

<KCard shadow="never">
  <div slot="header">
    <div class="flex items-center justify-end">
      <KCheckbox
        cls="select-none"
        value={isChoose}
        on:updateValue={(e) => (isChoose = e.detail)}
      >
        是否可选
      </KCheckbox>
    </div>
  </div>
  <KCard shadow="never" title="JSON格式的文本" cls="bg-ikun-light-500">
    <KInput bind:value={jsonCode} type="textarea" rows={10}></KInput>
  </KCard>
  {#if tsTypes.length > 0}
    <KDivider contentPosition="left">
      <KButton cls="min-w-80px">复制</KButton>
    </KDivider>
    <KCard shadow="never" title="可以修改后再复制" cls="bg-ikun-light-500">
      <KCollapseWrapper accordion>
        <KCheckboxGroup
          {chooseGroup}
          on:updateValue={(e) => (chooseGroup = e.detail)}
        >
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
        </KCheckboxGroup>
      </KCollapseWrapper>
    </KCard>
  {/if}
</KCard>
