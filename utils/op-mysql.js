const { query } = require('./async-db');
//查询数据库-操作函数
var selectAllData = async ( sql, sqlData ) => {
  let dataList = await query( sql, sqlData );
  return dataList
}
var getData = async (sql, sqlData) => {
  let dataList = await selectAllData(sql, sqlData);
  console.log( dataList );
  return dataList
}

module.exports={
    'getMysqldata':getData
}