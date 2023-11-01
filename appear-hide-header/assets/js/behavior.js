// // スクロールを監視する
// window.addEventListener('scroll', () => {
//   console.log('scroll now')
// })

// // 現在のスクロールの位置（Y軸のピクセル数）
// window.addEventListener('scroll', () => {
//   console.log(window.scrollY)
// })

// // スクロール位置の初期化
// let beforeScrollValue = 0
// // このオブジェクトの中でスクリーン上で振る舞いを
// // する毎に動きを監視し、変数に値を代入をし続けている。
// window.addEventListener('scroll', () => {
//   // 判定をしている
//   // 現在のスクロール位置　大なり　前回のスクロール位置
//   // 式が成立するばtrue、そうでなければfalseが返る。
//   console.log(window.scrollY > beforeScrollValue)
//   // スクロールする度に値を格納する。
//   beforeScrollValue = window.scrollY
// })

// 実装する
let beforeScrollValue = 0
const topClassList = document.querySelector('section.top').classList
window.addEventListener('scroll', () => {
  if (window.scrollY > beforeScrollValue) {
    topClassList.add('pull-down')
  } else {
    topClassList.remove('pull-down')
  }
  beforeScrollValue = window.scrollY
})
