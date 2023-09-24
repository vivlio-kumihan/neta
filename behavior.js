const names = ['enemy-name', 'player-name'];
const hps = ['current-eneny-hp', 'max-enemy-hp', 'current-player-hp', 'max-player-hp']

const toKebabCase = (name) => {
  let parts = name.split('-');
  const kebabCase = parts.map((part, idx) => {
    return idx === 0 ? part : part[0].toUpperCase() + part.slice(1);
  }).join('');
  return kebabCase;
}

const enemy = {
  name: 'john',
  hp: 50
};

const player = {
  name: 'nob',
  hp: 100
};

const insertText = (id, text) => {
  document.getElementById(id).textContent = text;
};

insertText('enemy-name', enemy.name);
insertText('current-eneny-hp', enemy.hp);
insertText('max-enemy-hp', enemy.hp);

insertText('player-name', player.name);
insertText('current-player-hp', player.hp);
insertText('max-player-hp', player.hp);

document.getElementById('attack').addEventListener('click', function() {
  let endGame = false;
  enemy.hp -= 10;
  insertText('current-eneny-hp', enemy.hp);
  player.hp -= 10;
  insertText('current-player-hp', player.hp);

  if (enemy.hp <= 0) {
    alert('Win');
    endGame = true;
  } else if (player.hp <= 0) {
    alert('Loose')
    endGame = true;
  }

  if (endGame) this.classList.add('de-active')
});