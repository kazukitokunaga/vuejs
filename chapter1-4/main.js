var app = new Vue({
    el: '#app',
      
    // データオプションに文字列やオブジェクトなどのデータを定義することで、インスタンス作成時にすべてえリアクティブなデータに変換する。
    data: {
      // dataとして登録すると、リアクティブなデータとなり、変化を検知できる。
      message: {
        // データバインディングでは、ネストされているオブジェクトのプロパティや配列の要素を使用することができる。
        value:'Hello Vue.js!'
      },

      list: ['りんご', 'ばなな', 'いちご'],
      num: 1,

      show: true,

      count: 0,

      isChild: true,
      isActive: true,
      textColor: 'red',
      bgColor: 'lightgray',
      
      radius: 50,

      list2: [
        { id: 1, name: 'スライム', hp: 100 },
        { id: 2, name: 'ゴブリン', hp: 200 },
        { id: 3, name: 'ドラゴン', hp: 500 }
      ],

      name: 'キマイラ',

      list3: [
        
      ],

      val: true,

      val2: [],

      val3: '',

      preview: '',

      width: 800,
      height: 600,


      // フォームの入力と紐付けるデータ
      budget: 300,
      // 表示件数
      limit: 2,
      // もとになるリスト
      list4: [
        { id: 1, name: 'りんご', price: 100 },
        { id: 2, name: 'ばなな', price: 200 },
        { id: 3, name: 'いちご', price: 400 },
        { id: 4, name: 'おれんじ', price: 300 },
        { id: 5, name: 'めろん', price: 500 }
      ],

      order: false,

      list5: [],
      current: '',
      topics: [
        { value: 'vue', name: 'Vue.js' },
        { value: 'jQuery', name: 'jQuery' }
      ],

      price: 19800,

      list6: [],

    },

    // コンポーネントのfilterオプションに登録することで、特定のコンポーネント内のみで使用できる。
    filters: {
      // 数字にカンマを付ける。
      localeNum: function (val) {
        return val.toLocaleString()
      },
    },

    // コンポーネントのwatchオプションに、監視するデータの名前（current）と、
    // 変化したときに呼び出されるハンドラを定義する。
    watch: {
      current: function (val) {
        // valueが変化したときに行いたい処理
        // GitHubのAPIからトピックのリポジトリを検索
        axios.get('https://api.github.com/search/repositories', {
          params: {
            q: 'topic:' + val
          }
        }).then(function (response) {
          this.list5 = response.data.items
        }.bind(this))
      },

      list6: function () {
        // 更新後のul要素の高さを取得できない…
        console.log('通常:', this.$refs.list6.offsetHeight)
        // nextTickを使えばできる！
        this.$nextTick(function () {
          console.log('nextTick:', this.$refs.list6.offsetHeight)
        })
      }
    },

    // 算出プロパティ
    computed: {

      // 算出プロパティのキャッシュ確認用
      computedData: function() { return Math.random() },

      // 算出プロパティhalfWidthを定義
      // halfWidth: function() {
      //   return this.width / 2
      // },

      // halfWidth: function() {
      //   return this.width / 2
      // },

      halfHeight: function() {
        return this.height / 2
      },

      // 「width × height」の中心座標をオブジェクトで返す
      halfPoint: function() {
        return {
          x: this.halfWidth,
          y: this.halfHeight
        }
      },

      halfWidth: {
        get: function() {
          return this.width / 2
        },
        // halfWidth の2倍の数値を width に代入する
        set: function(val) {
          this.width = val * 2
        }
      },

      // budget以下のリストを返す算出プロパティ
      matched: function () {
        return this.list4.filter(function (el) {
          return el.price <= this.budget
        }, this)
      },
      // matchedで返ったデータをlimit件返す算出プロパティ
      // limited: function () {
      //   return this.matched.slice(0, this.limit)
      // },

      // sortedを新しく追加
      sorted: function() {
        return _.orderBy(this.matched, 'price', this.order ? 'desc' : 'asc')
      },
      // limitedで使用するリストをsortedに変更
      limited: function() {
        return this.sorted.slice(0, this.limit)
      }

    },

    // createdというライフサイクルのタイミングで実行
    created: function() {
      // axiosでAPI通信
      axios.get('list.json').then(function(response) {
        // 取得完了したらlist3リストに代入
        this.list3 = response.data
      }.bind(this)).catch(function (e) {
        console.error(e)
      })

    },

    // beforeDestroyというライフサイクルのタイミングで実行
    beforeDestroy: function () {

    },

    methods: {
      handleClick: function (event) {
        alert(event.target); // [object HTMLButtonElement]

      },

      // ボタンをクリックしたときのハンドラ
      increment: function () {
        this.count += 1; // 処理は再代入するだけでOK！
      },

      // 追加ボタンをクリックしたときのハンドラ
      doAdd: function () {
        // リスト内で1番大きいIDを取得
        var max = this.list2.reduce(function (a, b) {
          return a > b.id ? a : b.id
        }, 0)
        // 新しいモンスターをリストに追加
        this.list2.push({
          id: max + 1, // 現在の最大のIDに+1してユニークなIDを作成
          name: this.name, // 現在のフォームの入力値
          hp: 500
        })
      },

      // 要素を削除ボタンをクリックしたときのハンドラ
      doRemove: function (index) {
        // 受け取ったインデックスの位置から1個要素を削除
        this.list2.splice(index, 1)
      },

      // 攻撃ボタンをクリックしたときのハンドラ
      doAttack: function (index) {
        this.list2[index].hp -= 10 // HPを減らす
      },

      // DOMを直接参照してカウントアップする処理
      handleClick() {
        // this.$refs.countとすることで、ref="count"としたDOMを直接参照している。
        var count = this.$refs.count
        // countのinnerTextを１カウントアップ
        if (count) {
          count.innerText = parseInt(count.innerText, 10) + 1
        }
      },

      // 算出プロパティのキャッシュ確認用
      methodsData: function() { return Math.random() },

      // 画像をプレビューする処理
      handleChange: function (event) {
        // ※ ここでの画像の選択は、ブラウザでプレビューするためのみに使用され、サーバーにアップロードする処理はしていない。
        var file = event.target.files[0]
        if (file && file.type.match(/^image\/(png|jpeg)$/)) {
          this.preview = window.URL.createObjectURL(file)
        }
      },

    },

    // カスタムディレクティブ
    directives: {
      focus: {
        // 紐付いている要素がDOMに挿入されるとき
        inserted: function (el) {
          el.focus() // 要素にフォーカスを当てる
        },
      }
    }

  })