// 函式一：filterByQuery(list, query)：
// - 依據 query.level 篩選，沒帶就回全部
const members = [
  { "id": 1, "name": "小華", "level": "VIP" },
  { "id": 2, "name": "小美", "level": "normal" },
  { "id": 3, "name": "阿強", "level": "VIP" },
  { "id": 4, "name": "小明", "level": "normal" }
];

function filterByQuery(list, query){
    if (!query || !query.level){
        return list
    }
    const level = list.filter(l=> l.level === query.level)
    return level
}

// console.log(filterByQuery(members, { level: 'VIP' }));
console.log(filterByQuery(members));

