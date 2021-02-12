(function (Vue) {
  'use strict';

  const STORAGE_KEY = 'items-vuejs'
  const itemStorage = {
    // 获取数据
    fetch() {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    },
    // 保存数据
    save(items) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
  }

  const items = [
    {
      id: 1,
      content: 'VUE.JS',
      completed: false
    },
    {
      id: 2,
      content: 'JAVA',
      completed: false
    },
    {
      id: 3,
      content: 'PYTHON',
      completed: true
    },
  ]

  // 自定义指定
  Vue.directive('app-focus', {
    inserted(el, binding) {
      el.focus()
    },
    update(el, binding) {
      // 只有双击的那个元素才会获取到焦点
      if (binding.value) {
        el.focus()
      }
    }
  })

  // Your starting point. Enjoy the ride!
  const app = new Vue({
    el: '#todoapp',
    data: {
      titleIconLeft: '🍥', //🕸🍥🌑☣⚽⚙❄🌝
      titleIconRight: '🌑',
      items: itemStorage.fetch(),
      currentItem: null,
      filterStatus: 'all' // 接收变化的状态值
    },
    methods: {
      addItem(event) {

        const inputContent = event.target.value.trim()
        const id = this.items.length + 1

        if (inputContent.length) {
          this.items.push({
            id: id,
            content: inputContent,
            completed: false
          })
          event.target.value = ''
        }
      },
      removeItem(index) {
        this.items.splice(index, 1)
      },
      removeCompleted() {
        this.items = this.items.filter(item => {
          return !item.completed
        })
      },
      toEdit(item) {
        this.currentItem = item
      },
      cancelEdit() {
        this.currentItem = null
      },
      finishEdit(item, index, event) {
        const content = event.target.value.trim()
        if (!content) {
          this.removeItem(index)
          return
        }
        item.content = content
        this.currentItem = null
      }
    },
    computed: {
      remaining() {
        const unItems = this.items.filter(item => {
          return !item.completed
        })
        return unItems.length
      },
      toggleAll: {
        get() {
          return this.remaining === 0
        },
        set(newStatus) {
          this.items.forEach(item => {
            item.completed = newStatus
          })
        }
      },
      filterItems() {
        switch (this.filterStatus) {
          case 'active':
            return this.items.filter(item => !item.completed)
            break
          case 'completed':
            return this.items.filter(item => item.completed)
            break
          default:
            return this.items
            break
        }
      }
    },

    watch: {
      items: {
        deep: true,
        handler(newValue, old) {
          itemStorage.save(newValue)
        }
      }
    }
  })

  // 当路由发生变化的时候，会自动调用该函数
  window.onhashchange = function () {
    const hash = window.location.hash.substr(2) || 'all'
    app.filterStatus = hash
  }

  window.onhashchange()

  // const iconList = '📜📄📑📰📔📕📖📗📘📙📓📒📃'
  // setInterval(function () {
  //   let random = Math.floor(Math.random() * iconList.length)
  //   console.log(iconList[random])
  //   app.titleIcon = iconList[random]
  // }, 3000)
  const body = document.querySelector('body')
  const colorList = ['skyblue', 'pink', 'yellow', 'wheat', 'lightgreen']
  const d1 = ['left', 'right']
  const d2 = ['top', 'bottom']

  setInterval(() => {
    const random1 = Math.floor(Math.random() * colorList.length)
    const random2 = Math.floor(Math.random() * colorList.length)
    const randomD1 = Math.floor(Math.random() * 2)
    const randomD2 = Math.floor(Math.random() * 2)
    const color = `linear-gradient(to ${d1[randomD1]} ${d2[randomD2]}, ${colorList[random1]}, ${colorList[random2]})`
    body.style.background = color
  }, 30000)

})(Vue);
