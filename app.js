const yargs = require("yargs")
const controller = require("./controller.js")

yargs.command({
    command:"add",
    describe:"simpan contact",
    builder:{
        name:{
            describe:'contact name',
            demandOption:true,
            type:"string",
        },
        email:{
            describe:'contact email',
            demandOption:false,
            type:"string",
        },
        
        mobile:{
            describe:'contact mobile phone number',
            demandOption:true,
            type:"string",
        },
    },

    handler(argv){
        const contact = {
            name: argv.name,
            email: argv.email,
            mobile: argv.mobile,
        }
        
        console.log(contact)
        controller.simpanContact(contact)
    },
})

yargs.command({
    command:"readDetail",
    describe:"baca contact by name",
    builder:{
        name:{
            describe:'contact name',
            demandOption:true,
            type:"string",
        },
    },

    handler(argv){
        console.log("Pencarian contact dengan nama: ", argv.name)
        controller.bacaContactByName(argv.name)
    },
})

yargs.command({
    command:"readList",
    describe:"baca list contact",

    handler(){
        console.log("List contact")
        controller.bacaListContact()
    },
})

yargs.command({
    command:"updateByName",
    describe:"update contact by name",
    builder:{
        name:{
            describe:'contact name',
            demandOption:true,
            type:"string",
        },

        email:{
            describe:'contact email',
            demandOption:false,
            type:"string",
        },
        
        mobile:{
            describe:'contact mobile phone number',
            demandOption:false,
            type:"string",
        },
    },

    handler(argv){
        console.log("Update contact dengan nama: ", argv.name)
        controller.updateContact("name", argv.name, argv.email, argv.mobile)
    },
})

yargs.command({
    command:"updateByMobile",
    describe:"update contact by mobile phone number",
    builder:{
        name:{
            describe:'contact name',
            demandOption:false,
            type:"string",
        },

        email:{
            describe:'contact email',
            demandOption:false,
            type:"string",
        },
        
        mobile:{
            describe:'contact mobile phone number',
            demandOption:true,
            type:"string",
        },
    },

    handler(argv){
        console.log("Update contact dengan mobile phone number: ", argv.mobile)
        controller.updateContact("mobile", argv.name, argv.email, argv.mobile)
    },
})

yargs.command({
    command:"deleteByName",
    describe:"delete contact by name",
    builder:{
        name:{
            describe:'contact name',
            demandOption:true,
            type:"string",
        },
    },

    handler(argv){
        console.log("Delete contact dengan name: ", argv.name)
        controller.deleteContact(argv.name, null)
    },
})

yargs.command({
    command:"deleteByMobile",
    describe:"delete contact by mobile phone number",
    builder:{
        mobile:{
            describe:'contact mobile phone number',
            demandOption:true,
            type:"string",
        },
    },

    handler(argv){
        console.log("Delete contact dengan mobile: ", argv.mobile)
        controller.deleteContact(null, argv.mobile)
    },
})

yargs.parse()