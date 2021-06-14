class ErroHandler extends Error {
    public readonly message: string;
    public readonly status: number;
    public readonly stack: string;
    public readonly name: string;

    constructor(status=500,message: string,name:string="Error",stack:string=""){
        super();
        this.message = message;
        this.status = status;
        this.name = name;
        this.stack = stack;
    }
}

export default ErroHandler;