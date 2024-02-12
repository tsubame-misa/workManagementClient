type User = {
    name: string,
    age: number,
    premiumUser: boolean,
}

const data: string = `
uhyo, 26,1
Jhon Smith, 17, 0
Mary Sue, 14, 1
`

const users = data.split("\n");
console.log(users);
return;

for (const user of users) {
    if (user.premiumUser) {
        console.log(`${user.name} (${user.age})はプレミアムユーザーです。`)
    } else {
        console.log(`${user.name} (${user.age})はプレミアムユーザーではありません`)
    }
}