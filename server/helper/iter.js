const axios = require('axios')

const url = 'http://136.233.14.3:8282/CampusPortalSOA/login'


module.exports.login = async (username,password) => {
    let reqData = {
        username,
        password,
        MemberType:'S'
    }
    
    let user = await axios.post(url,reqData,{withCredentials: true}).then((response) => {
        return response.data
    })
    return user
}