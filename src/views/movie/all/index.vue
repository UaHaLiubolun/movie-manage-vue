<template>
  <div>
    <div>
      <el-row>
        <el-col :span="20" :offset="2" style="margin-top: 30px">
          <el-radio-group v-model="douBanRequest.tags" @change=search>
            <el-radio v-for="indexType in types" :key="indexType" :label="indexType" border style="margin-left: 5px; margin-top: 5px" size="small"></el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="2" style="margin-top: 30px">
          <el-button @click=addSpider>添加爬虫</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="2" style="margin-top: 15px">
          <el-radio-group v-model="douBanRequest.genres" @change=search>
            <el-radio v-for="indexType in genres" :key="indexType" :label="indexType" border style="margin-left: 5px; margin-top: 5px" size="small"></el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="2" style="margin-top: 15px">
          <el-radio-group v-model="douBanRequest.countries" @change=search>
            <el-radio v-for="indexType in countries" :key="indexType" :label="indexType" border style="margin-left: 5px; margin-top: 5px" size="small"></el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <el-card v-for="index in list" class="card" :key="index.id" v-bind="list" shadow="hover">
        <a @click="showInfo(index)">
          <img class="cover-img" :src="index.cover">
          <div class="movie-brief">
            <span class="movie-name">{{ index.title }}</span>
            <br>
            <span class="movie-rate">{{ index.rate }}</span>
          </div>
        </a>
      </el-card>
    </div>
    <div>
      <el-dialog :visible.sync="infoDialog" :title="index.title" width="80%" center show-close>
        <img class="cover-img" :src="index.cover">
        <label>名字：</label><span>{{ index.title }}</span>
        <label>导演：</label><span>{{ info.directors[0].name }}</span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { query, addSpider } from '@/api/moive'
import { getSubject } from '@/api/douban'

export default {
  // eslint-disable-next-line vue/require-prop-types
  data() {
    return {
      types: ['全部形式', '电影', '电视剧', '动漫', '纪录片', '短片'],
      genres: ['全部类型', '剧情', '喜剧', '动作', '爱情', '科幻', '动画', '悬疑', '惊悚', '恐怖', '犯罪', '同性', '音乐', '歌舞', '传记', '历史', '战争', '西部', '奇幻', '冒险', '灾难', '武侠', '情色'],
      countries: ['全部国家', '中国大陆', '美国', '中国香港', '中国台湾', '日本', '韩国', '英国', '法国', '德国', '意大利', '西班牙', '印度', '泰国', '俄罗斯', '伊朗', '加拿大', '澳大利亚', '爱尔兰', '瑞典', '巴西', '丹麦'],
      fuck: ['全部特色', '经典', '青春', '文艺', '搞笑', '励志', '魔幻', '感人', '女性', '黑帮'],
      type: '',
      country: '',
      infoDialog: false,
      editDialog: false,
      douBanRequest: {
        countries: '',
        genres: '',
        tags: '',
        sort: 'U',
        range: '5,10',
        num: 15
      },
      searchQ: '',
      info: {
        directors: [{
          name: '测试'
        }]
      },
      index: {
        title: '防止报错'
      },
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    search(value) {
      console.log(value)
      if (this.douBanRequest.tags === '全部形式') {
        this.douBanRequest.tags = ''
      }
      if (this.douBanRequest.countries === '全部国家') {
        this.douBanRequest.countries = ''
      }
      if (this.douBanRequest.genres === '全部类型') {
        this.douBanRequest.genres = ''
      }
      this.fetchData()
    },
    showInfo(index) {
      this.index = index
      this.infoDialog = true
      this.getSubject()
    },
    addSpider() {
      if (this.douBanRequest.tags === '全部形式' || this.douBanRequest.tags === '') {
        this.douBanRequest.tags = '电影'
      }
      addSpider(this.douBanRequest).then(response => {
        this.$message({
          message: '恭喜你，添加成功了哟',
          type: 'success'
        })
      })
    },
    getSubject() {
      getSubject(this.index.movieId).then(response => {
        this.info = response.data
      })
    },
    fetchData() {
      query(this.douBanRequest).then(response => {
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
    margin-left: 100px;
    margin-top: 20px;
    margin-right: 100px;
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
