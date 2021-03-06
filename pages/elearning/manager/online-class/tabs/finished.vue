<template>
  <div class="elearning-wrapper">
    <!--Filter form-->
    <div class="filter-form">
        <div class="d-flex">
      <div class="filter-form__item">
        <app-date-picker
          v-model="query_date"
          square
          size="sm"
          placeholder="dd/mm/yyyy"
        >
          <template v-slot:icon-calendar>
            <IconCalendar class="fill-primary"/>
          </template>
        </app-date-picker>
      </div>

        <div class="filter-form__item" style="max-width:36rem;min-width:30rem;">
        <div style="width: 100%">
          <app-search
            class
            :placeholder="'Nhập để tìm kiếm...'"
            bordered
            v-model="query"
            :size="'sm'"
            @submit="submit"
            @keyup.enter.native="submit"
          ></app-search>
        </div>
      </div>

      <div class="filter-form__item">
        <app-button
          :color="showFilter ? 'primary' : 'white'"
          square
          :size="'sm'"
          @click="toggleFilter"
        >
          <IconHamberger :class="showFilter ? 'fill-white' : 'fill-primary'" class="mr-2" />
          <span>Lọc kết quả</span>
        </app-button>
      </div>

      <div class="filter-form__item" style="min-width: 19rem" v-if="showFilter">
        <app-vue-select
          class="app-vue-select filter-form__item__selection"
          v-model="filterCourse"
          :options="courseOpts"
          label="text"
          placeholder="Bài giảng/khóa học"
          @input="handleChangedCourse"
          :all-opt="allOpt"
          has-border
        ></app-vue-select>
      </div>
    </div>
    </div>
    <!--End filter form-->

    <!--Options group-->
    <div class="filter-form">
      <div class="filter-form__item">
        <app-button class="filter-form__item__btn m-0" color="pink" square :size="'sm'"
        :disabled="ids.length == 0" @click="showModalConfirm = true">
          <IconTrash class="fill-white"/>
          <span class="ml-3">Hủy phòng học</span>
        </app-button>
      </div>
    </div>
    <!--Options group-->

    <!--Table-->
    <OnlineClassTable 
      :loading="loading" 
      :pagination="pagination" 
      @pagechange="onPageChange"
      @selectionChange="selectRow"
      @sort="handleSort"
      :actions="[0,0,1]"
      :data="classList"/>
    <!--End table-->
    
    <app-modal-confirm
        v-if="showModalConfirmSchedules"
        @ok="deleteSchedules"
        :width="550"
        @cancel="showModalConfirmSchedules = false"
        :footer="false"
        :header="false"
        title="Xác nhận hủy phòng học?"
        description="Bạn có chắc chắn muốn hủy tất cả các lịch học của phòng học này"
      />
  </div>
</template>

<script>
import IconCalendar from "~/assets/svg/icons/calendar2.svg?inline";
import IconTrash from "~/assets/svg/icons/trash-alt.svg?inline";
import IconHamberger from '~/assets/svg/icons/hamberger.svg?inline';
import OnlineClassTable from "~/components/page/elearning/manager/olclass/OnlineClassTable";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get, reduce } from "lodash";
import { useEffect } from "~/utils/common";
import {
  getUTCDateTime
} from "~/utils/moment";

const STORE_NAMESPACE = "elearning/teaching/olclass";
const STORE_PUBLIC_SEARCH = "elearning/public/public-search";

export default {
  components: {
    IconCalendar,
    IconTrash,
    IconHamberger,
    OnlineClassTable
  },

  data() {
    return {
      allOpt: {
        value: null,
        text: 'Tất cả'
      },
      showModalConfirmSchedules: false,
      showModalConfirm: false,
      loading: false,
      showFilter: false,
      courses: [],
      filterCourse: null,
      pagination: {
        total: 0,
        number: 0,
        size: 10,
        total_elements: 0,
        first: 0,
        last: 0
      },
      classList: [],
      lessonList: [],
      ids: [],
      params: {
        page: 1,
        size: 10,
        class_status: "FINISHED",
        query: null,
        query_date: null,
        search_type: null,
        sort: 'start_time,desc'
      },
      query: '',
      query_date: '',
      checkSubmit: false
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      stateClass: "OnlineClass"
    }),
    ...mapState(STORE_PUBLIC_SEARCH, {
      stateElearnings: "Elearnings"
    }),
    courseOpts() {
      let list = [];
      let elearnings = get(this.stateElearnings, 'data', []);
      elearnings.forEach(element => {
        if (!element.is_hidden) {
          list.push({
            value: element.id,
            text: element.name
          });
        }
      });
      return [this.allOpt, ...list]
    }
  },

  watch: {
    query() {
      this.checkSubmit = true;
    },
    query_date() {
      this.checkSubmit = true;
    },
  },

  methods: {
    getUTCDateTime,
    
    handleSort(e) {
      const sortBy = e.sortBy + ',' + e.order;
      this.params = {...this.params, sort: sortBy};
      this.getList();
    },

    toggleFilter() {
      if (this.showFilter && this.filterCourse != null) {
        this.filterCourse = null;
        this.params = {...this.params,
          elearning_id: null
        }
        this.getList();
      }
      this.showFilter = !this.showFilter;
    },

    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      that.params.size = that.pagination.size;
      that.params.page = that.pagination.number + 1;
      that.getList();
    },

    submit() {
      if (this.checkSubmit) {
        this.getList();
        this.checkSubmit = false;
      }
    },
    
    handleChangedCourse(val) {
      this.params.elearning_id = this.filterCourse.value;
      this.getList();
    },

    selectRow(data) {
      this.ids = data.map((row, index, data) => {
        return row.online_class_id;
      });
    },

    async getList() {
      const self = this;
      try {
        self.loading = true;
        let params = { ...self.params};
        if (this.query_date) params.query_date = this.query_date;
        if (this.query) params.query = this.query;
        await self.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASSES.LIST}`,
          { params }
        );

        this.classList = this.get(self.stateClass, "data.content", []);
        this.pagination.size = this.get(this.stateClass, "data.size", 10);
        this.pagination.first = this.get(this.stateClass, "data.first", 1);
        this.pagination.last = this.get(this.stateClass, "data.last", 1);
        this.pagination.number = this.get(this.stateClass, "data.number", 0);
        this.pagination.total_pages = this.get(
          this.stateClass,
          "data.total_pages",
          0
        );
        this.pagination.total_elements = this.get(
          this.stateClass,
          "data.total_elements",
          0
        );
        this.pagination.number_of_elements = this.get(
          this.stateClass,
          "data.number_of_elements",
          0
        );
      } catch (e) {
      } finally {
        this.loading = false;
      }
    },

    async deleteRows() {
      let ids = { online_class_ids: [...this.ids] };
      const doDelete = await this.$store.dispatch(
        `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASSES.DELETE}`,
        JSON.stringify(ids)
      );

      if (doDelete.success) {
        this.ids = [];
        this.getList();
      } else {
        this.$toasted.error(doDelete.message);
      }

      this.showModalConfirm = false;
    },

    get
  },

  created() {
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/_elearning-filter-form.scss";
.appended-col {
  p {
    max-width: 15rem;
  }
  .text-description {
    color: #999;
    font-size: 1.2rem;
    line-height: 1.6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>