

function numberRandom(max) {
    if (max <= 1){
        console.log('enter a number greater than 1');
    }
    else{
        let flag = 1;
        let number = Math.random();
        let temp = max;
        while (temp > 1){
            flag = flag * 10;
            temp = temp * 0.1;
        }
        number = (number*flag);
        
        while (number >= max+1){
            number = number - max;
        }
        return Math.floor(number);
    }
}
console.log(numberRandom(3));
function randomPassword(sizePassword) {
    if (sizePassword < 2) {
        console.log('minimum password length 3 characters, returned 0');
        return 0;
    } else {
        let letters = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
        let flagN = false;
        let flagU = false;
        let flagB = false;
        let password = '';
        while (!((flagN)&(flagU)&(flagB))) {
            password = '';
            flagN = false;
            flagU = false;
            flagB = false;
            for (let index = 0; index < sizePassword; index++) {
                const flag = numberRandom(2);
                if (flag == 0){
                    password = password +String(numberRandom(9));
                    flagN = true;
                }
                else if(flag == 1){
                    password = password +letters[numberRandom(25)].toUpperCase();
                    flagU = true;
                }
                else{
                    password = password +letters[numberRandom(25)];
                    flagB = true;
                }
            }
        }
        return password;
    }
}


module.exports = {randomPassword};