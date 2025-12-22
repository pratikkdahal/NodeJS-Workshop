* CRUD - Create Read Update Delete
* All websites is made with CRUD rule


# Different methods
* for read operation----> .get
* for update----> app.put / app.patch
* for delete ----> app.delete
* for receiving ---> app.post


# request


* app.post("/register", function(req,res){
    console.log(req)
})

* This command/code shows the information of user like ip address, agent


# JSON Format 

key : value

eg:
{
  "name" : "Pratik",
  "email": "pratik@gmail.com",
  "password": "hello"
}


# Note :
> Thunderclient/postman acts as the frontend which receive here....
 
# Encryption/decryption 
We can encrypt and also go back to normal 

# Hashing 
We cannot go back to normal/cannot reverse
* bcrypt, bcryptjs -- package used for hashing (password nubujhine format ma)
* eg:
>password : bcrypt.hashSync(password,10)
* where,
* 10 is the salt which means katti ko concentrated/nabujhine password/hash banaune


# Different methods to be performed

* k k cha thapaunu = User.find() 

* delete garna- User.findByIdAndDelete() 
* kei halna cha vane - User.create()
* update garna- User.findByIdAndUpdate()

