const proxy={
    Hpox:'/highData',
}
export var config={
    special:'["*|:<>/?\\\]'
}
export const interfaceObj={
    userlogin:proxy.Hpox+'/user/index'
}

export function validForbid(value) {
    let reg = new RegExp(config.special, 'g')
    // value = value.replace(reg)
    return value.replace(reg, '')
}