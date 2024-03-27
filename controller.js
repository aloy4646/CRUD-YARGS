const fs = require("fs")
const validator = require("validator")

//membuat folder data jika belum ada
const dirPath = './data'
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

//membuat file contacts.json jika belum ada
const dataPath = dirPath + "/contacts.json"
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

function simpanContact(contact){

    const file = fs.readFileSync(dataPath, 'utf-8')
    const contacts = JSON.parse(file)

    var isValid = true

    //pengecekan nama duplikat, tidak case sensitive
    if(contacts.find(currentContact => currentContact.name.toLowerCase() === contact.name.toLowerCase())){
        console.log("- Nama sudah ada, tidak dapat digunakan")
        isValid = false
    }

    //pengecekan format email
    //pengecekan contact.email dipakai untuk memeriksa apakah email undefined atau tidak
    //jika contact.email undefined maka tidak dapat dipakai oleh validator
    if(contact.email && !validator.isEmail(contact.email)){
        console.log("- Format email tidak sesuai")
        isValid = false
    }

    //pengecekan format nomor handphone
    if(!validator.isMobilePhone(contact.mobile, "id-ID")){
        console.log("- Format nomor handphone tidak sesuai")
        isValid = false
    }

    if(isValid){
        contacts.push(contact)
        fs.writeFileSync(dataPath, JSON.stringify(contacts))
        console.log("- Data anda sudah disimpan, terima kasih telah memberikan data!")
    }else console.log("- Data gagal disimpan, silahkah coba lagi")
   
}

function bacaContactByName(name){
    const file = fs.readFileSync(dataPath, 'utf-8')
    const contacts = JSON.parse(file)

    //pencarian contact tanpa case sensitive
    var contact = contacts.find(currentContact => currentContact.name.toLowerCase() === name.toLowerCase())

    if(contact) console.log("- Contact ditemukan: ", contact)
    else console.log("- Contact tidak ditemukan")
}

function bacaListContact(){
    const file = fs.readFileSync(dataPath, 'utf-8')
    const contacts = JSON.parse(file)

    contacts.forEach((contact, index) => {
        console.log(`${index + 1}. Name: ${contact.name}, Mobile: ${contact.mobile}`)
    })
}

function updateContactByName(name, email, mobile){
    const file = fs.readFileSync(dataPath, 'utf-8')
    const contacts = JSON.parse(file)

    var indexContact = contacts.findIndex(currentContact => currentContact.name.toLowerCase() === name.toLowerCase())

    if (indexContact !== -1){
        //pengecekan apakah ada input email dan validasi input tersebut
        if(email && validator.isEmail(email)) 
            contacts[indexContact].email = email

        //pengecekan apakah ada input mobile dan validasi input tersebut
        if(mobile && validator.isMobilePhone(mobile, "id-ID")) 
            contacts[indexContact].mobile = mobile

        //menyimpan data terbaru contacts ke file JSON
        fs.writeFileSync(dataPath, JSON.stringify(contacts))
        console.log(`- Contact berhasil diubah, berikut ini adalah data contact tersebut dengan versi terbaru`)
        console.log(contacts[indexContact])
    }else console.log("- Contact tidak ditemukan")
}

function updateContactByMobile(name, email, mobile){
    const file = fs.readFileSync(dataPath, 'utf-8')
    const contacts = JSON.parse(file)

    var indexContact = contacts.findIndex(currentContact => currentContact.mobile === mobile)

    if (indexContact !== -1){
        if(name && !contacts.find(currentContact => currentContact.name.toLowerCase() === name.toLowerCase())){
            contacts[indexContact].name = name
        }

        //pengecekan apakah ada input email dan validasi input tersebut
        if(email && validator.isEmail(email)) 
            contacts[indexContact].email = email

        //menyimpan data terbaru contacts ke file JSON
        fs.writeFileSync(dataPath, JSON.stringify(contacts))
        console.log(`- Contact berhasil diubah, berikut ini adalah data contact tersebut dengan versi terbaru`)
        console.log(contacts[indexContact])
    }else console.log("- Contact tidak ditemukan")
}

function deleteContactByName(name){
    const file = fs.readFileSync(dataPath, 'utf-8')
    const contacts = JSON.parse(file)

    const contact = contacts.find(currentContact => currentContact.name.toLowerCase() === name.toLowerCase())
    if (contact){
        //melakukan filtering untuk membuat array baru tanpa contact yang memiliki name sesuai input
        const contactsBaru = contacts.filter(currentContact => currentContact.name.toLowerCase() !== name.toLowerCase())

        //menyimpan data terbaru contacts ke file JSON
        fs.writeFileSync(dataPath, JSON.stringify(contactsBaru))
        console.log(`- Contact dengan data berikut ini sudah berhasil dihapus`)
        console.log(contact)
    }else console.log("- Contact tidak ditemukan")
}

function deleteContactByMobile(mobile){
    const file = fs.readFileSync(dataPath, 'utf-8')
    const contacts = JSON.parse(file)

    const contact = contacts.find(currentContact => currentContact.mobile === mobile)
    if (contact){
        //melakukan filtering untuk membuat array baru tanpa contact yang memiliki name sesuai input
        const contactsBaru = contacts.filter(currentContact => currentContact.mobile !== mobile)

        //menyimpan data terbaru contacts ke file JSON
        fs.writeFileSync(dataPath, JSON.stringify(contactsBaru))
        console.log(`- Contact dengan data berikut ini sudah berhasil dihapus`)
        console.log(contact)
    }else console.log("- Contact tidak ditemukan")
}

module.exports = {
    simpanContact,
    bacaContactByName,
    bacaListContact,
    updateContactByName,
    updateContactByMobile,
    deleteContactByName,
    deleteContactByMobile
}