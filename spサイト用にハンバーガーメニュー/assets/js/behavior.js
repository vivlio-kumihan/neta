// hamberger menu
const hamburgerMenuBtn = document.getElementById("header-menu-button")
const navi = document.querySelector("header .link-menu")
const btnLines = Array.from(document.querySelectorAll("header > nav .btn-line"))

hamburgerMenuBtn.addEventListener("click", function() {
  navi.classList.toggle("active")
  btnLines.forEach((line, idx) => {
    switch (idx) {
      case 0:
        line.classList.toggle("oblique-line-dw")
        break;
      case 1:
        line.classList.toggle("erase")
        break;
      case 2:
        line.classList.toggle("oblique-line-up")
        break;
    }
  })
})

// target="blank"を付与する
const headerUl = document.querySelector("header .link-menu > ul")
const hambergerMenuList = (headerUl.children)

Array.from(hambergerMenuList).forEach(li => {
  const anchor = li.firstElementChild
  const url = anchor.getAttribute("href")
  if (url && url.includes("kumihan.com")) {
    anchor.setAttribute("target", "_blank")
  }
})

// JSで属性を設定・取得・確認する。
// 設定 => setAttribute("属性名", "値")
// 取得 => getAttribute("属性名") 状態を持っている値で返す。
// 確認 => hasAttribute("属性名") 状態を真偽値で返す。

// arr = document.querySelectorAll("ul li a")
// arr.forEach(element => {
//   element.setAttribute("target", "_brank")
//   // 『target』属ががあるものを取得する。
//   console.log(element.getAttribute("target"))
//   // クラスを持っているものを取得する。この場合は、クラスの『値』を返す。
//   console.log(element.getAttribute("class"))
//   // クラスを持っているものを取得する。クラスがあるかどうか『真偽値』を返す。
//   console.log(element.hasAttribute("class"))
// })