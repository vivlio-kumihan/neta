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
  hp: 50,
  attack: 4,
  deffence: 1
};
enemy.maxHp = enemy.hp;

const player = {
  name: 'nob',
  hp: 100,
  attack: 5,
  deffence: 2
};
player.maxHp = player.hp;

const insertText = (id, text) => {
  document.getElementById(id).textContent = text;
};

const damegeRange = .3;

const damegeCal = (attack, deffence) => {
  const maxDamege = attack * (1 + damegeRange),
        minDamege = attack * (1 - damegeRange),
        attackDamege = Math.floor(Math.random() * (maxDamege - minDamege) + minDamege);
  const damege = attackDamege - deffence;
  return damege < 1 ? 0 : damege;
};

insertText('enemy-name', enemy.name);
insertText('current-eneny-hp', enemy.hp);
insertText('max-enemy-hp', enemy.hp);

insertText('player-name', player.name);
insertText('current-player-hp', player.hp);
insertText('max-player-hp', player.hp);

document.getElementById('attack').addEventListener('click', function() {
  let endGame = false;
  const playerDamege = damegeCal(player.attack, enemy.deffence),
        enemyDamege = damegeCal(enemy.attack, player.deffence);

  enemy.hp -= playerDamege;
  insertText('current-eneny-hp', enemy.hp);
  player.hp -= enemyDamege;
  insertText('current-player-hp', player.hp);
  
  document.getElementById('current-enemy-hpgauge-value').style.width = `${enemy.hp / enemy.maxHp * 100}%`;
  document.getElementById('current-player-hpgauge-value').style.width = `${player.hp / player.maxHp * 100}%`;
  
  if (enemy.hp <= 0) {
    alert('Win');
    endGame = true;
    enemy.hp = 0;
    insertText('current-eneny-hp', enemy.hp);
    document.getElementById('current-enemy-hpgauge-value').style.width = '0%';
  } else if (player.hp <= 0) {
    alert('Loose')
    endGame = true;
    player.hpp = 0;
    insertText('current-eneny-hp', enemy.hp);
    document.getElementById('current-player-hpgauge-value').style.width = '0%';
  }

  if (endGame) this.classList.add('de-active')
});