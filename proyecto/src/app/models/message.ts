export class Message {
    constructor(
        public _id: string,
        public text: string,
        public viewed: string,
        public Created_at: string,
        public emitter: string,
        public receiver: string
    ){}
}