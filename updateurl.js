const fs = require("fs");
let path = require("path");
let file = fs.readFile(path.join(__dirname,process.argv[2]),(err,data)=>{
    if (err){
        console.error("an error occured while trying to read file")
        throw err;
    }
    else{
        data = data.toString();
        data = data.split("\n");
        let result = [];
        for (let each of data){
            if(each.indexOf("Saw this post") !== -1){
                each = each.replaceAll("mixam-business.onrender.com","mixam business website")
                result.push(each);
            }
            else if ((each.indexOf("url") !== -1 && each.indexOf("http://localhost") !== -1 ) || each.indexOf("mixam-business.onrender.com") !== -1){
                each = each.replaceAll("\"","`")
                each = each.replaceAll("http://localhost","${this.$store.state.apiServer}")
                each = each.replaceAll("https://mixam-business.onrender.com","${this.$store.state.apiServer}")
                result.push(each)
            }
            else {
                result.push(each)
            }
        }
        console.log(result)
        fs.writeFile(process.argv[2], result.join("\n") , 'utf8', ()=>{
            console.log("done updating the file")
        });
    }
})
