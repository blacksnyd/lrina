function anoelo_seed(name) {
  var numericValue = name.split('').reduce(function(acc, chr) {
    return acc + chr.charCodeAt(0)
  }, 0)
  return Math.abs(Math.sin(numericValue))
}

function anoelo_xp(seed) {
  return Math.floor(2320 * seed)
}

var anoelo_levels = [30, 80, 160, 330, 690, 1340, 2320, 3870]

function anoelo_lvl(xp) {
  for (var i = 0; i < anoelo_levels.length; i++) {
    if (xp < anoelo_levels[i]) {
      return i + 1
    }
  }
  return anoelo_levels.length // cannot happen
}

function anoelo_elo(seed) {
  return Math.floor(500 * seed)
}

var anoelo_res = document.querySelector('div.result')
var preview_name = document.querySelector('div.preview .name')
var preview_level = document.querySelector('div.preview .level')
var preview_elo = document.querySelector('div.preview .elo')

document.querySelector('input.name').addEventListener('input', function(ev) {
  var name = ev.target.value.trim()
  preview_name.innerText = name
  if (name.length < 4) {
    preview_level.innerText = ''
    preview_elo.innerText = ''
    anoelo_res.innerHTML = ''
    return
  }
  var results = []
  if(!name.match(/^[a-zA-Z0-9_]{4,16}$/)) {
    preview_level.innerText = ''
    preview_elo.innerText = ''
    if(name.match(/[^a-zA-Z0-9_]/)) {
      results.push('❌ Alphanumérique_')
    }
  } else {
    var seed = anoelo_seed(name)
    var xp = anoelo_xp(seed)
    var lvl = anoelo_lvl(xp)
    var elo = anoelo_elo(seed)
    preview_level.innerText = lvl
    preview_elo.innerText = elo
  }
  if (results.length) {
    anoelo_res.innerHTML = '<p>' + results.join('<br>') + '</p>';
  } else {
    anoelo_res.innerHTML = ''
  }
})
