<template>
  <div>
    <app-vue-select
      class="app-vue-select w-100"
      :options="list"
      :searchable="searchable"
      :reduce="item => item.id"
      :placeholder="placeholder"
      :get-option-label="genLabel"
      @input="onChange"
      @open="onOpen"
      @close="onClose"
      :all-opt="allOpt"
      has-border
    >
    </app-vue-select>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import * as actionTypes from "~/utils/action-types"
  import { get } from "lodash"
  
  const STORE_NAMESPACE = 'elearning/public/public-school-year'
  
  export default {
    model: {
      prop: "value",
      event: "input"
    },
    
    props: {
      searchable: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: 'Năm học'
      },
      classStyle: {
        type: Object,
        default: () => {}
      },
      className: {
        type: String,
        default: ''
      }
    },
    
    data() {
      return {
        list: [],
        allOpt: {
          id: null,
          name: 'Tất cả'
        }
      }
    },
    
    computed: {
      ...mapState(STORE_NAMESPACE, {
        detailInfo: "years",
      })
    },
    
    watch: {
    },
    
    methods: {
      async onOpen() {
      
      },
      onChange(val) {
        this.$emit('input', val)
      },
      async getList() {
        try {
          await this.$store.dispatch(
            `${STORE_NAMESPACE}/${actionTypes.ELEARNING_PUBLIC_SCHOOL_YEAR.LIST}`, {}
          )
          this.list = [this.allOpt, ...this.detailInfo]
        } catch (e) {
          console.log('Get public school year ', e)
        } finally {
        }
      },
      onClose() {
      },
      onSearch(search, loading) {
        loading(true)
      },
      genLabel(option) {
        if (option.id != null) {
          return `${get(option, 'from_year', 0)}-${get(option, 'to_year', 0)}`
        }
        return get(option, 'name', '')
      },
      get
    },
    created() {
      this.getList()
    },
  };
</script>

<style lang="scss">
</style>