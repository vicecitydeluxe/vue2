<template>
  <resultImporter/>
</template>

<script>
import parsingSpinner from "@/components/ParsingSpinner";
import parsingError from "@/components/ParsingError";

const result = import('@/components/ResultImporter')
export default {
  components: {
    resultImporter: () => ({
      component: result,
      loading: parsingSpinner,
      error: parsingError,
      timeout: 25000,
      delay: 500
    })
  },
}
</script>
