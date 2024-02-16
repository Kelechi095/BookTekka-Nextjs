export const capitalizeFirst = (arg: any) => {
    return arg.split('').map((letter: any, index: any) => {
        if(index === 0) {
            return letter.toUpperCase()
        } else {
            return letter.toLowerCase()
        }
    }).join("")
}