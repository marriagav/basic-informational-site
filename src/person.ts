interface Person {
  name: string
  age: number
}

class Person implements Person {
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  greeting() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`)
  }
}

export default Person
