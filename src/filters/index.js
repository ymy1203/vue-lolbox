const AREAS = [
  {
    'id': 1,
    'isp': '电信一',
    'name': '艾欧尼亚'
  },
  {
    'id': 2,
    'isp': '网通一',
    'name': '比尔吉沃特'
  },
  {
    'id': 3,
    'isp': '电信二',
    'name': '祖安'
  },
  {
    'id': 4,
    'isp': '电信三',
    'name': '诺克萨斯'
  },
  {
    'id': 5,
    'isp': '电信四',
    'name': '班德尔城'
  },
  {
    'id': 6,
    'isp': '网通二',
    'name': '德玛西亚'
  },
  {
    'id': 7,
    'isp': '电信五',
    'name': '皮尔特沃夫'
  },
  {
    'id': 8,
    'isp': '电信六',
    'name': '战争学院'
  },
  {
    'id': 9,
    'isp': '网通三',
    'name': '弗雷尔卓德'
  },
  {
    'id': 10,
    'isp': '电信七',
    'name': '巨神峰'
  },
  {
    'id': 11,
    'isp': '电信八',
    'name': '雷瑟守备'
  },
  {
    'id': 12,
    'isp': '网通四',
    'name': '无畏先锋'
  },
  {
    'id': 13,
    'isp': '电信九',
    'name': '裁决之地'
  },
  {
    'id': 14,
    'isp': '电信十',
    'name': '黑色玫瑰'
  },
  {
    'id': 15,
    'isp': '电信十一',
    'name': '暗影岛'
  },
  {
    'id': 16,
    'isp': '网通五',
    'name': '恕瑞玛'
  },
  {
    'id': 17,
    'isp': '电信十二',
    'name': '钢铁烈阳'
  },
  {
    'id': 18,
    'isp': '电信十三',
    'name': '水晶之痕'
  },
  {
    'id': 19,
    'isp': '电信十四',
    'name': '均衡教派'
  },
  {
    'id': 20,
    'isp': '网通六',
    'name': '扭曲丛林'
  },
  {
    'id': 21,
    'isp': '教育网',
    'name': '教育网专区'
  },
  {
    'id': 22,
    'isp': '电信十五',
    'name': '影流'
  },
  {
    'id': 23,
    'isp': '电信十六',
    'name': '守望之海'
  },
  {
    'id': 24,
    'isp': '电信十七',
    'name': '征服之海'
  },
  {
    'id': 25,
    'isp': '电信十八',
    'name': '卡拉曼达'
  },
  {
    'id': 26,
    'isp': '网通七',
    'name': '巨龙之巢'
  },
  {
    'id': 27,
    'isp': '电信十九',
    'name': '皮城警备'
  },
  {
    'id': 30,
    'isp': '全网络大区',
    'name': '男爵领域'
  }
]
//大区过滤
export const getAreaName = function(id){
  for(var i in AREAS){
    if(AREAS[i].id==id){
      return AREAS[i].name;
    }
  }
}

const hType = {
  'Tank': '坦克',
  'Mage': '法师',
  'Assassin': '刺客',
  'Fighter': '战士',
  'Support': '辅助',
  'Marksman': '射手'
}
// console.log(Object.keys(hType));

// 职业过滤
export const getHeroJob = function(job){
  switch(job) {
    case 'Tank':
      return '坦克'
      break;
    case 'Mage':
      return '法师'
      break;
    case 'Assassin':
      return '刺客'
      break;
    case 'Fighter':
      return '战士'
      break;
    case 'Support':
      return '辅助'
      break;
    case 'Marksman':
      return '射手'
      break;
  }
}
//位置过滤
export const getHeroLine = function(job){
  switch(job) {
    case 'fz':
      return '辅助'
      break;
    case 'zd':
      return '中单'
      break;
    case 'dy':
      return '打野'
      break;
    case 'sd':
      return '上单'
      break;
    case 'adc':
      return 'ADC'
      break;
  }
}

const GAME_TYPE = {
  '1':'自定义比赛',
  '3':'匹配赛',
  '4': '排位赛',
  '5': '灵活组排',
  '6': '大乱斗',
  '7': '人机',
  '11':'克隆大作战',
  '23':'枢纽攻防战',
  '17':'飞升赛',
  '26':'血月杀模式',
  '27':'重开局模式',
  '19':'魄罗大乱斗',
}

export const getWarModel = function(war){
  if(GAME_TYPE[war]){}else{
    GAME_TYPE[war] = "活动赛"
  }
  return GAME_TYPE[war];
}

const GAME_WIN = {
  '1':'胜利',
  '2': '失败',
  '130': '逃跑',
}

export const getWarWin = function(win){
  return GAME_WIN[win];
}





//英雄头像的过滤
export const headUrl = function(id){
  return 'http://cdn.tgp.qq.com/lol/images/resources/usericon/'+id+'.png';
}
export const heroUrl = function(id){
  return 'http://cdn.tgp.qq.com/pallas/images/champions_id/'+id+'.png';
}
//装备图标过滤
export const wuqiUrl = function(id){
  return 'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+id+'.png';
}