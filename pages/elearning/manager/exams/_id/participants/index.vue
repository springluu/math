<template>
  <!--List of students that do exercise/exam-->
  <div class="container">
    <breadcrumb />
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="3"/>
      </div>
      <div class="col-md-9">
        <sub-block-section
          title="Danh sách làm bài"
          has-icon
        >
          <template v-slot:content>
            <div class="elearning-manager-content p-0">
              <div class="elearning-manager-content__main py-2">
                <participant-filter-form
                  @submitFilter="submitFilter"
                  @changedClass="handleChangedClass"
                  @changedResult="handleChangedResult"
                  @submitSearch="handleSubmitSearch"
                />
  
                <!--Table-->
                <participant-table
                  :list.sync="list"
                  :pagination="pagination"
                  :loading="loading"
                  @changedPagination="updatePagination"
                />
              </div>
            </div>
          </template>
        </sub-block-section>
      </div>
    </div>
  </div>
</template>

<script>
  import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide"
  import ParticipantFilterForm from "~/components/page/elearning/manager/exam/forms/ResultFilter"
  import ParticipantTable from "~/components/page/elearning/manager/exam/tables/Participant"
  import HeaderBreadcrumb from "~/components/page/elearning/HeadBreadcrumb"

  import {mapState} from "vuex"
  import * as actionTypes from "~/utils/action-types"
  import { get } from "lodash"
  import { useEffect, getParamQuery, initBreadcrumb, createPageTitle, initPageTitle } from "~/utils/common"
  import { exCate2Txt } from "~/plugins/filters"
import elearning from '../../../../../../store/elearning/teaching/elearning'

  const STORE_NAMESPACE = "elearning/teaching/participant"
  const EXERCISE_STORE_NAMESPACE = "elearning/teaching/exercise"

  export default {
    layout: "manage",
    
    components: {
      ElearningManagerSide,
      ParticipantTable,
      ParticipantFilterForm,
      HeaderBreadcrumb
    },

    data() {
      return {
        pagination: {
          total_elements: 0,
          last: false,
          total_pages: 1,
          size: 10,
          number: 0,
          first: true,
          number_of_elements: 0
        },
        params: {
          page: 1,
          size: 10,
          exercise_id: '',
          class_id: null,
          result: null,
          query: null
        },
        list: [],
        loading: false,
      }
    },
    computed: {
      ...mapState("auth", ["loggedUser"]),
      ...mapState(STORE_NAMESPACE, {
        detailInfo: 'participants'
      }),
      ...mapState(EXERCISE_STORE_NAMESPACE, {
        exercise: 'currentExercise'
      }),
      breadcrumb: function() {
        let data = [
          {
            text: exCate2Txt(this.get(this.exercise, 'category', '')),
            link: '/elearning/manager/exams'
          },
          {
            text: get(this, 'exercise.elearning', ''),
            link: '/elearning/manager/exams'
          },
          {
            text: get(this, 'exercise.title', ''),
            link: '/elearning/manager/exams'
          }
        ]
        return data
      }
    },

    methods: {
      async getExerciseDetail() {
        const exerciseId = this.$route.params.id
        await this.$store.dispatch(
          `${EXERCISE_STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_EXERCISE.DETAIL}`, exerciseId
        )
      },
      async getList() {
        try {
          this.loading = true
          const exerciseId = this.$route.params.id
          this.params.exercise_id = exerciseId
          let params = {...this.params}
          await this.$store.dispatch(
            `${STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_EXERCISE_PARTICIPANT.LIST}`, { params }
          )
          this.list = this.get(this.detailInfo, 'data.content', [])
          this.pagination.size = this.get(this.detailInfo, 'data.page.size', 10)
          this.pagination.first = this.get(this.detailInfo, 'data.page.first', 1)
          this.pagination.last = this.get(this.detailInfo, 'data.page.last', 1)
          this.pagination.number = this.get(this.detailInfo, 'data.page.number', 0)
          this.pagination.total_pages = this.get(this.detailInfo, 'data.page.total_pages', 0)
          this.pagination.total_elements = this.get(this.detailInfo, 'data.page.total_elements', 0)
          this.pagination.number_of_elements = this.get(this.detailInfo, 'data.page.number_of_elements', 0)
          // this.pagination = {...this.get(this.detailInfo, 'data.page', {})}
        } catch (e) {

        } finally {
          this.loading = false
        }

      },
      updateFilter(val) {
        this.params = { ...this.params, ...val }
        this.refreshData()
      },
      submitFilter(val) {
        this.updateFilter(val)
      },
      handleSubmitSearch(val) {
        this.updateFilter({ query: val })
      },
      handleChangedClass(val) {
        this.updateFilter({ class_id: val })
      },
      handleChangedResult(val) {
        this.updateFilter({ result: val })
      },
      updatePagination(val) {
        this.params.size !== val.size ? this.params.page = 1 : this.params.page = val.number + 1
        this.params.size = val.size
        this.getList()
      },
      refreshData() {
        this.params.page = 1
        this.getList()
      },
      get
    },

    created() {
      this.getList()
      this.getExerciseDetail()
    },
    mounted() {
      const elearningName = getParamQuery('elearning_name')
      const exerciseName = getParamQuery('item_name')
      const breadcrumb = [
        {
          title: 'Quản lý E-learning',
          to: '/elearning'
        },
        {
          title: 'Bài tập và bài kiểm tra',
          to: '/elearning/manager/exams'
        },
        {
          title: elearningName,
          to: `/elearning/manager/exams/exercise?elearning_id=${getParamQuery('elearning_id')}&elearning_name=${elearningName}`
        },
        {
          title: exerciseName,
          to: ''
        },
      ]
      initBreadcrumb(this, breadcrumb);
      initPageTitle(this, createPageTitle('Quản lý bài tập & bài kiểm tra'));
    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
  @import "~/assets/scss/components/elearning/_elearning-filter-form.scss";
  .filter-form {
    &.filter-form--participant {
      .filter-form__item--search {
        width: 20rem;
      }
    }
  }
</style>