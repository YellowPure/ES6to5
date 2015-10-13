import $ from 'jquery'

export class MyClass {
    constructor(name = 'nobody'){
        this.name = name;
    }
    getMyName(){
        return this.name;
    }
}