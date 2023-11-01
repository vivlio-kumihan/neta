// サイドメニューを止めて、メインの読み物をスクロールさせる。
// サイドとメインの『2つのpin』を用意する。
// サイドをどこで止めるかを『start: 'top 10%'』で、
// サイドをどのタイミングでメインと同期させるかを、
// メインをpinにして決める。
ScrollTrigger.create({
  trigger: '.pin',
  start: 'top 10%',
  endTrigger: '.end-pin',
  end: 'bottom bottom', 
  pin: true,
  markers: true,
})


