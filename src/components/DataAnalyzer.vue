<template>
  <resultImporter/>
</template>

<script>
import importSpinner from "@/components/ImportSpinner";

const result = import('@/components/ResultImporter')
export default {
  components: {
    resultImporter: () => ({
      component: result,
      loading: importSpinner,
      error: importSpinner,
      timeout: 25000
    })
  },
}
</script>
