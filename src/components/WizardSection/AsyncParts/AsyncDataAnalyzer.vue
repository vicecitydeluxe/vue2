<template>
  <dataAnalyzer/>
</template>

<script>
import parsingSpinner from "@/components/WizardSection/AsyncParts/Helpers/ParsingSpinner";
import parsingError from "@/components/WizardSection/AsyncParts/Helpers/ParsingError";

const result = import('@/components/WizardSection/DataAnalyzer')
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
