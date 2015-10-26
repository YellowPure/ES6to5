import {Animal} from './animal';

class Cat extends Animal{
    constructor(name = 'cat'){
        super('Felidae');
        this.name = name;
    }
    run() {
        return this.name +' is running';
    }
    
    meowu() {
        return 'ahwooooooo~';
    }
    
    action() {
        let r = Math.random();
        if(r > 5) {
            this.run();
        }else {
            this.meowu();
        }
    }
}

export {Cat};