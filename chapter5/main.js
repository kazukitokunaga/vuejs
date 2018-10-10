// コンポーネント
/*
コンポーネントは、ルートインスタンスが作成される前に定義しておく必要がある。new Vue()する前に定義する。
*/

// コンポーネント間の通信（親から子）
Vue.component('comp-child', {
  // テンプレートで受け取ったvalを使用
    template: '<p>{{ val }}</p>',
    // 受け取る属性名を指定
    props: ['val']
  })

// コンポーネント間の通信（子から親）
Vue.component('comp-child2', {
  template: '<button v-on:click="handleClick">イベント発火</button>',
  methods: {
    // ボタンのクリックイベントのハンドラでchilds-eventを発火する
    handleClick: function () {
      this.$emit('childs-event')
    },
  }
})

// 親が持つデータを操作しよう
Vue.component('comp-child3', {
  template: '<li>{{ name }} HP.{{ hp }}\
  <button v-on:click="doAttack">攻撃する</button></li>',
  props: {
    id: Number,
    name: String,
    hp: Number
  },
  methods: {
    // ボタンのクリックイベントのハンドラから$emitでattackを発火する
    doAttack: function () {
      // 引数として自分のIDを渡す
      this.$emit('attack', this.id)
    }
  }
})

// keep-alive で状態を維持する
// メッセージ一覧用コンポーネント
Vue.component('comp-board', {
  template: '<div>Message Board</div>',
})
// 入力フォーム用コンポーネント
Vue.component('comp-form', {
  template: '<div>Form<textarea v-model="message"></textarea></div>',
  data: function () {
    return {
      message: ''
    }
  }
})

// SVGパーツのコンポーネントを定義
Vue.component('my-circle', {
  template: '<circle cx="80" cy="75" r="50" v-bind:fill="fill"/>',
  props: {
    fill: String
  }
})

var app = new Vue({
    el: '#app',
      
    data: {
      valueA: 'これは子A',
      valueB: 'これは子B',

      list: [
        { id: 1, name: 'スライム', hp: 100 },
        { id: 2, name: 'ゴブリン', hp: 200 },
        { id: 3, name: 'ドラゴン', hp: 500 }
      ],

      current: 'comp-board', // 動的に切り替える

      show: true,

      count: 0,

      order: false,
      list: [
        { id: 1, name: 'りんご', price: 100 },
        { id: 2, name: 'ばなな', price: 200 },
        { id: 3, name: 'いちご', price: 300 }
      ],

      toggle: false,

    },

    computed: {
      // orderの値でリストの順番を反転する算出プロパティ
      // sortedList: function () {
      //   // LodashのorderByメソッドを使用
      //   return _.orderBy(this.list, 'price', this.order ? 'desc' : 'asc')
      // },

      fill: function () {
        return this.toggle ? 'lightpink' : 'skyblue'
      },
    },

    methods: {
      // childs-eventが発生した！
      parentsMethod: function () {
        alert('イベントをキャッチ！ ')
      },

      // attackが発生した！
      handleAttack: function (id) {
        // 引数のIDから要素を検索
        var item = this.list.find(function (el) {
          return el.id === id
        })
        // HPが0より多ければ10減らす
        if (item !== undefined && item.hp > 0) item.hp -= 10
      },

      // 使用できるトランジションフックを確認するためにログに出力する
      // Enter
      beforeEnter: function (el) {
        console.log('before-enter')
      },
      enter: function (el, done) {
        console.log('enter')
        setTimeout(done, 1000)
      },
      afterEnter: function (el) {
        console.log('after-enter')
      },
      enterCancelled: function (el) {
        console.log('enter-cancelled')
      },
      // Leave
      beforeLeave: function (el) {
        console.log('before-leave')
      },
      leave: function (el, done) {
        console.log('leave')
        setTimeout(done, 1000)
      },
      afterLeave: function (el) {
        console.log('after-leave')
      },
      // v-show と共に使うときだけ leaveCancelled は有効です
      leaveCancelled: function (el) {
        console.log('leave-cancelled')
      },

    },
})