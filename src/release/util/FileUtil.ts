import * as fs from "fs"

export class FileUtil{

    private file:any

    constructor (filename:string){
        this.file = filename
    }

    public WriteLine = (data:string) => {
        return fs.writeFileSync(this.file, data, {flag: "a"})
    }

}