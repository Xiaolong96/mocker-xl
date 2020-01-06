new Vue({
  el: '#app',
  data() {
    return {
      tableData: [{
        url: 'https://www.easy-mock.com/mock/5d3ffde1a5fcf877553440f6/getList',
        desc: '获取列表'
      }, {
        url: 'https://www.easy-mock.com/mock/5d3ffde1a5fcf877553440f6/query',
        desc: '查询'
      }]
    }
  },
  mounted() {
    axios.get('/mock/list')
      .then(res => {
        const data = res.data.data
        console.log(res);
        this.tableData = this.tableData.concat(data.list)
      })
  },
  methods: {
    changeHandle(row) {
      axios.post('/mock-switch', {
        key: row.url,
        value: row.status
      })
    }
  }
})