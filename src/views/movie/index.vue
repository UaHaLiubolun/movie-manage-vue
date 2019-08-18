<template>
  <div>
    <div>
      <el-input class="movie-search" v-model="searchQ" placeholder="请输入内容">
        <el-button slot="append" type="info" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="content">
      <el-card v-for="index in list" class="card" :key="index.id" v-bind="list" shadow="hover">
        <a @click="showInfo(index)">
          <img class="cover-img" :src="index.movieBean.cover">
          <div class="movie-brief">
            <span class="movie-name">{{ index.movieBean.title }}</span>
            <br>
            <span class="movie-rate">{{ index.movieBean.rate }}</span>
          </div>
        </a>
      </el-card>
    </div>
    <div>
      <el-dialog :visible.sync="infoDialog" :title="index.name" width="80%" center show-close>
        <img class="cover-img" :src="index.movieBean.cover">
        <label>名字：</label><span>{{ index.movieBean.title }}</span>
        <label>导演：</label><span>{{ info.directors[0].name }}</span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getList, searchMovie } from '@/api/moive'
import { getSubject } from '@/api/douban';

export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['addr'],
  data() {
    return {
      infoDialog: false,
      editDialog: false,
      searchQ: '',
      info: {
        directors: [{
          name: '测试'
        }]
      },
      index: {
        movieBean: {
          title: '防止报错'
        }
      },
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    showInfo(index) {
      this.index = index
      this.infoDialog = true
      this.getSubject()
    },
    search() {
      searchMovie({ q: this.searchQ }).then(response => {
        this.list = response.data
      })
    },
    getSubject() {
      getSubject(this.index.movieBean.movieId).then(response => {
        this.info = response.data
      })
    },
    fetchData() {
      getList({ root: this.addr }).then(response => {
        this.list = response.data
      })
    }
  }
}
</script>

<style>
  .movie-search {
    margin-left: 10px;
    margin-top: 20px;
    width: 500px;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
  }
  .card {
    padding: 10px;
    margin: 10px;
  }
  .movie-brief {
    overflow: hidden;
    margin-top: 10px;
  }
  .cover-img {
    width: 115px;
    height: 161px;
    max-width: 100%;
    border-width: 0;
  }
  .movie-name {
    display: block;
    text-align: center;
    max-width: 6em;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .movie-rate {
    display: block;
    color: #ffac2d;
    text-align: center;
  }
</style>
