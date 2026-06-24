/*const userprofile : {username: string, age: number, city: string, country: string, ismarried: boolean} = {
    username: "John Doe",
    age: 25,
    city: "New York",
    country: "USA",
    ismarried: true
}

const newprofile :{username: string, age: number, city: string, country: string, ismarried: boolean , address: string}
 ={...userprofile , address: "123 Main St, New York, USA"}
newprofile.username = "boody"
console.log(newprofile)


 export interface IUser{
   readonly username: string,
    age: number,
    city: string,
    country: string,
    ismarried: boolean,

};

interface INewUser extends IUser{
    address: string
}


const userprofile :IUser = {
 username: "John Doe",
 age: 25,
    city: "New York",
    country: "USA",
    ismarried: true
}

const newprofile :INewUser = {
    ...userprofile,
    address: "123 Main St, New York, USA"
}

console.log(newprofile)

const Person : Record<string, string | number> = {
    username: "body",
    age: 25
}

Person["address"]= "123 Main St, New York, USA";
console.log(Person)

interface IUser {
    username: string,
    age: number,
    address: string
}

type UserKeys = keyof IUser

const  user :IUser = {
    username: "body",
    age: 25,
    address: "123 Main St, New York, USA"
};

function getProperty(obj :IUser , key : UserKeys){
    return obj[key]
}

console.log(getProperty(user, "username"))


function PrintLanguage([a,b] :string[]){
    return `first language is ${a} , second language is ${b}`

}

console.log(PrintLanguage(["English", "Spanish"]))


function getSum(...num : number[]) {  
    return num.reduce((a, b) => a + b, 0);
}

console.log(getSum(1, 2, 3));



// Enums

enum Direction {
    Up,
    Down,
    Left,
    Right

}

const playeDirection = Direction.Right;

console.log(playeDirection)


enum statusCode {
    Success = 200,
    NotFound = 404,
    ServerError = 500
}

function handleResponse(status : statusCode){

    switch(status){
        case statusCode.Success:
            console.log("Success")
            break;
        case statusCode.NotFound:
            console.log("Not Found")
            break;
        case statusCode.ServerError:
            console.log("Server Error")
            break;
        default:
            console.log("Not Handled")
            break;
    }
}

handleResponse(statusCode.Success)

function logarg<T>(arg:T){
    return arg
}

console.log(logarg("hello"))


function Swap<T>(arg1 : T , arg2 : T ) : [T , T] {
    return [arg2 , arg1]
}

let num1 = 10;
let num2 = 20;

console.log(`Before Swap : Num1 = ${num1} , Num2 = ${num2}  `);
[num1 , num2] = Swap(num1 , num2)
console.log(`After Swap : Num1 = ${num1} , Num2 = ${num2}  `);

interface IUser{
    username : string,
    age : number,
    city : string,
}

function UpdateUser (user:IUser , updates : Partial<IUser>){
    return{
        ...user,
        ...updates
    }

}

const user :IUser = {
    username: "body",
    age: 25,
    city: "New York"

};

console.log(UpdateUser(user, {age: 30}))
*/
interface ICity{
    [key:string]: string
}

const cityDicitionary :ICity = {

    cairo: "Egypt",
    NewYork: "USA",
    London: "UK"
}

console.log(cityDicitionary.London)