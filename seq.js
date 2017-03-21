const Sequelize = require('sequelize');
const model = require('./model');


let User = model.User;

async function queryData(opt){
    var Data = await User.findAll({
        where: opt
    });
    console.log(`find ${Data.length} pets:`);
    return Data
    
}

async function addData(data){
    var dog = await User.create(data);
};

(async () => {
    let query = {
            id:'3',
            username: 'zhang',
            passwd:'123456'
        };
    var Data = await queryData({
        username:query.username
    });
    // console.log(p.id);
    if(!Data.length == 0){
        for (let p of Data) {
            console.log(JSON.stringify(p));
        }
    }else{
        console.log('未查询到记录');
        await addData(query);
    }
})();


