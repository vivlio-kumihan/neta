// ハンバーガー・メニュー
// ボタン
const toggleBtn = document.getElementById('toggle-btn');
const container = document.querySelector('.media-query-sm > .container');

toggleBtn.addEventListener("click", function() {
  this.classList.toggle("flag");
  container.classList.toggle("active")
});

// ホバーしてリンクを表示
const hoverLinks = document.querySelectorAll("#global-menu > li");
hoverLinks.forEach(elem => {
  elem.addEventListener("mouseenter", function() {
    let childUl = this.children;
    console.log(childUl[1])
    childUl[1].classList.add("active");
  });
  elem.addEventListener("mouseleave", function() {
    let childUl = this.children;
    console.log(childUl[1])
    childUl[1].classList.remove("active");
  });
});