/* Testing ES6 class */
class test {
    constructor(){
        this.arr = [1,2]
    }

    set  vals(els){
        this.arr = els
    }

    get vals(){
        return this.arr
    }
}

let x = new test();
console.log(x.vals)
x.vals = [2,3]
console.log(x.vals)
