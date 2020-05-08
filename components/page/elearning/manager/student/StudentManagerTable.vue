<template>
  <div>
    <app-table
      :heads="heads"
      :pagination="pagination"
      @pagechange="onPageChange"
      :data="list"
      :loading="loading"
    >
      <template v-slot:cell(action)>
        <td>
          <n-link
            class
            title="Chi tiết"
            :to="`/elearning/manager/students/1`">
            <IconArrow height="13"/>
          </n-link>
        </td>
      </template>
      
      <template v-slot:cell(type)="{row}">
        <td>
          {{ get(row, 'type', '') | exerciseTypeFilter }}
        </td>
      </template>
      
      <template v-slot:cell(rate)="{row}">
        <td>
          <v-popover
            offset="10"
            trigger="hover"
            placement="top"
            popover-class="tooltip--rate"
          >
            <div>
              <span class="status-item status-item--success d-inline-block">
                {{get(row, 'passed_percent', 0)}}%
              </span>
              <span class="status-item status-item--fail d-inline-block">
                {{get(row, 'failed_percent', 0)}}%
              </span>
              <span class="status-item status-item--pending d-inline-block">
                {{get(row, 'pending_percent', 0)}}%
              </span>
            </div>
            
            <template slot="popover" class="tooltip-detail">
              <div>
                <rate-status
                  total="1000"
                  passed="200"
                  failed="300"
                  pending="500"
                >
                </rate-status>
              </div>
            </template>
          
          </v-popover>
        </td>
      </template>
      
      <template v-slot:cell(created)="{row}">
        <td>
          {{ get(row, 'created', '') | moment("DD/MM/YYYY") }}
        </td>
      </template>
    </app-table><!--End table-->
  </div>
</template>

<script>
  import { get } from "lodash"
  import IconArrow from "~/assets/svg/v2-icons/arrow_forward_ios_24px.svg?inline"
  import RateStatus from "~/components/page/elearning/manager/exam/RateStatus"
  import { ELEARNING_TYPES } from "~/utils/constants"
  
  export default {
    components: {
      IconArrow,
      RateStatus
    },
    
    props: {
      list: {
        type: Array,
        default: () => []
      },
      pagination: {
        type: Object,
        default: () => {
          return {
            total: 0,
            size: 10,
            page: 1,
            totalElements: 0,
            first: 1,
            last: 1,
            number: 0
          }
        }
      },
      heads: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    
    filters: {
      exerciseTypeFilter: function(val) {
        const MATCHED_DATA = {
          [ELEARNING_TYPES.COURSE]: 'Khóa học',
          [ELEARNING_TYPES.LECTURE]: 'Bài giảng'
        }
        if (MATCHED_DATA.hasOwnProperty(val))
          return MATCHED_DATA[val]
        return '-'
      }
    },
    
    data() {
      return {
    
      }
    },
    
    computed: {
    },
    methods: {
      onPageChange(e) {
        this.$emit('changedPagination', e)
      },
      get
    },
  }
</script>

<style lang="scss">
</style>