const names = ['enemy-name', 'player-name'];
const hps = ['current-eneny-hp', 'max-enemy-hp', 'current-player-hp', 'max-player-hp']

const toKebabCase = (name) => {
  let parts = name.split('-');
  const kebabCase = parts.map((part, idx) => {
    return idx === 0 ? part : part[0].toUpperCase() + part.slice(1);
  }).join('');
  return kebabCase;
}

let logIndex = 0;
const insertLog = (texts) => {
  const logsElem = document.getElementById('logs'),
        createlog = document.createElement('li');
  logIndex++
  createlog.innerHTML = logIndex + ': ' + texts
  logsElem.insertBefore(createlog, logsElem.firstChild);
}

const enemies = [
  {
    name: 'slime',
    hp: 50,
    attack: 3,
    defense: 1
  },
  {
    name: 'fairy',
    hp: 60,
    attack: 4,
    defense: 2
  },
  {
    name: 'gargoyle',
    hp: 100,
    attack: 5,
    defense: 2
  },
]

const enemy = enemies[Math.floor(Math.random() * enemies.length)]
enemy.maxHp = enemy.hp;

const player = {
  name: 'player',
  hp: 100,
  attack: 5,
  defense: 2
};
player.maxHp = player.hp;

const insertText = (id, text) => {
  document.getElementById(id).textContent = text;
};

const damegeRange = .3;

const damegeCal = (attack, defense) => {
  const maxDamege = attack * (1 + damegeRange),
        minDamege = attack * (1 - damegeRange),
        attackDamege = Math.floor(Math.random() * (maxDamege - minDamege) + minDamege);
  const damege = attackDamege - defense;
  return damege < 1 ? 0 : damege;
};

insertText('enemy-name', enemy.name);
insertText('current-eneny-hp', enemy.hp);
insertText('max-enemy-hp', enemy.hp);

insertText('player-name', player.name);
insertText('current-player-hp', player.hp);
insertText('max-player-hp', player.hp);

document.getElementById('attack').addEventListener('click', function() {
  let victory = false,
      defeat = false;

  const playerName = '<span style="color: blue">' + player.name + '</span>',
        enemyName = '<span style="color: red">' + enemy.name + '</span>';
  
  const playerDamege = damegeCal(player.attack, enemy.defense);
  const enemyDamege = damegeCal(enemy.attack, player.defense);
  
  enemy.hp -= playerDamege;
  insertText('current-eneny-hp', enemy.hp);
  document.getElementById('current-enemy-hpgauge-value').style.width = `${enemy.hp / enemy.maxHp * 100}%`;
  insertLog(playerName + 'の攻撃 => ' + enemyName + 'に対して' + enemyDamege + 'のダメージ')
  
  if (enemy.hp <= 0) {
    alert('Win');
    victory = true;
    enemy.hp = 0; 
    insertText('current-eneny-hp', enemy.hp);
    document.getElementById('current-enemy-hpgauge-value').style.width = '0%';
  }

  if (!victory) {
    player.hp -= enemyDamege;
    insertText('current-player-hp', player.hp);
    document.getElementById('current-player-hpgauge-value').style.width = `${player.hp / player.maxHp * 100}%`;
    insertLog(enemyName + 'の攻撃 => ' + playerName + 'に対して' + playerDamege + 'のダメージ')
  
    if (player.hp <= 0) {
      alert('Loose')
      defeat = true;
      player.hpp = 0;
      insertText('current-eneny-hp', enemy.hp);
      document.getElementById('current-player-hpgauge-value').style.width = '0%';
    }
  }

  if (victory || defeat) this.classList.add('de-active')
});