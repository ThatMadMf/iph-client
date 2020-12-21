<template>
  <div class="container">
    <h1>Publications</h1>
    <a-tabs default-active-key="Math">
      <a-tab-pane class="subject" v-for="subject in subjects" :key="subject" :tab="subject">
        <a-card class="publication" v-for="item in current(pubs, subject)" :key="item.id">
          <h2>{{ item.title }}</h2>
          <h3 v-if="item.deadline">
            Work
          </h3>
          <h3 v-else>
            Announcement
          </h3>
          {{ item.text }}
          <div v-if="item.deadline">
            <a-upload
              :multiple="true"
              :before-upload="beforeUpload"
            >
              <a-button>
                <a-icon type="upload" /> Select File
              </a-button>
            </a-upload>
            <a-button
              type="primary"
              style="margin-top: 16px"
              @click="handleUpload(item)">
              <a-icon type="upload" /> Upload
            </a-button>
            <div class="deadline" v-if="item.deadline.slice(0, 4) === '4000'">
              deadline didn't settled
            </div>
            <div class="deadline" v-else>
              Due to: {{ item.deadline.slice(0, 10) }}
            </div>
          </div>
          <br>
          <div class="author">
            Author: {{item.author.name}}
          </div>
        </a-card>
      </a-tab-pane>
    </a-tabs>
    <div>
      <a-button type="primary" @click="showDrawer">
        Open
      </a-button>
      <a-drawer
        width="1000px"
        title="Basic Drawer"
        placement="right"
        :closable="false"
        :visible="visible"
        @close="onClose"
      >
        <div >
          <a-calendar>
            <ul slot="dateCellRender" slot-scope="value" class="events">
              <li v-for="item in getListData(value)" :key="item.content">
                <a-badge :status="item.type" :text="item.content" />
              </li>
            </ul>
            <template slot="monthCellRender" slot-scope="value">
              <div v-if="getMonthData(value)" class="notes-month">
                <section>{{ getMonthData(value) }}</section>
                <span>Backlog number</span>
              </div>
            </template>
          </a-calendar>
        </div>
      </a-drawer>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import {
  GET_PUBLICATIONS, GET_STUDENT_PUBLICATIONS, POST_SUBMISSION, SWAP_CALENDAR_STATE, UPLOAD_FILE,
} from '@/store/action-types';
import store from '../store/index';
import 'ant-design-vue/dist/antd.css';

export default {
  name: 'publicationList',
  store,
  computed: {
    ...mapGetters([
      'publications',
      'visible',
      'uploadFile',
    ]),
    pubs() {
      return this.publications;
    },
    subjects() {
      return [...new Set(this.publications.map((publication) => publication.subject.title))];
    },
  },
  methods: {
    showDrawer() {
      this.$store.dispatch(SWAP_CALENDAR_STATE);
    },
    onClose() {
      this.$store.dispatch(SWAP_CALENDAR_STATE);
    },
    current(pubs, subject) {
      return pubs.filter((pub) => pub.subject.title === subject);
    },
    handleUpload(work) {
      const studentId = this.$route.params.id;
      console.log(studentId);
      this.$store.dispatch(POST_SUBMISSION, work.id, studentId);
    },
    beforeUpload(file) {
      this.$store.dispatch(UPLOAD_FILE, file);
    },
    getListData(value) {
      let listData;
      const publicationDates = [...new Set(this.publications
        .map((publication) => publication.deadline))];

      if (value.date() in publicationDates) {
        listData = [
          { type: 'warning', content: 'deadline' },
        ];
      }
      return listData || [];
    },

    // eslint-disable-next-line consistent-return
    getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    },
  },
  mounted() {
    if (this.$route.params.filter === 'student') {
      this.$store.dispatch(GET_STUDENT_PUBLICATIONS, this.$route.params.id);
    } else {
      this.$store.dispatch(GET_PUBLICATIONS);
    }
  },
};
</script>

<style>
  .container {
    margin: auto;
    width: 90%;
  }
  .publication {
    width: 50%;
    margin: 2rem auto;
  }

  .deadline {
   margin-left: 70%;
  }

  .author {
    float: right;
  }

</style>
