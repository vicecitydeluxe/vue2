<template>
  <resultImporter/>
</template>

<script>
import parsingSpinner from "@/components/AsyncParts/Helpers/ParsingSpinner";
import parsingError from "@/components/AsyncParts/Helpers/ParsingError";

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
