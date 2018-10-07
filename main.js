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

    }

  })