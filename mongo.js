const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://johannay:${password}@cluster0-byuyz.mongodb.net/phone-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })


const personSchema = new mongoose.Schema({
  name:  {
    type: String,
    minlength: 4,
    required: true,
    unique: true
    },
  number: {
      type: String,
      minlength: 8,
      required: true
    }
})

userSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Person = mongoose.model('Person', personSchema)

if ( process.argv.length===5 ) {
   
    const name = process.argv[3]
    const number = process.argv[4]


    const person = new Person({
        name: name,
        number: number,
    })
    
    person.save().then(response => {
    console.log('person saved!');
    mongoose.connection.close();
    })
}

if (process.argv.length<4) {
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name + " "+ person.number)
        })
    mongoose.connection.close()
    })
}