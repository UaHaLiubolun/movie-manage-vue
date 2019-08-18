<template>
  <div>
    <div>
      <el-input class="movie-search" v-model="searchQ" placeholder="请输入内容">
        <el-button slot="append" type="info" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-button type="success" @click="clean">清空</el-button>
      <el-switch style="padding-left: 10px" v-model="hasMovieBean" @change="changeHas">
      </el-switch>
    </div>
    <div class="content">
      <el-table
        :data="list"
        border
        highlight-current-row
        style="width: 90%">
        <el-table-column
          prop="name"
          label="文件名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="time"
          label="时长"
          width="180">
        </el-table-column>
        <el-table-column
          prop="size"
          label="大小">
        </el-table-column>
        <el-table-column
          prop="root"
          label="盘符">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog :visible.sync="editDialog" :title="index.name" width="80%" center show-close>
        <div>
          <el-input class="movie-search" v-model="title" placeholder="请输入内容">
            <el-button slot="append" type="info" icon="el-icon-search" @click="searchDouBan"></el-button>
          </el-input>
        </div>
        <div class="content">
          <el-card v-for="index in movieBean" class="card" :key="index.id" v-bind="movieBean" shadow="hover">
            <a @click="choose(index)">
              <img class="cover-img" :src="index.cover">
              <div class="movie-brief">
                <span class="movie-name">{{ index.title }}</span>
                <br>
                <span class="movie-rate">{{ index.rate }}</span>
              </div>
            </a>
          </el-card>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getAll, save } from '@/api/moive'
import { getTitle } from '@/api/douban'

export default {
  data() {
    return {
      searchQ: '',
      hasMovieBean: false,
      originList: [],
      list: [],
      index: {},
      movieBean: [],
      title: '',
      editDialog: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    changeHas(has) {
      console.log(has)
      this.search()
    },
    edit(index) {
      this.title = index.name
      this.getDouBanMovie()
      this.editDialog = true
      this.index = index
    },
    choose(index) {
      this.index.movieBean = index
      this.save()
    },
    searchDouBan() {
      this.getDouBanMovie()
    },
    search() {
      this.list = this.originList.filter(item => {
        if (this.searchQ === '' && !this.hasMovieBean) {
          return true
        }
        if (this.hasMovieBean) {
          return item.movieBean == null && item.name.indexOf(this.searchQ) !== -1
        }
        return item.name.indexOf(this.searchQ) !== -1
      })
    },
    clean() {
      this.list = this.originList
    },
    save() {
      save(this.index).then(response => {
        this.$message.success('设置成功')
        this.editDialog = false
      })
    },
    getDouBanMovie() {
      getTitle(this.title).then(response => {
        this.movieBean = response.data
      })
    },
    fetchData() {
      getAll().then(response => {
        this.list = response.data
        this.originList = response.data
      })
    }
  }
}
</script>

<style>
  .movie-search {
    margin-left: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
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
