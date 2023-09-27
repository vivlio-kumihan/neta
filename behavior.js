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
};

const showModal = (texts, hiddenNextButton = false) => {
  document.getElementById('mask').classList.add('active');
  document.getElementById('modal-title').textContent = texts;
  if (hiddenNextButton) {
    document.getElementById('modal-next-btn').classList.add('hidden');
  }
};

let nowKilledNumber = 0,
    targetKillsNumber = 5;

const enemies = [
  {
    name: 'slime',
    hp: 20,
    attack: 3,
    defense: 1,
    prize: 10
  },
  {
    name: 'fairy',
    hp: 30,
    attack: 4,
    defense: 2,
    prize: 20
  },
  {
    name: 'gargoyle',
    hp: 100,
    attack: 5,
    defense: 2,
    prize: 50
  },
]

let enemy = enemies[Math.floor(Math.random() * enemies.length)]
enemies.forEach(elem => { elem.maxHp = elem.hp });

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
const criticalHitRate = 1.5;

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

insertText('now-killed-number', nowKilledNumber);
insertText('target-kills-number', targetKillsNumber);

document.getElementById('attack').addEventListener('click', function() {
  let victory = false,
      defeat = false;

  const playerName = '<span style="color: blue">' + player.name + '</span>',
        enemyName = '<span style="color: red">' + enemy.name + '</span>';
  
  let playerDamege = damegeCal(player.attack, enemy.defense);
  let enemyDamege = damegeCal(enemy.attack, player.defense);
  
  if (Math.floor(Math.random() * criticalHitRate)) {
    playerDamege *= 2;
    insertLog(playerName + 'の攻撃、クリティカル・ヒット => ' + enemyName + 'に対して' + playerDamege + 'のダメージ')
  } else {
    insertLog(playerName + 'の攻撃 => ' + enemyName + 'に対して' + playerDamege + 'のダメージ')
  }
  enemy.hp -= playerDamege;
  insertText('current-eneny-hp', enemy.hp);

  // console.log(enemy.hp);
  // console.log(enemy.maxHp);
  // console.log(enemy.hp / enemy.maxHp);

  document.getElementById('current-enemy-hpgauge-value').style.width = `${enemy.hp / enemy.maxHp * 100}%`;
  
  if (enemy.hp <= 0) {
    victory = true;
    enemy.hp = 0; 
    insertText('current-eneny-hp', enemy.hp);
    document.getElementById('current-enemy-hpgauge-value').style.width = '0%';
    showModal(enemy.name + 'を倒しました。');
    document.getElementById('subtotal')
      .insertAdjacentHTML('beforeend', 
      `<li>${enemy.name}: ${enemy.prize}点<li>`);
  }

  if (!victory) {
    if (Math.floor(Math.random() * criticalHitRate)) {
      playerDamege *= 2;
      insertLog(enemyName + 'の攻撃、クリティカル・ヒット => ' + playerName + 'に対して' + enemyDamege + 'のダメージ')
    } else {
      insertLog(enemyName + 'の攻撃 => ' + playerName + 'に対して' + enemyDamege + 'のダメージ')
    }
    player.hp -= enemyDamege;
    insertText('current-player-hp', player.hp);
    document.getElementById('current-player-hpgauge-value').style.width = `${player.hp / player.maxHp * 100}%`;

    // console.log(player.hp);
    // console.log(player.maxHp);
    // console.log(player.hp / player.maxHp);
  
    if (player.hp <= 0) {
      defeat = true;
      player.hpp = 0;
      insertText('current-eneny-hp', enemy.hp);
      document.getElementById('current-player-hpgauge-value').style.width = '0%';
      showModal(enemy.name + 'に負けました。', true)
    }
  }

  if (victory || defeat) this.classList.add('de-active')

  if (victory) {
    nowKilledNumber++;
    insertText('now-killed-number', nowKilledNumber);
    if (nowKilledNumber === targetKillsNumber) {
      showModal('ゲーム・クリア', true)
    }
  }

  if ((enemy.hp / enemy.maxHp) * 100 > 50) {
    document.getElementById('current-enemy-hpgauge-value').style.backgroundColor = 'blue';
  } else if ((enemy.hp / enemy.maxHp) * 100 > 20){
    document.getElementById('current-enemy-hpgauge-value').style.backgroundColor = 'orange';
  } else {
    document.getElementById('current-enemy-hpgauge-value').style.backgroundColor = 'red';
  }

  if ((player.hp / player.maxHp) * 100 > 50) {
    document.getElementById('current-player-hpgauge-value').style.backgroundColor = 'blue';
  } else if ((player.hp / player.maxHp) * 100 > 20){
    document.getElementById('current-player-hpgauge-value').style.backgroundColor = 'orange';
  } else {
    document.getElementById('current-player-hpgauge-value').style.backgroundColor = 'red';
  }
});

document.getElementById('modal-next-btn').addEventListener('click', () => {
  enemy.hp = enemy.maxHp;
  enemy = enemies[Math.floor(Math.random() * enemies.length)];
  insertText('enemy-name', enemy.name);
  insertText('current-eneny-hp', enemy.hp);
  insertText('max-enemy-hp', enemy.hp);
  document.getElementById('current-enemy-hpgauge-value').style.width = '100%';
  document.getElementById('attack').classList.remove('de-active')
  document.getElementById('mask').classList.remove('active');
  document.getElementById('current-enemy-hpgauge-value').style.backgroundColor = 'blue';
})