<template>
  <dataAnalyzer/>
</template>

<script>
import parsingSpinner from "@/components/ParsingSpinner";
import parsingError from "@/components/ParsingError";

const result = import('@/components/DataAnalyzer')
export default {
  components: {
    dataAnalyzer: () => ({
      component: result,
      loading: parsingSpinner,
      error: parsingError,
      timeout: 25000,
      delay: 500
    })
  },
}
</script>
